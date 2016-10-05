import React from 'react';
import Store from './GroupsStore';
import { SelectFieldWrapper } from '../../common/';

const GroupsDropdown = (props) => {
  const styles = {
    labelStyle: {
      position: 'absolute',
      maxWidth: '100%'
    }
  };

  return (
    <SelectFieldWrapper
      {...props}
      name="group"
      options={Store.getGroupsDropdown()}
      type="menu"
      autoWidth={true}
      labelStyle={styles.labelStyle}
      floatingLabelText="Group"
    />
  );
};

export default GroupsDropdown;
