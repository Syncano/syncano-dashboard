import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import AdminsActions from './AdminsActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import Store from './AdminDialogStore';

// Components
import { TextField } from 'material-ui';
import { Dialog, SelectFieldWrapper, Show, Notification } from '../../common/';

export default React.createClass({
  displayName: 'AdminDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: {
        message: '^Invalid email address'
      }
    },
    role: {
      presence: true
    }
  },

  handleAddSubmit() {
    const { email, role } = this.state;

    AdminsInvitationsActions.createInvitation({ email, role });
  },

  handleEditSubmit() {
    const { id, role } = this.state;

    AdminsActions.updateAdmin(id, { role });
  },

  render() {
    const title = this.hasEditMode() ? 'Edit' : 'Invite';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an Administrator`}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        contentSize="medium"
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Inviting Syncano Adminstrators to your Instance will allow for
              team collaboration on a project.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/administrators">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        {this.renderFormNotifications()}
        <TextField
          ref="email"
          name="email"
          autoFocus={true}
          fullWidth={true}
          disabled={this.hasEditMode()}
          value={this.state.email}
          onChange={(event, value) => this.setState({ email: value })}
          errorText={this.getValidationMessages('email').join(' ')}
          hintText="Administrator's email"
          floatingLabelText="Email"
        />
        <SelectFieldWrapper
          fullWidth={true}
          name="role"
          className="invite--admin--dropdown"
          floatingLabelText="Administrator's role"
          options={Store.getRoles()}
          value={this.state.role}
          onChange={(event, index, value) => this.setSelectFieldValue('role', value)}
          errorText={this.getValidationMessages('role').join(' ')}
        />
        <Show if={this.getValidationMessages('detail').length}>
          <Notification type="error">
            {this.getValidationMessages('detail').join(' ')}
          </Notification>
        </Show>
      </Dialog.FullPage>
    );
  }
});
