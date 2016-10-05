import React from 'react';
import { Checkbox, IconMenu, ListItem, IconButton } from 'material-ui';

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
        primaryText={column.name || column.id}
        secondaryText={column.tooltip}
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

ColumnsFilterMenu.propTypes = {
  columns: React.PropTypes.array,
  checkToggleColumn: React.PropTypes.func
};

export default ColumnsFilterMenu;
