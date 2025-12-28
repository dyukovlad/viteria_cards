import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

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

export type ApiResponse<T> = {
  data: T[];
  total: number;
};

export type RawApiResponse<T> = {
  [key: string]: T[] | number;
};

export const fetchData = async <T extends Quote | Todo>(
  endpoint: string,
  limit: number,
  skip: number
): Promise<ApiResponse<T>> => {
  const response = await axios.get(
    `${API_BASE}/${endpoint}?limit=${limit}&skip=${skip}`
  );
  const data = response.data as any;

  // Нормализуем ответ к единому формату {data: [...], total: number}
  const normalizedData: ApiResponse<T> = {
    data: (data[endpoint] as T[]) || [], // quotes или todos массив
    total: (data.total as number) || 0,
  };

  return normalizedData;
};

export const fetchQuotes = (limit = 5, skip = 0): Promise<ApiResponse<Quote>> =>
  fetchData<Quote>('quotes', limit, skip);
export const fetchTodos = (limit = 5, skip = 0): Promise<ApiResponse<Todo>> =>
  fetchData<Todo>('todos', limit, skip);
