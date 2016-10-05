import React from 'react';
import { IconButton } from 'material-ui';

const CloseButton = (props) => {
  const styles = {
    style: {
      position: 'absolute',
      top: 10,
      right: 10
    },
    iconStyle: {
      color: '#b8c0c9'
    }
  };

  return (
    <IconButton
      data-e2e={props['data-e2e']}
      style={{ ...styles.style, ...props.style }}
      iconStyle={{ ...styles.iconStyle, ...props.iconStyle }}
      onTouchTap={props.onTouchTap}
      iconClassName="synicon-close"
    />
  );
};

export default CloseButton;
