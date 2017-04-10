import React from 'react';
import { List } from 'material-ui';
import ListSubheader from './ListSubheader';

export default ({ subheader, children }) => {
  const styles = {
    list: {
      paddingTop: 0,
      paddingBottom: 10,
      backgroundColor: 'transparent',
      borderBottom: '1px solid #D8D8D8'
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
