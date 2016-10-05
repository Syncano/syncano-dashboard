import React from 'react';
import LinkListItem from './LinkListItem';

export default (props) => {
  const styles = {
    root: {
      color: '#9b9b9b',
      fontSize: 12,
      lineHeight: '16px'
    },
    innerDivStyle: {
      padding: '8px 20px 8px 48px',
      marginLeft: 20
    }
  };

  return (
    <LinkListItem
      style={styles.root}
      innerDivStyle={styles.innerDivStyle}
      {...props}
    />
  );
};
