import React from 'react';
import { IconButton } from 'material-ui';

const RefreshButton = ({ style, iconStyle, ...other }) => {
  const styles = {
    root: {
      position: 'absolute',
      top: 10,
      right: 40
    },
    iconStyle: {
      color: '#b8c0c9'
    }
  };

  return (
    <IconButton
      {...other}
      data-e2e={other['data-e2e']}
      style={{ ...styles.root, ...style }}
      iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      tooltip="Reload Traces"
      iconClassName="synicon-refresh"
    />
  );
};

export default RefreshButton;
