import React from 'react';
import { FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const EmptyViewSmall = ({ handleClick, iconClassName, description, buttonLabel }) => {
  const styles = {
    container: {
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 250,
      marginBottom: 40
    },
    icon: {
      fontSize: 90
    },
    text: {
      fontSize: 24
    }
  };

  return (
    <div style={styles.container}>
      <FontIcon
        style={styles.icon}
        className={iconClassName}
        color={Colors.grey400}
      />
      <div style={styles.text}>
        {description}
      </div>
      <RaisedButton
        primary={true}
        label={buttonLabel}
        onTouchTap={handleClick}
      />
    </div>
  );
};

export default EmptyViewSmall;
