import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './GroupsActions';
import Store from './GroupDialogStore';

// Components
import { TextField, FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Stepper } from '../../common/';
import GroupSummary from './GroupSummary';

export default React.createClass({
  displayName: 'GroupDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true
    }
  },

  handleAddSubmit() {
    Actions.createGroup(this.state.label);
  },

  handleEditSubmit() {
    const { id, label } = this.state;

    Actions.updateGroup(id, label);
  },

  renderSidebarContent() {
    return (
      <Dialog.SidebarBox>
        <Dialog.SidebarSection>
          Groups are a way of categorizing users. They can be used to construct
          different levels of access to resources stored on the platform.
        </Dialog.SidebarSection>
        <Dialog.SidebarSection last={true}>
          <Dialog.SidebarLink to="http://docs.syncano.io/docs/groups">
            Learn more
          </Dialog.SidebarLink>
        </Dialog.SidebarSection>
      </Dialog.SidebarBox>
    );
  },

  renderStepContent() {
    const { createdGroup, stepIndex } = this.state;
    const content = {
      step0: (
        <TextField
          ref="label"
          label="label"
          data-e2e="group-dialog-input-group-name"
          autoFocus={true}
          fullWidth={true}
          value={this.state.label}
          onChange={(event, value) => this.setState({ label: value })}
          errorText={this.getValidationMessages('label').join(' ')}
          hintText="Group's name"
          floatingLabelText="Name"
        />
      ),
      step1: (
        <GroupSummary group={createdGroup} />
      )
    }[`step${stepIndex}`];

    return content;
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const stepTitle = {
      step0: this.hasEditMode() ? 'Edit a Group' : 'Add a Group',
      step1: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, padding: '4px 8px 0 8px' }}
            color={Colors.blue400}
            className="synicon-account-multiple"
          />
          <div>
            {`You've just ${actionText} a Group!`}
          </div>
        </div>
      )
    }[`step${stepIndex}`];

    return stepTitle;
  },

  renderDialogTitle() {
    const { stepIndex, isFinished } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div data-e2e={isFinished ? 'group-dialog-summary-title' : 'group-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Group</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle(stepIndex)}
        </div>
      </div>
    );
  },

  renderActionButtons() {
    const { canSubmit, isFinished } = this.state;

    if (isFinished) {
      return (
        <RaisedButton
          data-e2e="group-summary-dialog-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="group-dialog-confirm-button"
        disabled={!canSubmit}
        handleCancel={this.handleCancel}
        handleConfirm={this.handleFormValidation}
      />
    );
  },

  render() {
    const { isLoading, open, isFinished } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title={this.renderDialogTitle()}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={this.renderActionButtons()}
        sidebar={!isFinished && this.renderSidebarContent()}
      >
        {this.renderFormNotifications()}
        {this.renderStepContent()}
      </Dialog.FullPage>
    );
  }
});
