import React, { useState, useEffect } from 'react';
import DataSelector from './components/DataSelector/DataSelector';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CardList from './components/CardList/CardList';
import { LABELS } from './constants/constants';

type AppState = {
  dataSource: string;
  theme: string;
  componentsLoaded: boolean;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    dataSource: 'quotes',
    theme: 'light',
    componentsLoaded: false,
  });

  useEffect(() => {
    document.documentElement.setAttribute('main-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    import('webComponents/register')
      .then((module) => {
        module.registerComponents();
        setState((prev) => ({ ...prev, componentsLoaded: true }));
      })
      .catch((err) => console.error('Failed to load Web Components:', err));
  }, []);

  const handleDataChange = (newDataSource: string) => {
    setState((prev) => ({ ...prev, dataSource: newDataSource }));
  };

  const handleThemeChange = (newTheme: string) => {
    setState((prev) => ({ ...prev, theme: newTheme }));
  };

  if (!state.componentsLoaded) return <div>Loading components...</div>;

  return (
    <div className="container">
      <h1>Card Showcase</h1>
      <div className="controls">
        <div className="control-group">
          <label>{LABELS.dataSource}</label>
          <DataSelector onChange={handleDataChange} />
        </div>
        <div className="control-group">
          <label>{LABELS.theme}</label>
          <ThemeSelector onChange={handleThemeChange} />
        </div>
      </div>
      <CardList dataSource={state.dataSource} />
    </div>
  );
};

export default App;
