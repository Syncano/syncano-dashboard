import React from 'react';
import { Link } from 'react-router';
import localStorage from 'local-storage-fallback';
import Moment from 'moment';

import { FlatButton, RaisedButton } from 'material-ui';

const UpgradeNowToolbar = React.createClass({
  getInitialState() {
    return {
      shouldDisplay: this.shouldDisplay(),
      isHidden: this.isHidden()
    };
  },

  getStyles() {
    return {
      root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 12,
        background: '#0070D3',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      textContainer: {
        padding: '9px 20px'
      },
      text: {
        margin: 0,
        fontSize: 16,
        lineHeight: 1.4
      },
      buttonsContainer: {
        padding: '9px 20px',
        whiteSpace: 'nowrap'
      },
      remindLaterButton: {
        marginRight: 8
      }
    };
  },

  getDayVariant(subscriptionEndDate) {
    const days = Moment(subscriptionEndDate).diff(new Date(), 'days');
    let dayVariant = false;

    // 14, 7, 3, 1 days before
    switch (true) {
      case (days <= 14 && days > 7):
        dayVariant = 14;
        break;

      case (days <= 7 && days > 3):
        dayVariant = 7;
        break;

      case (days <= 3 && days > 1):
        dayVariant = 3;
        break;

      case (days <= 1):
        dayVariant = 1;
        break;

      default:
        // do nothing
    }

    return dayVariant;
  },

  getLocalStorageName() {
    const { subscriptionEndDate } = this.props;
    const dayVariant = this.getDayVariant(subscriptionEndDate);
    const localStorageName = `upgradeNowToolbar-${subscriptionEndDate}-${dayVariant}-isHidden`;

    return localStorageName;
  },

  isHidden() {
    const localStorageName = this.getLocalStorageName();
    const localStorageValue = localStorage.getItem(localStorageName) || false;

    return localStorageValue;
  },

  shouldDisplay() {
    const { subscriptionEndDate } = this.props;

    if (!subscriptionEndDate) {
      return false;
    }

    const dayVariant = this.getDayVariant(subscriptionEndDate);

    return dayVariant && true;
  },

  hide() {
    const localStorageName = this.getLocalStorageName();

    localStorage.setItem(localStorageName, true);
    this.setState({ isHidden: true });
  },

  render() {
    const { shouldDisplay, isHidden } = this.state;
    const { subscriptionEndDate } = this.props;
    const styles = this.getStyles();
    const days = Moment(subscriptionEndDate).diff(new Date(), 'days');
    const daysText = days > 1 ? 'days' : 'day';

    if (!shouldDisplay || isHidden) {
      return null;
    }

    return (
      <div style={styles.root}>
        <div style={styles.textContainer}>
          <p style={styles.text}>
            Your free builder account expires in {days} {daysText}. Upgrade to keep using Syncano after this period.
          </p>
        </div>
        <div style={styles.buttonsContainer}>
          <FlatButton
            label="Remind Me Later"
            style={styles.remindLaterButton}
            labelStyle={{ fontWeight: 500, color: '#fff' }}
            onClick={this.hide}
          />
          <Link to="profile-billing-plan">
            <RaisedButton
              label="Upgrade Now"
              backgroundColor="#FFCC01"
              labelStyle={{ fontWeight: 500, color: '#1D2228' }}
            />
          </Link>
        </div>
      </div>
    );
  }
});

export default UpgradeNowToolbar;
