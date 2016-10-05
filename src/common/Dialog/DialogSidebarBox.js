import React from 'react';

export default ({ children }) => {
  const styles = {
    root: {
      background: 'rgba(184, 192, 201, .1)',
      border: '1px solid rgba(184, 192, 201, .3)',
      borderRadius: 4,
      padding: 15,
      color: 'rgba(68, 68, 68, .5)',
      fontSize: 13,
      lineHeight: 1.5
    }
  };

  return (
    <div style={styles.root}>
      {children}
    </div>
  );
};
