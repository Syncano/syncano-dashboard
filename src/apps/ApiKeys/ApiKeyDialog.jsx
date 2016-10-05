import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeyDialogStore';

// Components
import { Toggle, TextField } from 'material-ui';
import { Dialog } from '../../common/';

export default React.createClass({
  displayName: 'ApiKeyDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  getApiKeyParams() {
    const { id, description, allow_user_create, allow_anonymous_read, ignore_acl } = this.state;

    return {
      id,
      description,
      allow_user_create,
      allow_anonymous_read,
      ignore_acl
    };
  },

  handleAddSubmit() {
    Actions.createApiKey(this.getApiKeyParams());
  },

  handleEditSubmit() {
    Actions.updateApiKey(this.state.id, this.getApiKeyParams());
  },

  handleToogle(event, status) {
    const state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  renderToggles() {
    const toggles = {
      ignore_acl: 'Ignore ACL?',
      allow_user_create: 'User registration?',
      allow_anonymous_read: 'Anonymous usage?'
    };

    return _.map(toggles, (value, key) => (
      <div
        key={key}
        className="vp-2-b"
      >
        <Toggle
          ref={key}
          name={key}
          defaultToggled={this.state[key]}
          onToggle={this.handleToogle}
          label={value}
        />
      </div>
    ));
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const { open, isLoading, canSubmit } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an API Key`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            data-e2e-submit="api-keys-submit"
            data-e2e-cancel="api-keys-cancel"
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              When trying to connect to an Instance with one of our libraries,
              the API key is passed as a parameter and serves as the password
              for connecting to your Instance.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Ignore ACL">
              API Key with this flag set to true will ignore any permissions set
              for the resources in Syncano.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="User registration">
              {'API Key with this flag enables user registration (read about adding new users '}
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/user-management#adding-a-user">
                here
              </Dialog.SidebarLink>
              {' ).'}
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Anonymous usage">
              API Key with this flag will allow making GET requests to Data Classes
              and Data Objects provided that "other_permissions"
              for those resources are set appropriately.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/permissions#using-api-keys-and-user-keys">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        {this.renderFormNotifications()}
        <TextField
          ref="description"
          name="description"
          autoFocus={true}
          fullWidth={true}
          value={this.state.description}
          onChange={(event, value) => this.setState({ description: value })}
          errorText={this.getValidationMessages('description').join(' ')}
          hintText="API key's description"
          floatingLabelText="Description (optional)"
          className="vm-3-b"
        />
        {this.renderToggles()}
      </Dialog.FullPage>
    );
  }
});
