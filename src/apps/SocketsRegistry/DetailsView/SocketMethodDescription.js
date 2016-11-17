import React from 'react';

import { Divider } from 'material-ui';

const SocketMethodDescription = ({ headerLabel, className, style, headerStyle, contentStyle, children }) => {
  const styles = {
    root: {
      lineHeight: 1.6,
      textTransform: 'uppercase',
      fontSize: 20
    },
    header: {
      marginBottom: 24
    },
    content: {
      wordBreak: 'break-all',
      marginTop: 24,
      fontSize: 16,
      textTransform: 'none'
    }
  };

  return (
    <div
      className={className}
      style={{ ...styles.root, ...style }}
    >
      <div style={{ ...styles.header, ...headerStyle }}>
        {headerLabel}
      </div>
      <Divider />
      <div style={{ ...styles.content, contentStyle }}>
        {children}
      </div>
    </div>
  );
};

export default SocketMethodDescription;
