import React from 'react';

import { Checkbox, IconButton, IconMenu, ListItem } from 'material-ui';

const ColumnsFilterMenu = ({ checkToggleColumn, columns }) => (
  <IconMenu
    closeOnItemTouchTap={false}
    iconButtonElement={<IconButton iconClassName="synicon-view-column" />}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    targetOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
  >
    {columns.map((column) => (
      <ListItem
        key={column.id}
        id={column.id}
        primaryText={column.id}
        leftCheckbox={
          <Checkbox
            checked={column.checked}
            onCheck={() => checkToggleColumn(column.id)}
          />
      }
      />
    ))}
  </IconMenu>
);

export default ColumnsFilterMenu;
