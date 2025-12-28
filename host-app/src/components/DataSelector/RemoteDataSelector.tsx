import React, { memo } from 'react';
import RemoteComponentLoader from '../../utils/RemoteComponentLoader';

type RemoteDataSelectorProps = {
  onChange: (newValue: string) => void;
};

const RemoteDataSelector: React.FC<RemoteDataSelectorProps> = memo(
  ({ onChange }) => {
    return (
      <RemoteComponentLoader
        componentName="DataSelector"
        modulePath="dataSelector/DataSelector"
        onChange={onChange}
      />
    );
  }
);

export default RemoteDataSelector;
