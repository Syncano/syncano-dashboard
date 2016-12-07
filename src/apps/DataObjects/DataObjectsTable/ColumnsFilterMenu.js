import React from 'react';
import { IconButton, IconMenu } from 'material-ui';
import ColumnsFilterMenuListItem from './ColumnsFilterMenuListItem';

const ColumnsFilterMenu = ({ columns, checkToggleColumn }) => (
  <IconMenu
    iconButtonElement={<IconButton iconClassName="synicon-view-column" />}
    closeOnItemTouchTap={false}
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
