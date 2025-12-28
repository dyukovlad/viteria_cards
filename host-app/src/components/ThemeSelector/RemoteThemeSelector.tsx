import React, { memo } from 'react';
import RemoteComponentLoader from '../../utils/RemoteComponentLoader';

type RemoteThemeSelectorProps = {
  onChange: (newValue: string) => void;
};

const RemoteThemeSelector: React.FC<RemoteThemeSelectorProps> = memo(
  ({ onChange }) => {
    return (
      <RemoteComponentLoader
        componentName="ThemeSelector"
        modulePath="themeSelector/ThemeSelector"
        onChange={onChange}
      />
    );
  }
);

export default RemoteThemeSelector;
