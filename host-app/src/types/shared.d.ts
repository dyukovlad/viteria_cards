declare module 'shared/api' {
  // Типы для API ответов
  export type ApiResponse<T> = {
    [key: string]: T[];
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

  // Типы для API функций
  export const fetchQuotes: (
    limit: number,
    skip: number
  ) => Promise<ApiResponse<Quote>>;
  export const fetchTodos: (
    limit: number,
    skip: number
  ) => Promise<ApiResponse<Todo>>;
}

declare module 'webComponents/register' {
  export const registerComponents: () => void;
}

declare module 'dataSelector/DataSelector' {
  const DataSelector: React.ComponentType<{
    onChange: (newValue: string) => void;
  }>;
  export default DataSelector;
}

declare module 'themeSelector/ThemeSelector' {
  const ThemeSelector: React.ComponentType<{
    onChange: (newValue: string) => void;
  }>;
  export default ThemeSelector;
}

declare module 'cardList/CardList' {
  const CardList: React.ComponentType<{
    dataSource: string;
    data?: (Quote | Todo)[];
  }>;
  export default CardList;
}
