import React from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../mixins';

import Store from './ChannelDialogStore';
import Actions from './ChannelsActions';
import ChannelsStore from './ChannelsStore';

import { FontIcon, RaisedButton, TextField, Toggle } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Loading, SelectFieldWrapper, Stepper } from '../../common/';
import { GroupsDropdown } from '../Groups/';
import ChannelSummary from './ChannelSummary';

const ChannelDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    type: {
      presence: true
    }
  },

  getParams() {
    const { name, description, type, group, custom_publish, other_permissions, group_permissions } = this.state;

    return {
      name,
      description,
      type,
      group: group !== 'none' ? group : null,
      custom_publish,
      other_permissions,
      group_permissions
    };
  },

  handleAddSubmit() {
    const params = this.getParams();

    Actions.createChannel(params);
  },

  handleEditSubmit() {
    const params = this.getParams();

    Actions.updateChannel(params.name, params);
  },

  handleToogle(event, status) {
    const state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  handleChangeName(event, value) {
    this.setSelectFieldValue('name', value);
  },

  handleChangeType(event, index, value) {
    this.setSelectFieldValue('type', value);
  },

  handleChangeDescription(event, value) {
    this.setSelectFieldValue('description', value);
  },

  handleChangeGroup(event, index, value) {
    this.setSelectFieldValue('group', value);
  },

  handleChangeGroupPermission(event, index, value) {
    this.setSelectFieldValue('group_permissions', value);
  },

  handleChangeOtherPermission(event, index, value) {
    this.setSelectFieldValue('other_permissions', value);
  },

  renderStepContent(stepIndex) {
    const {
      group,
      name,
      description,
      type,
      isLoading,
      group_permissions,
      other_permissions,
      custom_publish,
      createdChannel
    } = this.state;
    const stepsMap = {
      step0: (
        <div>
          <Dialog.ContentSection>
            <div className="col-md-20">
              <TextField
                ref="name"
                autoFocus={true}
                value={name}
                onChange={this.handleChangeName}
                errorText={this.getValidationMessages('name').join(' ')}
                name="name"
                disabled={this.hasEditMode()}
                fullWidth={true}
                hintText="Channel's name"
                floatingLabelText="Name"
              />
            </div>
            <div className="col-flex-1">
              <SelectFieldWrapper
                name="type"
                floatingLabelText="Channel type"
                options={ChannelsStore.getChannelTypesDropdown()}
                disabled={this.hasEditMode()}
                value={type}
                onChange={this.handleChangeType}
                errorText={this.getValidationMessages('type').join(' ')}
              />
            </div>
            <div className="col-flex-0">
              <TextField
                ref="description"
                name="description"
                value={description}
                onChange={this.handleChangeDescription}
                errorText={this.getValidationMessages('description').join(' ')}
                fullWidth={true}
                multiLine={true}
                maxRows={2}
                floatingLabelText="Description (optional)"
                hintText="Channel Socket's description"
              />
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection title="Permissions">
            <div className="col-flex-1">
              <GroupsDropdown
                value={group}
                onChange={this.handleChangeGroup}
                errorText={this.getValidationMessages('group').join(' ')}
              />
            </div>
            <div className="col-flex-1">
              <SelectFieldWrapper
                name="group_permissions"
                floatingLabelText="Group permissions"
                options={ChannelsStore.getChannelPermissionsDropdown()}
                value={group_permissions}
                onChange={this.handleChangeGroupPermission}
                errorText={this.getValidationMessages('group_permissions').join(' ')}
              />
            </div>
            <div className="col-flex-1">
              <SelectFieldWrapper
                name="other_permissions"
                floatingLabelText="Other permissions"
                options={ChannelsStore.getChannelPermissionsDropdown()}
                value={other_permissions}
                onChange={this.handleChangeOtherPermission}
                errorText={this.getValidationMessages('other_permissions').join(' ')}
              />
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection last="true">
            <div
              className="col-flex-1"
              style={{ maxWidth: 320 }}
            >
              <Toggle
                data-e2e="channel-dialog-custom-publish-toggle"
                ref="custom_publish"
                name="custom_publish"
                defaultToggled={custom_publish}
                onToggle={this.handleToogle}
                label="Custom publishing in this Channel?"
                labelStyle={{ fontSize: 15 }}
              />
            </div>
          </Dialog.ContentSection>
        </div>
      ),
      step1: (
        <Loading show={isLoading || !createdChannel}>
          <ChannelSummary
            hasEditMode={this.hasEditMode()}
            item={createdChannel}
          />
        </Loading>
      )
    };

    return stepsMap[`step${stepIndex}`];
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const stepTitleMap = {
      step0: this.hasEditMode() ? 'Edit a Real-time Channel Socket' : 'Add a Real-time Channel Socket',
      step1: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, paddingTop: 4, paddingRight: 8 }}
            color={Colors.blue500}
            className="synicon-socket-channel"
          />
          <div>
            {`You've just ${actionText} a Channel!`}
          </div>
        </div>
      )
    };

    return stepTitleMap[`step${stepIndex}`];
  },

  renderActionButtons() {
    const { stepIndex, canSubmit } = this.state;
    const isLastStep = stepIndex === 1;

    if (isLastStep) {
      return (
        <RaisedButton
          data-e2e="channel-summary-dialog-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="channel-dialog-confirm-button"
        data-e2e-cancel="channel-dialog-cancel-button"
        submitLabel={this.hasEditMode() ? 'Confirm changes' : 'Create a Channel'}
        handleCancel={this.handleCancel}
        handleConfirm={this.handleFormValidation}
        disabled={!canSubmit}
      />
    );
  },

  renderSidebarContent(stepIndex) {
    const sidebarContentMap = {
      step0: (
        <Dialog.SidebarBox>
          <Dialog.SidebarSection>
            Real-time Channels are a way of providing realtime communication functionality in Syncano. Users can
            subscribe to Channels in order to get notifications about changes that happen to Data Objects connected
            to those Channels.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection title="Channel type">
            It allows your Users to be able to send custom messages on a Channel. This functionality might come in
            handy when you’d like to create e.g. a chat application.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection title="Custom publishing">
            It allows your Users to be able to send custom messages on a Channel.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection last={true}>
            <Dialog.SidebarLink to="http://docs.syncano.io/docs/realtime-communication">
              Learn more
            </Dialog.SidebarLink>
          </Dialog.SidebarSection>
        </Dialog.SidebarBox>
      ),
      step1: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderDialogTitle() {
    const { stepIndex, isFinished } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div data-e2e={isFinished ? 'channel-dialog-summary-title' : 'channel-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Real-time Channel Socket</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle(stepIndex)}
        </div>
      </div>
    );
  },

  render() {
    const { isLoading, open, stepIndex } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={this.renderDialogTitle()}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={this.renderActionButtons()}
        sidebar={this.renderSidebarContent(stepIndex)}
      >
        {this.renderFormNotifications()}
        {this.renderStepContent(stepIndex)}
      </Dialog.FullPage>
    );
  }
});

export default ChannelDialog;
