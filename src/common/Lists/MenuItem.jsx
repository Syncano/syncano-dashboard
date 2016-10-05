import React from 'react';
import { MenuItem } from 'material-ui';

export default ({ primaryText = 'Delete Selected', checkedItemsCount, disabled, ...other }) => (
  <MenuItem
    {...other}
    primaryText={primaryText}
    disabled={disabled || !checkedItemsCount}
  />
);
