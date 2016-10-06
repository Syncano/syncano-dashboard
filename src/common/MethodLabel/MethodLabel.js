import React from 'react';

import { colors as Colors } from 'material-ui/styles';

const styles = {
  container: {
    padding: '8px 0',
    borderRadius: 5,
    width: 64,
    color: Colors.grey100,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  backgroundColor: {
    get: Colors.green500,
    post: Colors.blue500,
    put: Colors.purple500,
    patch: Colors.deepOrange500,
    delete: Colors.red500
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
