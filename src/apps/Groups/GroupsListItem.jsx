import React from 'react';

import { ColumnList, Color } from '../../common/';

const Column = ColumnList.Column;

const GroupsListItem = ({ item }) => (
  <ColumnList.Item
    checked={item.checked}
    key={item.id}
  >
    <Column.CheckIcon
      id={item.id.toString()}
      iconClassName="arrow-up-bold"
      checkable={false}
      background={Color.getColorByName('blue', 'xlight')}
      className="col-flex-1"
      primaryText={item.label}
      secondaryText={`ID: ${item.id}`}
    />
  </ColumnList.Item>
);

export default GroupsListItem;
