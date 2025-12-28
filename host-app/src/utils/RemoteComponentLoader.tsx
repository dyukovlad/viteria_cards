import React, { useState, useEffect, memo, ComponentType } from 'react';

type CardListProps = {
  dataSource: string;
  data?: any[];
};

type DataSelectorProps = {
  onChange: (newValue: string) => void;
};

type ThemeSelectorProps = {
  onChange: (newValue: string) => void;
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
    let importPromise: Promise<any>;

    switch (modulePath) {
      case 'cardList/CardList':
        importPromise = import('cardList/CardList');
        break;
      case 'dataSelector/DataSelector':
        importPromise = import('dataSelector/DataSelector');
        break;
      case 'themeSelector/ThemeSelector':
        importPromise = import('themeSelector/ThemeSelector');
        break;
      default:
        console.error(`Unknown module path: ${modulePath}`);
        return;
    }

    importPromise
      .then((module) => {
        let component: ComponentType<any> | null = null;

        if (module && typeof module.default === 'function') {
          component = module.default;
        } else if (typeof module === 'function') {
          component = module;
        } else if (module && module.default && typeof module.default === 'function') {
          component = module.default;
        }

        if (component) {
          setRemoteComponent(() => component);
        } else {
          console.error(
            `${componentName} component not found in module:`,
            module
          );
          if (module) {
            console.log(
              `Available exports from ${componentName}:`,
              Object.keys(module)
            );
          }
        }
      })
      .catch((err) => console.error(`Failed to load ${componentName}:`, err));
  }, [componentName]);

  return RemoteComponent ? (
    <RemoteComponent {...props} />
  ) : (
    <div>Loading {componentName}...</div>
  );
};

const RemoteComponentLoader = memo(RemoteComponentLoaderBase);
export default RemoteComponentLoader;