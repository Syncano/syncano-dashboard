import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { Color } from '../../common/';

const PreviewHexagon = ({ color, icon }) => {
  const backgroundColor = Color.getColorByName(color) || 'rgb(171, 71, 188)';
  const customSocketIcon = icon || 'custom-socket';
  const styles = {
    container: {
      background: backgroundColor,
      margin: '0 auto 15px',
      width: 40,
      height: 76,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerPseudo: {
      position: 'absolute',
      borderStyle: 'solid',
      borderTopWidth: 38,
      borderBottomWidth: 38,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    containerBefore: {
      borderRightColor: backgroundColor,
      left: -28,
      borderLeftColor: 'transparent',
      borderRightWidth: 25
    },
    containerAfter: {
      borderLeftColor: backgroundColor,
      right: -28,
      borderRightColor: 'transparent',
      borderLeftWidth: 25
    },
    icon: {
      fontSize: 40,
      display: 'inline-flex',
      color: '#fff'
    }
  };

  return (
    <Paper
      zDepth={1}
      style={styles.container}
    >
      <div style={{ ...styles.containerBefore, ...styles.containerPseudo }} />
      <FontIcon
        className={`synicon-${customSocketIcon}`}
        style={styles.icon}
      />
      <div style={{ ...styles.containerAfter, ...styles.containerPseudo }} />
    </Paper>
  );
};

export default PreviewHexagon;
