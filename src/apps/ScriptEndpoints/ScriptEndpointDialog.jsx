import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';
import ScriptDialogMixin from '../Scripts/ScriptDialogMixin';

// Stores and Actions
import Actions from './ScriptEndpointsActions';
import DialogStore from './ScriptEndpointDialogStore';
import ScriptsStore from '../Scripts/ScriptsStore';
import ScriptsActions from '../Scripts/ScriptsActions';

// Components
import { TextField, Toggle, FontIcon, RaisedButton } from 'material-ui';
import { Dialog, Loading, Stepper, AutoCompleteWrapper } from '../../common/';
import { colors as Colors } from 'material-ui/styles';

import ScriptEndpointSummary from './ScriptEndpointSummary';
import ScriptEndpointDialogSidebar from './ScriptEndpointDialogSidebar';

import ScriptDialogSidebar from './../Scripts/ScriptDialogSidebar';
import ScriptDialogContent from './../Scripts/ScriptDialogContent';

import { getSampleScript } from '../Scripts/SampleScripts';

export default React.createClass({
  displayName: 'ScriptEndpointDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin,
    ScriptDialogMixin
  ],

  validatorConstraints() {
    const { name, script, scriptData } = this.state;
    const isFirstCharNumber = /^[0-9]/.test(name);

    const validateObj = {
      name: {
        presence: true,
        length: {
          minimum: 5
        }
      }
    };

    if (!(script || scriptData.label)) {
      validateObj.script = {
        presence: {
          message: "^Script can't be blank"
        }
      };
    }

    if (name.length >= 5 && isFirstCharNumber) {
      validateObj.name.inclusion = { message: '^Name has to start with a letter' };
    }

    return validateObj;
  },

  getScriptEndpointParams() {
    const { name, script, description } = this.state;
    const params = {
      public: this.state.public,
      name,
      script: _.isNumber(script) ? script : this.handleNewScript(),
      description
    };

    return params;
  },

  getCurrentScript() {
    const { script } = this.state;

    return ScriptsStore.getScriptById(script);
  },

  getActionButtonsConfig() {
    const { stepIndex } = this.state;
    const submitText = this.hasEditMode() ? 'Confirm changes' : 'Create a Script Endpoint';

    return {
      step0: {
        submitLabel: this.actualScript() ? submitText : 'Go to Script creation',
        cancelLabel: 'Cancel',
        handleCancel: this.handleCancel
      },
      step1: {
        submitLabel: 'Create a Script Endpoint',
        cancelLabel: 'Back',
        handleCancel: () => {
          Actions.changeStep(0);
        }
      }
    }[`step${stepIndex}`];
  },

  handleNewScript() {
    const { scriptData } = this.state;

    return getSampleScript(scriptData.label) ? getSampleScript(scriptData.label) : scriptData;
  },

  handleDialogShow() {
    console.info('ScriptEndpointDialog::handleDialogShow');
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    const { script } = this.state;
    const action = _.isNumber(script) ? 'createScriptEndpoint' : 'createScriptEndpointWithScript';
    const params = this.getScriptEndpointParams();

    this.handleFinish(() => Actions[action](params));
  },

  handleEditSubmit() {
    const { name, script } = this.state;
    const action = _.isNumber(script) ? 'updateScriptEndpoint' : 'updateScriptEndpointWithScript';
    const params = this.getScriptEndpointParams();

    this.handleFinish(() => Actions[action](name, params));
  },

  handleFinish(finishAction) {
    const { stepIndex } = this.state;

    const nextStep = {
      step0: this.actualScript() ? finishAction : () => Actions.changeStep(1),
      step1: finishAction
    }[`step${stepIndex}`];

    nextStep();
  },

  handleToogle(event, status) {
    const state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  actualScript() {
    return ScriptsStore.getScriptById(this.state.script);
  },

  renderStepContent(stepIndex) {
    const {
      isLoading,
      name,
      description,
      createdScriptEndpoint,
      scriptData,
      errors,
      scripts
    } = this.state;

    const handleNewRequest = (value) => {
      const newScriptData = {
        label: value.item.text,
        id: value.item.payload
      };
      const sampleScriptData = getSampleScript(value.item.text);

      this.setState({
        script: value.item.payload,
        scriptData: _.merge(scriptData, sampleScriptData || newScriptData)
      });
    };
    const handleUpdateAutoComplete = (scriptLabel) => {
      this.setState({
        script: null,
        scriptData: _.merge(scriptData, { label: scriptLabel, source: '', config: {}, runtime_name: '' })
      });
    };

    const currentScript = this.actualScript();
    const autoCompleteSearchText = currentScript ? currentScript.label : scriptData.label;

    const stepsMap = {
      step0: (
        <div>
          <Dialog.ContentSection>
            <TextField
              ref="name"
              name="name"
              data-e2e="script-endpoint-name"
              autoFocus={true}
              fullWidth={true}
              disabled={this.hasEditMode()}
              value={name}
              onChange={(event, value) => this.setState({ name: value })}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Script Endpoint's name"
              floatingLabelText="Name"
            />
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              value={description}
              onChange={(event, value) => this.setState({ description: value })}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Script Endpoint's description"
              floatingLabelText="Description (optional)"
            />
            <AutoCompleteWrapper
              name="script"
              data-e2e="script-name"
              hintText="Start typing to see matching scripts list or type a new script label"
              items={{ userData: scripts.items, sampleData: scripts.sampleScripts }}
              searchText={autoCompleteSearchText}
              onNewRequest={handleNewRequest}
              onUpdateInput={handleUpdateAutoComplete}
              errorText={this.getValidationMessages('script').join(' ')}
            />
            <Toggle
              ref="public"
              name="public"
              onToggle={this.handleToogle}
              style={{ marginTop: 20 }}
              defaultToggled={this.state.public}
              label="Make this Script Endpoint public?"
            />
          </Dialog.ContentSection>
        </div>
      ),
      step1: (
        <div>
          <ScriptDialogContent
            {...scriptData}
            errors={errors}
            ref="scriptDialogContent"
            handleChangeTextField={this.handleChangeTextField}
            handleChangeAutoComplete={this.handleChangeAutoComplete}
          />
        </div>
      ),
      step2: (
        <Loading show={isLoading || !createdScriptEndpoint}>
          <ScriptEndpointSummary
            hasEditMode={this.hasEditMode()}
            item={createdScriptEndpoint}
          />
        </Loading>
      )
    };

    return stepsMap[`step${stepIndex}`];
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const stepTitleMap = {
      step0: this.hasEditMode() ? 'Edit a Script Endpoint Socket' : 'Add a Script Endpoint Socket',
      step1: 'Create a Script',
      step2: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, paddingTop: 4, paddingRight: 8 }}
            color={Colors.blue500}
            className="synicon-socket-script-endpoint"
          />
          <div>
            {`You've just ${actionText} a Script Endpoint!`}
          </div>
        </div>
      )
    };

    return stepTitleMap[`step${stepIndex}`];
  },

  renderActionButtons() {
    const { canSubmit, isFinished } = this.state;

    if (isFinished) {
      return (
        <RaisedButton
          data-e2e="script-endpoint-summary-dialog-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="script-dialog-confirm-button"
        data-e2e-cancel="script-dialog-cancel-button"
        submitLabel={this.getActionButtonsConfig().submitLabel}
        cancelLabel={this.getActionButtonsConfig().cancelLabel}
        handleCancel={this.getActionButtonsConfig().handleCancel}
        handleConfirm={this.handleFormValidation}
        disabled={!canSubmit}
      />
    );
  },

  renderSidebarContent(stepIndex) {
    const sidebarContentMap = {
      step0: <ScriptEndpointDialogSidebar />,
      step1: <ScriptDialogSidebar />,
      step2: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderDialogTitle() {
    const { stepIndex, isFinished } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div data-e2e={isFinished ? 'script-dialog-summary-titled' : 'script-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Script Endpoint Socket</span>
          <span>Create a Script (optional)</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle(stepIndex)}
        </div>
      </div>
    );
  },

  render() {
    const { open, isLoading, stepIndex } = this.state;

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
