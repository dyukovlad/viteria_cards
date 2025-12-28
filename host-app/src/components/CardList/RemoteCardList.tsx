import React, { memo } from 'react';
import RemoteComponentLoader from '../../utils/RemoteComponentLoader';
import { Quote, Todo } from '../../utils/sharedApi';

type RemoteCardListProps = {
  dataSource: string;
  data?: (Quote | Todo)[];
};

const RemoteCardList: React.FC<RemoteCardListProps> = memo(
  ({ dataSource, data = [] }) => {
    return (
      <RemoteComponentLoader
        modulePath="cardList/CardList"
        componentName="CardList"
        dataSource={dataSource}
        data={data}
      />
    );
  }
);

export default RemoteCardList;
