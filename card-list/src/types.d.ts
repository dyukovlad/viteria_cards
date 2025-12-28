// Типы для кастомных web-components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'quote-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          quote: string;
          author: string;
        },
        HTMLElement
      >;
      'todo-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          todo: string;
          completed: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};