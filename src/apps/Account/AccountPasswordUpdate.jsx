import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';

import Store from './AuthStore';
import Constants from './AuthConstants';

import { RaisedButton } from 'material-ui';
import AccountContainer from './AccountContainer';

const AccountPasswordUpdate = React.createClass({
  displayName: 'AccountPasswordUpdate',

  mixins: [Reflux.connect(Store)],

  getStyles() {
    return {
      text: {
        color: 'rgba(0, 0, 0, 0.54)',
        lineHeight: '20px',
        textAlign: 'center',
        padding: '0 14%'
      },
      button: {
        width: '100%',
        boxShadow: 'none',
        height: '48px',
        marginBottom: 28
      },
      buttonLabel: {
        fontSize: 16
      }
    };
  },

  handleButtonClick() {
    const { router } = this.props;

    router.push(Constants.LOGIN_REDIRECT_PATH);
  },

  render() {
    const styles = this.getStyles();

    return (
      <AccountContainer>
        <div className="account-container__content__header">
          <p className="vm-0-b">Password updated</p>
        </div>
        <div>
          <p
            className="vm-4-b"
            style={styles.text}
          >
            Sweet! Your new password has now been set and you can login.
          </p>
          <RaisedButton
            style={styles.button}
            labelStyle={styles.buttonLabel}
            label="Go to dashboard"
            onClick={this.handleButtonClick}
            primary={true}
          />
        </div>
      </AccountContainer>
    );
  }
});

export default withRouter(AccountPasswordUpdate);
