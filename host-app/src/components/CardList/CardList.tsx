import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import RemoteCardList from './RemoteCardList';
import { fetchQuotes, fetchTodos, Quote, Todo } from '../../utils/sharedApi';

const ITEMS_PER_PAGE = 5;

type CardListProps = {
  dataSource: string;
};

const CardList: React.FC<CardListProps> = memo(({ dataSource }) => {
  const [data, setData] = useState<(Quote | Todo)[]>([]);
  const [previousData, setPreviousData] = useState<(Quote | Todo)[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [dataSource]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        // Используем shared API для загрузки данных
        const result =
          dataSource === 'quotes'
            ? await fetchQuotes(ITEMS_PER_PAGE, skip)
            : await fetchTodos(ITEMS_PER_PAGE, skip);
        setPreviousData(data); // Сохраняем предыдущие данные
        const newData: (Quote | Todo)[] = result.data;
        setData(newData);
        setTotal(result.total);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dataSource, currentPage]);

  const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  // Загружаем удаленный CardList и передаем ему данные
  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="total">Всего элементов: {total}</div>
          <div className="card-container">
            <RemoteCardList
              dataSource={dataSource}
              data={loading ? previousData : data}
            />
            {loading && <div className="loading-overlay">Загрузка...</div>}
          </div>
          <div className="pagination">
            <button
              className={currentPage === 1 ? 'disabled' : 'enabled'}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Предыдущая
            </button>
            <span>
              {' '}
              Страница {currentPage} из {totalPages}{' '}
            </span>
            <button
              className={currentPage === totalPages ? 'disabled' : 'enabled'}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Следующая
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default CardList;
