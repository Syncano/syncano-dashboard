import React from 'react';

const styles = {
  wrapper: {
    paddingTop: 20,
    width: '100%'
  },
  description: {
    fontSize: 16,
    textAlign: 'left'
  },
  snippet: {
    color: '#fff',
    whiteSpace: 'pre-wrap',
    font: '14px/normal \'Monaco\', monospace',
    textAlign: 'left',
    borderRadius: 5,
    background: 'rgb(56, 56, 56)',
    padding: 10,
    marginTop: 8
  }
};

const BashSnippet = ({ description, snippet, style }) => (
  <div style={{ ...styles.wrapper, ...style }}>
    <div style={{ ...styles.description, ...style }}>
      {description}
    </div>
    <div style={{ ...styles.snippet, ...style }}>
      {`$ ${snippet}`}
    </div>
  </div>
);

export default BashSnippet;
