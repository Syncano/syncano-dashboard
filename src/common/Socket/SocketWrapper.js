import React from 'react';
import { IconButton } from 'material-ui';

export default ({ style, iconStyle, ...other }) => {
  const styles = {
    style: {
      padding: 6
    },
    iconStyle: {
      fontSize: 36
    }
  };

  return (
    <IconButton
      {...other}
      style={{ ...styles.style, ...style }}
      iconStyle={{ ...styles.iconStyle, ...iconStyle }}
    />
  );
};
