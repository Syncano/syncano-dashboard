import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { Color } from '../../common/';

const PreviewCircle = ({ color, icon }) => {
  const styles = {
    container: {
      background: Color.getColorByName(color),
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto 15px',
      width: 100,
      height: 100,
      borderRadius: '50%',
      textAlign: 'center'
    },
    icon: {
      lineHeight: '100px',
      fontSize: 42,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }
  };

  return (
    <Paper
      zDepth={1}
      style={styles.container}
    >
      <FontIcon
        className={`synicon-${icon}`}
        style={styles.icon}
      />
    </Paper>
  );
};

export default PreviewCircle;
