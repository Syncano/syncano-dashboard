import React from 'react';
import { IconButton, IconMenu } from 'material-ui';
import ColumnsFilterMenuListItem from './ColumnsFilterMenuListItem';

const ColumnsFilterMenu = ({ columns, checkToggleColumn }) => (
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
      <ColumnsFilterMenuListItem
        column={column}
        checkToggleColumn={checkToggleColumn}
      />
    ))}
  </IconMenu>
);

export default ColumnsFilterMenu;
