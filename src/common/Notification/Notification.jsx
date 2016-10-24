import React, { Component } from 'react';
import _ from 'lodash';

import { FontIcon } from 'material-ui';

import NotificationCloseButton from './NotificationCloseButton';

class Notification extends Component {
  static defaultProps = {
    type: 'info',
    hasCloseButtonVisible: true
  };

  constructor() {
    super();

    this.state = { isVisible: true };
  }

  getStyles = () => {
    const { type, hasCloseButtonVisible } = this.props;

    return {
      root: {
        padding: hasCloseButtonVisible ? '10px 30px 10px 10px' : 10,
        borderRadius: 2,
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        lineHeight: '1.4',
        position: 'relative'
      },
      themeInfo: {
        backgroundColor: '#E1F5FE',
        color: '#00B0FF'
      },
      themeWarning: {
        backgroundColor: 'rgba(255, 203, 0, .1)',
        color: '#C9A206'
      },
      themeError: {
        backgroundColor: '#FCE4EC',
        color: '#F50057'
      },
      icon: {
        minWidth: 34
      },
      fontIcon: {
        fontSize: 26,
        color: type === 'warning' ? '#FFCC01' : 'inherit',
        display: 'flex'
      }
    };
  }

  closeNotification = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const styles = this.getStyles();
    const { isVisible } = this.state;
    const { type, className, children, hasCloseButtonVisible } = this.props;
    const theme = styles[`theme${_.capitalize(type)}`];
    const syniconClass = {
      info: 'information',
      error: 'alert-circle',
      warning: 'alert'
    }[type];

    if (isVisible) {
      return (
        <div
          className={className}
          style={{ ...styles.root, ...theme }}
          data-e2e="notification-bar"
        >
          <NotificationCloseButton
            isVisible={hasCloseButtonVisible}
            onClick={this.closeNotification}
          />
          <div style={styles.icon}>
            <FontIcon
              className={`synicon-${syniconClass}`}
              style={styles.fontIcon}
            />
          </div>
          <div>{children}</div>
        </div>
      );
    }

    return null;
  }
}

export default Notification;
