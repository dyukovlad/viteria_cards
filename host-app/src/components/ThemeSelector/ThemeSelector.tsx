import React, { memo } from 'react';
import RemoteThemeSelector from './RemoteThemeSelector';

type ThemeSelectorProps = {
  onChange: (newValue: string) => void;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = memo(({ onChange }) => {
  return <RemoteThemeSelector onChange={onChange} />;
});

export default ThemeSelector;
