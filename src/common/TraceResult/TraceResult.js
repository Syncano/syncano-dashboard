import React from 'react';

const styles = {
  root: {
    padding: 25,
    color: '#fff',
    whiteSpace: 'pre-wrap',
    font: '12px/normal \'Monaco\', monospace',
    backgroundColor: '#4C4A43'
  },
  errorContainer: {
    borderTop: '1px solid rgba(255, 255, 255, .1)'
  }
};

const TraceResult = ({ result, error, style, ...other }) => {
  const renderError = () => {
    if (error) {
      return (
        <div
          className="vm-2-t vp-2-t"
          style={styles.errorContainer}
        >
          {error}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      {...other}
      style={{ ...styles.root, ...style }}
    >
      <div>{result}</div>
      {renderError()}
    </div>
  );
};

export default TraceResult;
