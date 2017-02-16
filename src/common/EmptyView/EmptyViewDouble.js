import React from 'react';

import { FontIcon, RaisedButton } from 'material-ui';

const EmptyViewDouble = ({
  title,
  description,
  iconClassName,
  iconColor,
  leftIconType,
  rightIconType,
  handleClickRightButton,
  handleClickLeftButton,
  labelButtonLeft,
  labelButtonRight
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '70px 50px'
    },
    mainContainer: {
      color: '#000',
      width: 680,
      height: 500,
      border: '2px #dedede dashed',
      borderRadius: 5,
      margin: '50px auto 0 auto'
    },
    icon: {
      fontSize: 72
    },
    title: {
      marginTop: 40,
      fontSize: 26,
      fontWeight: 400,
      lineHeight: '34px',
      hyphens: 'none',
      '-webkit-hyphens': 'none', /* Saf 5.1+ */
      '-moz-hyphens': 'none', /* Fx 6.0+ */
      '-ms-hyphens': 'none' /* IE 10+ */
    },
    description: {
      lineHeight: '26px',
      fontSize: 16,
      padding: 40,
      textAlign: 'center'
    },
    url: {
      display: 'block',
      fontSize: 16,
      marginBottom: 20
    },
    box: {
      width: 250
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div
        data-e2e="push-notifications-empty-view"
        style={styles.container}
      >
        <FontIcon
          className={iconClassName}
          color={iconColor}
          style={styles.icon}
        />
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        <div style={styles.flexContainer}>
          <div style={styles.box}>
            <RaisedButton
              label={labelButtonLeft}
              primary={true}
              onTouchTap={handleClickLeftButton}
              icon={leftIconType}
            />
          </div>
          <div style={styles.box}>
            <RaisedButton
              label={labelButtonRight}
              primary={true}
              onTouchTap={handleClickRightButton}
              icon={rightIconType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyViewDouble;
