// Этот файл предоставляет типизированный доступ к shared API через Module Federation
// Используется для избежания динамических импортов в компонентах

let sharedApi: any = null;

// Типы для API ответов
export type ApiResponse<T> = {
  data: T[];
  total: number;
};

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

// Тип для shared API
type SharedApiInterface = {
  fetchQuotes: (limit: number, skip: number) => Promise<ApiResponse<Quote>>;
  fetchTodos: (limit: number, skip: number) => Promise<ApiResponse<Todo>>;
};

// Функция для получения shared API
export const getSharedApi = async (): Promise<SharedApiInterface> => {
  if (!sharedApi) {
    try {
      // Загружаем shared API через Module Federation
      const module = await import('shared/api');
      sharedApi = module;
    } catch (err: any) {
      console.error('Failed to load shared API:', err);
      throw err;
    }
  }
  return sharedApi as SharedApiInterface;
};

// Типизированные функции-обертки для удобного использования
export const fetchQuotes = async (
  limit: number = 5,
  skip: number = 0
): Promise<ApiResponse<Quote>> => {
  const api = await getSharedApi();
  return api.fetchQuotes(limit, skip);
};

export const fetchTodos = async (
  limit: number = 5,
  skip: number = 0
): Promise<ApiResponse<Todo>> => {
  const api = await getSharedApi();
  return api.fetchTodos(limit, skip);
};
