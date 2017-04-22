import React from 'react';
import Radium from 'radium';

export default Radium(({ text }) => {
  const styles = {
    root: {
      padding: '20px 20px 10px',
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      color: '#949CAD',
      fontSize: 10,
      textTransform: 'uppercase',
      paddingRight: 10
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.text}>{text}</div>
      <div style={styles.line} />
    </div>
  );
});
