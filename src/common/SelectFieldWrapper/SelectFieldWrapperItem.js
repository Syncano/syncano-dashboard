import React from 'react';
import { ListItem, MenuItem } from 'material-ui';
import { Truncate } from '../';

const SelectFieldItem = (item, type, itemStyles) => {
  const styles = {
    dropdownList: {
      cursor: 'pointer'
    }
  };

  const itemStyle = {
    list: (
      <ListItem
        key={`select-${item.payload}`}
        value={item.payload}
        primaryText={item.text}
        secondaryText={item.desc}
        data-e2e={`dropdown-choice-${item.text}`}
        style={styles.dropdownList}
        innerDivStyle={itemStyles.innerDiv}
      />
    ),
    menu: (
      <MenuItem
        key={`select-${item.payload}`}
        value={item.payload}
        primaryText={(
          <Truncate text={item.text} />
        )}
        secondaryText={item.desc}
        data-e2e={`dropdown-choice-${item.text}`}
        style={styles.dropdownList}
      />
    )
  };

  return itemStyle[type];
};

export default SelectFieldItem;
