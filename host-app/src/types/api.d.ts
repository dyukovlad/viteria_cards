// Типы для API данных
export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface ApiResponse<T> {
  [key: string]: T[];
  total: number;
}