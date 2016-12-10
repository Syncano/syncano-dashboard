import React from 'react';

import { Checkbox, ListItem } from 'material-ui';

const ColumnsFilterMenu = ({ column, checkToggleColumn }) => {
  const handleCheck = () => {
    checkToggleColumn(column.id);
  };

  return (
    <ListItem
      key={column.id}
      id={column.id}
      primaryText={column.id}
      leftCheckbox={
        <Checkbox
          checked={column.checked}
          onCheck={handleCheck}
        />
      }
    />
  );
};

export default ColumnsFilterMenu;
