import '@testing-library/jest-dom';

// Mock для Module Federation
window.__webpack_require__ = {
  e: jest.fn(() => Promise.resolve()),
  t: jest.fn(() => ({})),
};

// Mock для импорта удаленных модулей
jest.mock('webComponents/register', () => ({
  registerComponents: () => {},
}), { virtual: true });

// Mock компонентов для удаленных модулей
jest.mock('dataSelector/DataSelector', () => {
  const DataSelectorMock = ({ onChange }) => (
    <select data-testid="data-selector" onChange={(e) => onChange(e.target.value)}>
      <option value="quotes">Цитаты</option>
      <option value="todos">Задачи</option>
    </select>
  );
  return { default: DataSelectorMock };
}, { virtual: true });

jest.mock('themeSelector/ThemeSelector', () => {
  const ThemeSelectorMock = ({ onChange }) => (
    <select data-testid="theme-selector" onChange={(e) => onChange(e.target.value)}>
      <option value="light">Светлая</option>
      <option value="dark">Темная</option>
    </select>
  );
  return { default: ThemeSelectorMock };
}, { virtual: true });

jest.mock('cardList/CardList', () => {
  const CardListMock = ({ dataSource, data = [] }) => (
    <div data-testid="card-list">
      <div>CardList: {dataSource}</div>
      {data.map(item => (
        dataSource === 'quotes' ? (
          <div key={item.id}>{item.quote} - {item.author}</div>
        ) : (
          <div key={item.id}>{item.todo} - {item.completed ? 'Completed' : 'Not Completed'}</div>
        )
      ))}
    </div>
  );
  return { default: CardListMock };
}, { virtual: true });