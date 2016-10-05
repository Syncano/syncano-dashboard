import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Store from './UserDialogStore';
import UsersActions from './UsersActions';
import { GroupsStore } from './../Groups';

// Components
import { TextField } from 'material-ui';
import { Dialog } from '../../common/';

import 'react-select/dist/react-select.min.css';

export default React.createClass({
  displayName: 'UserDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const addFormConstraints = {
      username: {
        presence: true
      },
      password: {
        presence: true
      }
    };
    const editFormConstraints = {
      username: {
        presence: true
      }
    };

    return this.hasEditMode() ? editFormConstraints : addFormConstraints;
  },

  getSelectValueSource() {
    const { newUserGroups, groups, secondInstance } = this.state;

    if (newUserGroups) {
      return this.linkState('newUserGroups');
    } else if (groups) {
      return this.linkState('groups');
    } else if (secondInstance && secondInstance.value) {
      return secondInstance;
    }

    return null;
  },

  handleAddSubmit() {
    const { newUserGroups, secondInstance, username, password } = this.state;

    const userGroups = newUserGroups || secondInstance;

    UsersActions.createUser(
      {
        username,
        password
      },
      {
        newGroups: userGroups
      }
    );
  },

  handleEditSubmit() {
    const { username, password, id, groups } = this.state;

    const userGroups = this.getSelectValueSource().value;
    const credentials = { username };

    if (password) {
      credentials.password = password;
    }

    UsersActions.updateUser(
      id,
      credentials,
      {
        newGroups: userGroups,
        groups
      }
    );
  },

  handleSelectFieldChange(newValue, selectedGroups) {
    this.setState({
      newUserGroups: selectedGroups
    });
  },

  render() {
    const { open, isLoading, canSubmit } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const selectValueSource = this.getSelectValueSource();
    let selectValue = '';
    const allGroups = GroupsStore.getGroups().map((group) => {
      group.value = group.id.toString();
      return group;
    });

    if (selectValueSource && _.isArray(selectValueSource.value)) {
      selectValue = selectValueSource.value.map((value) => value.id).join(',');
    } else if (selectValueSource && selectValueSource.value) {
      selectValue = selectValueSource.value;
    }

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title={`${title} a User`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            data-e2e-submit="user-dialog-confirm-button"
            data-e2e-cancel="user-dialog-cancel-button"
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              This dialog allows for user management. Username and passoword are
              credentials of your user. Users can be assigned to Groups for additonal
              access control.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/user-management">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref="username"
            name="username"
            autoFocus={true}
            fullWidth={true}
            value={this.state.username}
            onChange={(event, value) => this.setState({ username: value })}
            errorText={this.getValidationMessages('username').join(' ')}
            hintText="User's name"
            floatingLabelText="Username"
          />
          <TextField
            ref="password"
            type="password"
            name="password"
            fullWidth={true}
            value={this.state.password}
            onChange={(event, value) => this.setState({ password: value })}
            errorText={this.getValidationMessages('password').join(' ')}
            hintText="User's password"
            floatingLabelText="Password"
            className="vm-4-b"
          />
          <Select
            name="group"
            multi={true}
            value={selectValue}
            placeholder="User groups"
            options={allGroups}
            onChange={this.handleSelectFieldChange}
          />
        </div>
      </Dialog.FullPage>
    );
  }
});
