import React from 'react';

const styles = {
  container: {
    width: '50px',
    borderRadius: 5,
    color: '#fff',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  backgroundColor: {
    get: '#4CAF50',
    post: '#105CCA',
    put: '#9C27B0',
    patch: '#FF5722'
  }
};

const MethodLabel = ({ method, style }) => (
  <div style={{ ...styles.container, ...style, backgroundColor: styles.backgroundColor[method] }}>
    {method}
  </div>
);

export default MethodLabel;
