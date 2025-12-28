import React, { useState, useEffect, memo, ComponentType } from 'react';

// Define types locally to avoid import issues with .d.ts files
type CardListProps = {
  dataSource: string;
  data?: any[];
};

type DataSelectorProps = {
  onChange: (value: string) => void;
};

type ThemeSelectorProps = {
  onChange: (value: string) => void;
};

type RemoteComponentLoaderProps =
  | ({ modulePath: 'cardList/CardList'; componentName: string } & CardListProps)
  | ({ modulePath: 'dataSelector/DataSelector'; componentName: string } & DataSelectorProps)
  | ({ modulePath: 'themeSelector/ThemeSelector'; componentName: string } & ThemeSelectorProps);

/**
 * Универсальный компонент для загрузки удаленных микрофронтендов
 */
const RemoteComponentLoaderBase: React.FC<RemoteComponentLoaderProps> = ({ modulePath, componentName, ...props }) => {
  const [RemoteComponent, setRemoteComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    const importMap = {
      'cardList/CardList': () => import('cardList/CardList'),
      'dataSelector/DataSelector': () => import('dataSelector/DataSelector'),
      'themeSelector/ThemeSelector': () => import('themeSelector/ThemeSelector'),
    };

    const importFn = importMap[modulePath as keyof typeof importMap];
    if (!importFn) {
      console.error(`Unknown module path: ${modulePath}`);
      return;
    }

    importFn()
      .then((module) => {
        const component = module?.default || null;
        setRemoteComponent(() => component);
      })
      .catch((err) => {
        console.error(`Failed to load ${componentName}:`, err);
        const FallbackComponent = (props: any) => React.createElement('div', {}, `${componentName} failed to load`);
        setRemoteComponent(() => FallbackComponent);
      });
  }, [modulePath, componentName]);

  return RemoteComponent ? (
    <RemoteComponent {...props} />
  ) : (
    <div>Loading {componentName}...</div>
  );
};

const RemoteComponentLoader = memo(RemoteComponentLoaderBase);
export default RemoteComponentLoader;