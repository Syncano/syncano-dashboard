import React from 'react';
import Reflux from 'reflux';
import { Link, withRouter } from 'react-router';
import localStorage from 'local-storage-fallback';
import _ from 'lodash';

import { FormMixin } from '../../mixins';

import Store from './AuthStore';
import Actions from './AuthActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Constants from './AuthConstants';

import { RaisedButton, TextField } from 'material-ui';
import { Notification, Show, SocialAuthButtonsList } from '../../common/';
import AccountContainer from './AccountContainer';

const AccountLogin = React.createClass({
  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: {
        message: '^Invalid email address'
      }
    },
    password: {
      presence: true
    }
  },

  componentWillUpdate() {
    const { location, router } = this.props;

    if (SessionStore.isAuthenticated()) {
      const queryNext = location.query.next || null;
      const lastInstanceName = localStorage.getItem('lastInstanceName') || null;

      SessionStore
        .getConnection()
        .Instance
        .please()
        .list()
        .then((instances) => {
          if (_.some(instances, { name: lastInstanceName })) {
            router.replace({
              pathname: queryNext,
              query: _.omit(location.query, 'next')
            });
          } else {
            router.replace({
              name: 'instances',
              query: _.omit(location.query, 'next')
            });
          }
        })
        .catch(() => {
          router.replace('instances');
        });
    }

    const invKey = location.query.invitation_key || null;

    if (invKey !== null && SessionActions.getInvitationFromUrl() !== invKey) {
      SessionActions.setInvitationFromUrl(invKey);
    }
  },

  handleSocialLogin(network) {
    Actions.socialLogin(network);
  },

  handleSuccessfullValidation(data) {
    Actions.passwordSignIn({
      email: data.email,
      password: data.password
    });
  },

  render() {
    const { query } = this.props.location;
    const { email, password, canSubmit } = this.state;

    return (
      <AccountContainer>
        <div className="account-container__content__header vm-3-b">
          <p className="vm-2-b">Access your dashboard</p>
        </div>
        {this.renderFormNotifications()}
        <form
          onSubmit={this.handleFormValidation}
          className="account-container__content__form"
          acceptCharset="UTF-8"
          method="post"
        >
          <div className="vm-2-b">
            <Show if={this.getValidationMessages('detail').length}>
              <Notification type="error">
                {this.getValidationMessages('detail').join(' ')}
              </Notification>
            </Show>
          </div>
          <TextField
            ref="email"
            value={email}
            onChange={(event, value) => this.setState({ email: value })}
            errorText={this.getValidationMessages('email').join(' ')}
            name="email"
            className="text-field"
            autoComplete="email"
            hintText="Email"
            fullWidth={true}
          />
          <TextField
            ref="password"
            value={password}
            onChange={(event, value) => this.setState({ password: value })}
            errorText={this.getValidationMessages('password').join(' ')}
            type="password"
            name="password"
            className="text-field vm-4-b"
            autoComplete="password"
            hintText="My password"
            fullWidth={true}
          />
          <RaisedButton
            type="submit"
            label="Login"
            labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
            disabled={!canSubmit}
            style={{ boxShadow: 'none', height: '48px', width: '100%' }}
            primary={true}
            onTouchTap={this.handleFormValidation}
          />
        </form>
        <SocialAuthButtonsList
          networks={Constants.SOCIAL_NETWORKS_LOGIN}
          onSocialLogin={this.handleSocialLogin}
        />
        <div className="account-container__content__footer">
          <ul className="list--flex list--horizontal">
            <li>
              <p>
                <Link to="password-reset">Forgot password?</Link>
              </p>
            </li>
            <li>
              <p>
                <span>Don't have an account? </span>
                <Link
                  to={{
                    name: 'signup',
                    query
                  }}
                >
                  Sign up here
                </Link>
              </p>
            </li>
          </ul>
          <p className="vm-4-t vm-0-b">
            If you created your account before August 2015, please login <a href="https://login.syncano.com/">here</a>
          </p>
        </div>
      </AccountContainer>
    );
  }
});

export default withRouter(AccountLogin);
