import React, { memo } from 'react';

export type ThemeSelectorProps = {
  onChange: (value: string) => void;
};

const themes = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = memo(({ onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {themes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.label}
        </option>
      ))}
    </select>
  );
});

export default ThemeSelector;
