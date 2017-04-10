import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Helmet from 'react-helmet';

import { FormMixin, SnackbarNotificationMixin } from '../../mixins';

import Store from './ProfileAuthenticationStore';
import Actions from './ProfileActions';
import SessionStore from '../Session/SessionStore';

import { TextField, FlatButton, RaisedButton } from 'material-ui';
import { Clipboard, Container, InnerToolbar } from '../../common/';

const ProfileAuthentication = Radium(React.createClass({
  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    FormMixin,
    SnackbarNotificationMixin
  ],

  validatorConstraints: () => {
    const constraints = {
      newPassword: {
        presence: true
      },
      confirmNewPassword: {
        presence: true,
        equality: 'newPassword'
      }
    };

    if (SessionStore.getUser().has_password) {
      constraints.current_password = {
        presence: true
      };
    }

    return constraints;
  },

  getStyles() {
    return {
      content: {
        padding: '0px 0px 48px'
      },
      contentRow: {
        display: 'flex',
        alignItems: 'center'
      },
      accountKey: {
        fontFamily: 'monospace',
        paddingRight: 8
      },
      updateButtonLabel: {
        lineHeight: '36px',
        fontWeight: 400,
        paddingLeft: 30,
        paddingRight: 30,
        textTransform: 'none',
        color: '#436E1D'
      },
      settingsTitle: {
        paddingBottom: 10
      }
    };
  },

  handleSuccessfullValidation() {
    if (!SessionStore.getUser().has_password) {
      Actions.setPassword(this.state.newPassword);
    } else {
      Actions.changePassword(this.state);
    }
  },

  render() {
    const styles = this.getStyles();
    const { account_key: accountKey, current_password, newPassword, confirmNewPassword } = this.state;
    const user = SessionStore.getUser();
    const hasPassword = user && user.has_password ? user.has_password : null;
    const title = 'Authentication';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title} />
        <Container>
          <div style={styles.content}>
            <div>Account key</div>
            <div className="row" style={styles.contentRow}>
              <div
                style={styles.accountKey}
                data-e2e="authentication-account-key"
              >
                {accountKey}
              </div>
              <div className="flex-1">
                <Clipboard
                  copyText={accountKey}
                  onCopy={() => this.setSnackbarNotification({
                    message: 'Account key copied to the clipboard'
                  })}
                  label="COPY"
                  type="button"
                  data-e2e="authentication-copy-button"
                />
                <FlatButton
                  label="RESET"
                  primary={true}
                  onClick={Actions.resetKey}
                  data-e2e="authentication-reset-button"
                />
              </div>
            </div>
          </div>
          <div style={styles.content}>
            <div style={styles.settingsTitle}>Password settings</div>
            <div className="row" style={styles.contentRow}>
              <div className="col-md-15">
                <form
                  onSubmit={this.handleFormValidation}
                  acceptCharset="UTF-8"
                  method="post"
                >
                  {this.renderFormNotifications()}
                  {hasPassword
                    ? <TextField
                      ref="currentPassword"
                      type="password"
                      value={current_password}
                      onChange={(event, value) => this.setState({ current_password: value })}
                      errorText={this.getValidationMessages('current_password').join(' ')}
                      name="currentPassword"
                      floatingLabelText="Current password"
                      autoComplete="currentPassword"
                      hintText="Current password"
                      fullWidth={true}
                    />
                    : null}
                  <TextField
                    ref="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event, value) => this.setState({ newPassword: value })}
                    errorText={this.getValidationMessages('newPassword').join(' ')}
                    name="newPassword"
                    floatingLabelText="New password"
                    autoComplete="newPassword"
                    hintText="New password"
                    fullWidth={true}
                  />
                  <TextField
                    ref="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(event, value) => this.setState({ confirmNewPassword: value })}
                    errorText={this.getValidationMessages('confirmNewPassword').join(' ')}
                    name="confirmNewPassword"
                    floatingLabelText="Confirm new password"
                    className="vm-6-b"
                    autoComplete="confirmNewPassword"
                    hintText="Confirm new password"
                    fullWidth={true}
                  />
                  <RaisedButton
                    type="submit"
                    label="Update"
                    labelStyle={styles.updateButtonLabel}
                    className="raised-button"
                    disabled={!this.state.canSubmit}
                    buttonStyle={{ borderRadius: '4px' }}
                    backgroundColor="#B8E986"
                    data-e2e="authentication-update-button"
                  />
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}));

export default ProfileAuthentication;
