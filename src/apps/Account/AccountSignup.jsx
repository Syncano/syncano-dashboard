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
import { SocialAuthButtonsList } from '../../common/';
import AccountContainer from './AccountContainer';

const AccountSignup = React.createClass({
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

  getBottomContent() {
    return (
      <p className="vm-0-b text--center">
        By signing up you agree to our
        <a
          href="http://www.syncano.com/terms-of-service/"
          target="_blank"
        >
          {' Terms of Use and Privacy Policy'}
        </a>.
      </p>
    );
  },

  handleSocialLogin(network) {
    Actions.socialLogin(network);
  },

  handleSuccessfullValidation(data) {
    const { email, password } = data;

    SessionStore.setSignUpMode();

    Actions.passwordSignUp({
      email,
      password
    });
  },

  /*
    there are two handleFormValidation calls due to bug in material-ui
    https://github.com/callemall/material-ui/issues/1396
  */
  render() {
    const { query } = this.props.location;

    return (
      <AccountContainer bottomContent={this.getBottomContent()}>
        <div className="account-container__content__header vm-3-b">
          <p className="vm-2-b">Start Building Now</p>
          <small>
            Simply enter your email, create a password and you're in!<br />
            No credit card required.
          </small>
        </div>
        {this.renderFormNotifications()}
        <form
          onSubmit={this.handleFormValidation}
          className="account-container__content__form"
          acceptCharset="UTF-8"
          method="post"
        >
          <TextField
            ref="email"
            value={this.state.email}
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
            value={this.state.password}
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
            label="Create my account"
            labelStyle={{ fontSize: '16px', lineHeight: '48px' }}
            disabled={!this.state.canSubmit}
            style={{ boxShadow: 'none', height: '48px', width: '100%' }}
            primary={true}
            onClick={this.handleFormValidation}
          />
        </form>
        <SocialAuthButtonsList
          mode="signup"
          networks={Constants.SOCIAL_NETWORKS_SIGNUP}
          onSocialLogin={this.handleSocialLogin}
        />
        <div className="account-container__content__footer">
          <ul className="list--flex list--horizontal">
            <li>
              <p>
                <span>Already have an account? </span>
                <Link
                  to={{
                    name: 'login',
                    query
                  }}
                >
                  Login
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </AccountContainer>
    );
  }
});

export default withRouter(AccountSignup);
