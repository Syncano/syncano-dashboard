import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { FontIcon } from 'material-ui';

const Notification = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  getDefaultProps() {
    return {
      type: 'info',
      isCloseButtonVisible: true
    };
  },

  getInitialState() {
    return {
      isNotificationVisible: true
    };
  },

  getStyles() {
    const { type, isCloseButtonVisible } = this.props;
    const iconColor = type === 'warning' ? '#ffcc01' : 'inherit';

    return {
      icon: {
        fontSize: 26,
        lineHeight: 1,
        color: iconColor,
        display: 'inline-flex',
        verticalAlign: 'middle'
      },
      notificationContainer: {
        overflow: 'hidden'
      },
      notificationContent: {
        padding: isCloseButtonVisible ? '20px 30px 20px 10px' : '10px 10px',
        borderRadius: '2px',
        display: 'flex',
        fontSize: '16px',
        alignItems: 'center',
        lineHeight: '1.4',
        position: 'relative'
      },
      notificationContentIcon: {
        minWidth: '34px'
      },
      notificationInfo: {
        backgroundColor: '#E1F5FE',
        color: '#00B0FF'
      },
      notificationWarning: {
        backgroundColor: 'rgba(255, 203, 0, .1)',
        color: '#c9a206'
      },
      notificationError: {
        backgroundColor: '#FCE4EC',
        color: '#F50057'
      },
      closeButton: {
        display: isCloseButtonVisible ? 'block' : 'none',
        position: 'absolute',
        top: 4,
        right: 8,
        cursor: 'pointer',
        fontWeight: 700
      }
    };
  },

  handleCloseNotification() {
    this.setState({ isNotificationVisible: false });
  },

  render() {
    const styles = this.getStyles();
    const { className, type, children } = this.props;
    const { isNotificationVisible } = this.state;
    const notificationStyle = `notification${_.capitalize(type)}`;
    const iconClass = classNames({
      information: type === 'info',
      'alert-circle': type === 'error',
      alert: type === 'warning'
    });

    return isNotificationVisible && (
      <div
        className={className}
        style={{ ...styles.notificationContainer }}
        data-e2e="notification-bar"
      >
        <div style={{ ...styles[notificationStyle], ...styles.notificationContent }}>
          <div
            style={styles.closeButton}
            onClick={this.handleCloseNotification}
          >
            x
          </div>
          <div style={styles.notificationContentIcon}>
            <FontIcon
              className={`synicon-${iconClass}`}
              style={styles.icon}
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }
});

export default Notification;
