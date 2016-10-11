import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import { FormMixin } from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileSettingsStore';

import { TextField, RaisedButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';

export default React.createClass({
  displayName: 'ProfileSettings',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    first_name: {
      presence: true
    },
    last_name: {
      presence: true
    }
  },

  getStyles() {
    return {
      form: {
        maxWidth: 416
      },
      updateButton: {
        height: 36,
        lineHeight: '36px',
        boxShadow: 0
      },
      updateButtonLabel: {
        lineHeight: '36px',
        fontWeight: 400,
        paddingLeft: 30,
        paddingRight: 30
      }
    };
  },

  handleSuccessfullValidation() {
    Actions.updateSettings(this.state);
  },

  render() {
    const { first_name, last_name, canSubmit, email } = this.state;
    const styles = this.getStyles();
    const title = 'Profile';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title} />
        <Container>
          {this.renderFormNotifications()}
          <form
            style={styles.form}
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post"
          >
            <TextField
              ref="firstName"
              value={first_name}
              onChange={(event, value) => this.setState({ first_name: value })}
              defaultValue={first_name}
              errorText={this.getValidationMessages('first_name').join(' ')}
              name="firstName"
              floatingLabelText="First name"
              hintText="First name"
              fullWidth={true}
            />
            <TextField
              ref="lastName"
              value={last_name}
              onChange={(event, value) => this.setState({ last_name: value })}
              defaultValue={last_name}
              errorText={this.getValidationMessages('last_name').join(' ')}
              name="lastName"
              floatingLabelText="Last name"
              hintText="Last name"
              fullWidth={true}
            />
            <TextField
              ref="email"
              name="email"
              value={email}
              floatingLabelText="Email"
              className="vm-6-b"
              autoComplete="email"
              hintText="Your email"
              disabled={true}
              fullWidth={true}
            />
            <RaisedButton
              type="submit"
              label="Update"
              style={styles.updateButton}
              labelStyle={styles.updateButtonLabel}
              className="raised-button"
              disabled={!canSubmit}
              primary={true}
              data-e2e="profile-update-button"
            />
          </form>
        </Container>
      </div>
    );
  }
});
