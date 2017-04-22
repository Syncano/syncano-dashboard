import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { DialogMixin, DialogsMixin, FormMixin } from '../../mixins';

import DialogStore from './SocketsDialogStore';
import Actions from './SocketsActions';
import CustomSocketsActions from '../CustomSockets/CustomSocketsActions';

import { FontIcon, TextField, RaisedButton } from 'material-ui';
import { AutoCompleteWrapper, Dialog, Loading, Stepper } from '../../common/';
import { colors as Colors } from 'material-ui/styles';

import SocketsDialogSidebar from './SocketsDialogSidebar';
import SocketsSummary from './SocketsSummary';

const SocketsDialog = React.createClass({
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
      this.setState({
        initialName: nextState.name,
        _dialogMode: nextState.installMode ? 'add' : 'edit'
      });
    }
  },

  handleAddSubmit() {
    const { instanceName, name, description, twitterApiKey } = this.state;
    const { url } = this.props;
    const params = { instanceName, description, twitterApiKey };

    this.handleFinish(() => Actions.installSocket(params, name, url));
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
      createdSocket,
      description,
      instanceName,
      isLoading,
      name,
      twitterApiKey,
      userInstances
    } = this.state;

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
              floatingLabelText="Socket name"
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
        <Loading show={isLoading || !createdSocket}>
          <SocketsSummary
            item={createdSocket}
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
    const stepTitleMap = {
      step0: `Install a ${initialName}`,
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
        <Dialog.StandardButtons
          submitLabel={`Install ${initialName}`}
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
    const { metadata } = this.state;
    const sidebarContentMap = {
      step0: ([
        <SocketsDialogSidebar
          metadata={metadata}
          handleColorChange={this.handleColorChange}
          handleIconChange={this.handleIconChange}
        />
      ]),
      step1: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderDialogTitle() {
    const { initialName, stepIndex, isFinished } = this.state;
    const dataE2e = isFinished ? 'sockets-registry-dialog-summary-title' : 'sockets-registry-dialog-title';

    return (
      <div data-e2e={dataE2e}>
        <Stepper activeStep={stepIndex}>
          <span>Install a {initialName} Socket</span>
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

export default withRouter(SocketsDialog);
