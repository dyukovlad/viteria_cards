import React, { memo } from 'react';
import RemoteDataSelector from './RemoteDataSelector';

type DataSelectorProps = {
  onChange: (newValue: string) => void;
};

const DataSelector: React.FC<DataSelectorProps> = memo(({ onChange }) => {
  return <RemoteDataSelector onChange={onChange} />;
});

export default DataSelector;
