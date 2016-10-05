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
      color: '#aaa',
      fontSize: 10,
      textTransform: 'uppercase',
      paddingRight: 10
    },
    line: {
      height: 1,
      flex: '1',
      background: '#eee',
      position: 'relative',
      top: '-1px'
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.text}>{text}</div>
      <div style={styles.line} />
    </div>
  );
});
