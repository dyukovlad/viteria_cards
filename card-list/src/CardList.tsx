import React, { memo } from 'react';

export type CardItem = {
  id: number;
  [key: string]: any;
};

export type CardListProps = {
  dataSource: string;
  data?: CardItem[];
};

const CardList: React.FC<CardListProps> = memo(({ dataSource, data = [] }) => {
  return (
    <div className="card-list">
      {data.length > 0 ? (
        data.map((item) =>
          dataSource === 'quotes'
            ? React.createElement('quote-card', {
                key: item.id,
                quote: item.quote,
                author: item.author,
              })
            : React.createElement('todo-card', {
                key: item.id,
                todo: item.todo,
                completed: (item.completed || false).toString(),
              })
        )
      ) : (
        <div>No data to display</div>
      )}
    </div>
  );
});

export default CardList;
