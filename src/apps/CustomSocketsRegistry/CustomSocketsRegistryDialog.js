import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { DialogMixin, DialogsMixin, FormMixin } from '../../mixins';

import DialogStore from './CustomSocketsRegistryDialogStore';
import Actions from './CustomSocketsRegistryActions';
import CustomSocketsActions from '../CustomSockets/CustomSocketsActions';

import { FontIcon, FlatButton, TextField, RaisedButton } from 'material-ui';
import { AutoCompleteWrapper, ColorIconPicker, Dialog, Loading, Stepper } from '../../common/';
import { colors as Colors } from 'material-ui/styles';

import CustomSocketsRegistryDialogSidebar from './CustomSocketsRegistryDialogSidebar';
import CustomSocketsRegistrySummary from './CustomSocketsRegistrySummary';

const CustomSocketsRegistryDialog = React.createClass({
  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    instanceName: {
      presence: true,
      length: {
        minimum: 5
      }
    },
    name: {
      presence: true
    }
  },

  getDefaultProps() {
    return {
      shouldRedirect: false,
      url: 'https://raw.githubusercontent.com/Syncano/custom-socket-hello-world/master/socket.yml'
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      DialogStore.getInstancesDropdown();
    }
  },

  handleAddSubmit() {
    const { instanceName, name, description, twitterApiKey } = this.state;
    const { url } = this.props;
    const params = { instanceName, description, twitterApiKey };

    this.handleFinish(() => Actions.installCustomSocketRegistry(params, name, url));
  },

  handleEditSubmit() {
    const { description, instanceName, initialName, name, metadata, twitterApiKey } = this.state;
    const params = { description, name, instanceName, metadata, twitterApiKey };

    this.handleFinish(() => CustomSocketsActions.updateCustomSocket(initialName, params));
  },

  handleFinish(finishAction) {
    const { stepIndex } = this.state;

    const nextStep = {
      step0: finishAction
    }[`step${stepIndex}`];

    nextStep();
  },

  handleInstanceNameNewRequest(value) {
    this.setState({ instanceName: value.text });
  },

  handleInstanceNameChange(value) {
    this.setState({ instanceName: value });
  },

  handleNameChange(event, value) {
    this.setState({ name: value });
  },

  handleDecsriptionChange(event, value) {
    this.setState({ description: value });
  },

  handleTwitterApiKeyChange(event, value) {
    this.setState({ twitterApiKey: value });
  },

  handleColorChange(color) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { color }) });
  },

  handleIconChange(icon) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { icon }) });
  },

  handleDeleteCustomSocket() {
    this.refs.removeCustomSocketsDialog.show();
  },

  handleCloseSummary() {
    const { shouldRedirect } = this.props;

    if (shouldRedirect) {
      this.redirectToCreatedSocket();
    }

    this.handleCancel();
  },

  redirectToCreatedSocket() {
    const { router } = this.props;
    const { instanceName, name } = this.state;
    const redirectUrl = `/instances/${instanceName}/custom-sockets/${name}/`;

    router.push(redirectUrl);
  },

  initDialogs() {
    const { isLoading } = this.props;
    const { name } = this.state;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeCustomSocketsDialog',
        ref: 'removeCustomSocketsDialog',
        title: `Delete ${name}`,
        handleConfirm: CustomSocketsActions.removeCustomSockets,
        items: [this.state],
        withConfirm: true,
        groupName: name,
        isLoading
      }
    }];
  },

  renderStepContent(stepIndex) {
    const {
      createdCustomSocketRegistry,
      description,
      instanceName,
      isLoading,
      name,
      twitterApiKey,
      userInstances
    } = this.state;
    const isEditMode = this.hasEditMode();

    const stepsMap = {
      step0: (
        <div>
          {DialogsMixin.getDialogs(this.initDialogs())}
          <Dialog.ContentSection>
            <AutoCompleteWrapper
              name="instanceName"
              items={{ userData: userInstances }}
              searchText={instanceName}
              onNewRequest={this.handleInstanceNameNewRequest}
              onUpdateInput={this.handleInstanceNameChange}
              disabled={isEditMode}
              errorText={this.getValidationMessages('instanceName').join(' ')}
              showDividers={false}
              data-e2e="custom-socket-instance-name"
            />
            <TextField
              name="name"
              fullWidth={true}
              value={name}
              onChange={this.handleNameChange}
              errorText={this.getValidationMessages('name').join(' ')}
              floatingLabelText="Custom Socket name"
              data-e2e="custom-socket-name"
            />
            <TextField
              name="description"
              fullWidth={true}
              value={description}
              onChange={this.handleDecsriptionChange}
              errorText={this.getValidationMessages('description').join(' ')}
              floatingLabelText="Description (optional)"
              data-e2e="custom-socket-description"
            />
          </Dialog.ContentSection>
          <Dialog.ContentSection title="Configuration" >
            <TextField
              name="twitterApiKey"
              fullWidth={true}
              value={twitterApiKey}
              onChange={this.handleTwitterApiKeyChange}
              errorText={this.getValidationMessages('twitterApiKey').join(' ')}
              floatingLabelText="Twitter API Key"
              data-e2e="custom-socket-twitter-api-key"
            />
          </Dialog.ContentSection>
        </div>
      ),
      step1: (
        <Loading show={isLoading || !createdCustomSocketRegistry}>
          <CustomSocketsRegistrySummary
            hasEditMode={this.hasEditMode()}
            item={createdCustomSocketRegistry}
          />
        </Loading>
      )
    };

    return stepsMap[`step${stepIndex}`];
  },

  renderStepTitle(stepIndex) {
    const { createdCustomSocketRegistry, initialName, name } = this.state;
    const metadata = createdCustomSocketRegistry && createdCustomSocketRegistry.metadata;
    const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
    const title = this.hasEditMode() ? 'Edit' : 'Install';
    const stepTitleMap = {
      step0: `${title} a ${initialName}`,
      step1: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, paddingTop: 4, paddingRight: 8 }}
            color={Colors.purple400}
            className={`synicon-${metaIcon}`}
          />
          <div>
            {`You've installed ${name} Socket!`}
          </div>
        </div>
      )
    };

    return stepTitleMap[`step${stepIndex}`];
  },

  renderActionButtons() {
    const { canSubmit, initialName, isFinished } = this.state;
    const isEditMode = this.hasEditMode();
    const submitText = isEditMode ? 'Confirm changes' : `Install ${initialName}`;
    const name = this.state.name.toUpperCase();

    if (isFinished) {
      return (
        <RaisedButton
          label="Close"
          primary={true}
          onTouchTap={this.handleCloseSummary}
          data-e2e="sockets-registry-summary-dialog-close-button"
        />
      );
    }

    return (
      <div>
        {isEditMode &&
          <FlatButton
            style={{ float: 'left' }}
            labelStyle={{ color: Colors.red400 }}
            label={`DELETE ${name}`}
            onTouchTap={this.handleDeleteCustomSocket}
          />
        }
        <Dialog.StandardButtons
          submitLabel={submitText}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleFormValidation}
          disabled={!canSubmit}
          data-e2e-submit="sockets-registry-dialog-confirm-button"
          data-e2e-cancel="sockets-registry-dialog-cancel-button"
        />
      </div>
    );
  },

  renderSidebarContent(stepIndex) {
    const { initialName, metadata } = this.state;
    const isEditMode = this.hasEditMode();
    const sidebarContentMap = {
      step0: ([
        <CustomSocketsRegistryDialogSidebar
          metadata={metadata}
          handleColorChange={this.handleColorChange}
          handleIconChange={this.handleIconChange}
          isEditMode={isEditMode}
        />
      ]),
      step1: null
    };

    if (stepIndex === 0 && isEditMode) {
      sidebarContentMap[`step${stepIndex}`].push(
        <ColorIconPicker
          key="coloriconpicker"
          previewStyle="hexagon"
          icon={metadata.icon || 'cloud'}
          color={metadata.color || 'red'}
          onIconChange={this.handleIconChange}
          onColorChange={this.handleColorChange}
          title={`${initialName} icon`}
        />
      );
    }

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderDialogTitle() {
    const { initialName, stepIndex, isFinished } = this.state;
    const dataE2e = isFinished ? 'sockets-registry-dialog-summary-title' : 'sockets-registry-dialog-title';
    const title = this.hasEditMode() ? 'Edit' : 'Install';

    return (
      <div data-e2e={dataE2e}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a {initialName} Socket</span>
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
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
        {this.renderStepContent(stepIndex)}
      </Dialog.FullPage>
    );
  }
});

export default withRouter(CustomSocketsRegistryDialog);
