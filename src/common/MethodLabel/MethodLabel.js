import React from 'react';

import { colors as Colors } from 'material-ui/styles/';

const styles = {
  container: {
    width: '60px',
    borderRadius: 5,
    color: '#fff',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  backgroundColor: {
    get: Colors.green700,
    post: '#105CCA',
    put: Colors.purple500,
    patch: Colors.deepOrange500,
    delete: '#FF1300'
  }
};

const MethodLabel = ({ method, style }) => {
  const methodLabelStyle = {
    ...styles.container,
    ...style,
    backgroundColor: styles.backgroundColor[method]
  };

  return (
    <div style={methodLabelStyle}>
      {method}
    </div>
  );
};

export default MethodLabel;
