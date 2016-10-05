import React from 'react';
import { List } from 'material-ui';
import ListSubheader from './ListSubheader';

export default ({ subheader, children }) => {
  const styles = {
    list: {
      paddingTop: 0,
      paddingBottom: 10,
      backgroundColor: 'transparent'
    }
  };

  return (
    <div>
      <ListSubheader text={subheader} />
      <List style={styles.list}>
        {children}
      </List>
    </div>
  );
};
