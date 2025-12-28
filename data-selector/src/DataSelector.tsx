import React, { memo } from 'react';

type DataSelectorProps = {
  onChange: (newValue: string) => void;
};

const dataSources = [
  { value: 'quotes', label: 'Цитаты' },
  { value: 'todos', label: 'Список задач' },
];

const DataSelector: React.FC<DataSelectorProps> = memo(({ onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {dataSources.map((source) => (
        <option key={source.value} value={source.value}>
          {source.label}
        </option>
      ))}
    </select>
  );
});

export default DataSelector;
