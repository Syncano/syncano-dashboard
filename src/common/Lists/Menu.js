import React from 'react';
import { IconMenu, IconButton, MenuItem } from 'material-ui';

const menuItemStyle = {
  cursor: 'pointer'
};

const Menu = ({ children, checkedItemsCount, handleSelectAll, handleUnselectAll, itemsCount }) => {
  const areAllItemsChecked = checkedItemsCount >= itemsCount;

  return (
    <IconMenu
      iconButtonElement={
        <IconButton
          touch={true}
          tooltipPosition="bottom-left"
          iconClassName="synicon-dots-vertical"
        />
      }
      anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText="Select All"
        style={!areAllItemsChecked && menuItemStyle}
        disabled={areAllItemsChecked}
        onTouchTap={handleSelectAll}
      />
      <MenuItem
        primaryText="Unselect All"
        style={checkedItemsCount && menuItemStyle}
        disabled={!checkedItemsCount}
        onTouchTap={handleUnselectAll}
      />
      <div style={menuItemStyle}>
        {React.Children.map(children, (child) => React.cloneElement(child, { checkedItemsCount }))}
      </div>
    </IconMenu>
  );
};

export default Menu;
