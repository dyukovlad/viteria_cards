declare module 'shared/api' {
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

  export type RawApiResponse<T> = {
    [key: string]: T[] | number;
  };

  // Функции API
  export const fetchData: <T extends Quote | Todo>(
    endpoint: string,
    limit: number,
    skip: number
  ) => Promise<ApiResponse<T>>;

  export const fetchQuotes: (
    limit?: number,
    skip?: number
  ) => Promise<ApiResponse<Quote>>;

  export const fetchTodos: (
    limit?: number,
    skip?: number
  ) => Promise<ApiResponse<Todo>>;
}

declare module 'webComponents/register' {
  export const registerComponents: () => void;
}

declare module 'dataSelector/DataSelector' {
  interface DataSelectorProps {
    onChange: (value: string) => void;
  }
  const DataSelector: React.ComponentType<DataSelectorProps>;
  export default DataSelector;
  export type { DataSelectorProps };
}

declare module 'themeSelector/ThemeSelector' {
  interface ThemeSelectorProps {
    onChange: (value: string) => void;
  }
  const ThemeSelector: React.ComponentType<ThemeSelectorProps>;
  export default ThemeSelector;
  export type { ThemeSelectorProps };
}

declare module 'cardList/CardList' {
  interface CardItem {
    id: number;
    [key: string]: any;
  }
  interface CardListProps {
    dataSource: string;
    data?: CardItem[];
  }
  const CardList: React.ComponentType<CardListProps>;
  export default CardList;
  export type { CardListProps, CardItem };
}
