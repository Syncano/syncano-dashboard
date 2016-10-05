import React from 'react';
import { colors as Colors } from 'material-ui/styles';
import CloseButton from '../CloseButton/';

const PageIntro = ({ headline, text, actions, onRequestClose, show = 'true' }) => {
  const styles = {
    main: {
      marginBottom: 24,
      padding: 32,
      background: 'rgba(243, 243, 243, 0.901961)',
      textAlign: 'center',
      position: 'relative'
    },
    headline: {
      marginBottom: 24,
      fontSize: 28,
      color: Colors.grey900,
      lineHeight: 1
    },
    text: {
      margin: 0,
      maxWidth: 640,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 16,
      lineHeight: '1.5em'
    },
    actions: {
      marginTop: 32
    }
  };

  if (show === 'false') {
    return null;
  }

  return (
    <div style={styles.main}>
      {headline && <div style={styles.headline}>{headline}</div>}
      {text && <div style={styles.text}>{text}</div>}
      {actions && <div style={styles.actions}>{actions}</div>}
      {onRequestClose && <CloseButton onTouchTap={onRequestClose} />}
    </div>
  );
};

export default PageIntro;
