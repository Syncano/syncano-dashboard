import React from 'react';

export default ({ children }) => {
  const styles = {
    root: {
      width: 238 * React.Children.count(children),
      paddingTop: 16,
      paddingRight: 20,
      display: 'flex',
      flexDirection: 'row'
    },
    column: {
      display: 'flex'
    }
  };

  return (
    <div style={styles.root}>
      {React.Children.map(children, (child) => (
        <div
          className="col-flex-0"
          style={styles.column}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
