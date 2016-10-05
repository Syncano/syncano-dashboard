import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';
import ScriptDialogMixin from '../Scripts/ScriptDialogMixin';

// Stores and Actions
import Actions from './TriggersActions';
import Store from './TriggerDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import RuntimeStore from '../Runtimes/RuntimesStore';
import ClassesActions from '../Classes/ClassesActions';

// Components
import { TextField, FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Stepper, SelectFieldWrapper, Color, AutoCompleteWrapper } from '../../common/';

import TriggerDialogSidebar from './TriggerDialogSidebar';
import TriggerSummaryDialog from './TriggerSummaryDialog';

import ScriptDialogSidebar from './../Scripts/ScriptDialogSidebar';
import ScriptDialogContent from './../Scripts/ScriptDialogContent';

import { getSampleScript } from '../Scripts/SampleScripts';

export default React.createClass({
  displayName: 'TriggerDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin,
    ScriptDialogMixin
  ],

  validatorConstraints() {
    const { script, scriptData, classes } = this.state;
    const findSelectedClass = _.find(classes, { text: this.state.class });
    const validateObj = {
      label: {
        presence: true
      },
      signal: {
        presence: true
      },
      class: {
        presence: true
      }
    };

    if (!(script || scriptData.label)) {
      validateObj.script = { presence: true };
    }

    if (!findSelectedClass) {
      validateObj.class.inclusion = { message: `^Object with name ${this.state.class} does not exist` };
    }

    return validateObj;
  },

  getActionButtonsConfig() {
    const { stepIndex } = this.state;
    const submitText = this.hasEditMode() ? 'Confirm changes' : 'Create a Trigger';
    const steps = {
      step0: {
        submitLabel: this.getCurrentScript() ? submitText : 'Go to Script creation',
        cancelLabel: 'Cancel',
        handleCancel: this.handleCancel
      },
      step1: {
        submitLabel: 'Create a Trigger',
        cancelLabel: 'Back',
        handleCancel: () => {
          Actions.changeStep(0);
        }
      }
    };

    return steps[`step${stepIndex}`];
  },

  getCurrentScript() {
    const { script } = this.state;

    return ScriptsStore.getScriptById(script);
  },

  getTriggerParams() {
    const { label, script, signal } = this.state;
    const params = {
      class: this.state.class,
      label,
      script: _.isNumber(script) ? script : this.getScriptData(),
      signal
    };

    return params;
  },

  getScriptIcon(script) {
    const runtime = RuntimeStore.getRuntimeByKey(script.runtime_name) || {};

    return (
      <FontIcon
        style={{ top: -8 }}
        className={`synicon-${runtime.icon}`}
        color={runtime.color}
      />
    );
  },

  getClassIcon(metadata) {
    return metadata && (
      <FontIcon
        style={{ top: -8 }}
        className={`synicon-${metadata.icon}`}
        color={Color.getColorByName(metadata.color)}
      />
    );
  },

  getScriptData() {
    const { scriptData } = this.state;

    return getSampleScript(scriptData.label) ? getSampleScript(scriptData.label) : scriptData;
  },

  handleDialogShow() {
    console.info('TriggerDialog::handleDialogShow');
    ScriptsActions.fetch();
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    const { script } = this.state;
    const action = _.isNumber(script) ? 'createTrigger' : 'createTriggerWithScript';
    const params = this.getTriggerParams();

    this.handleFinish(() => Actions[action](params));
  },

  handleEditSubmit() {
    const { id, script } = this.state;

    const action = _.isNumber(script) ? 'updateTrigger' : 'updateTriggerWithScript';
    const params = this.getTriggerParams();

    this.handleFinish(() => Actions[action](id, params));
  },

  handleFinish(finishAction) {
    const { stepIndex } = this.state;

    const nextStep = {
      step0: this.getCurrentScript() ? finishAction : () => Actions.changeStep(1),
      step1: finishAction
    }[`step${stepIndex}`];

    nextStep();
  },

  handleChangeFields(key, value) {
    const keyMap = {
      class: _.isObject(value) && value.payload ? value.payload : value,
      script: _.isObject(value) && value.payload ? value.payload : value
    };

    this.setState({ [key]: keyMap[key] });
  },

  renderSidebarContent(stepIndex) {
    const sidebarContentMap = {
      step0: <TriggerDialogSidebar />,
      step1: <ScriptDialogSidebar />,
      step2: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderStepContent() {
    const { createdTrigger, stepIndex, signal, scripts, classes, errors, scriptData } = this.state;
    const handleNewScriptRequest = ({ item }) => {
      const newScriptData = {
        label: item.text,
        id: item.payload
      };
      const sampleScriptData = getSampleScript(item.text);

      this.setState({
        script: item.payload,
        scriptData: _.merge(scriptData, sampleScriptData || newScriptData)
      });
    };
    const handleUpdateScriptAutoComplete = (scriptLabel) => {
      const script = ScriptsStore.getScriptByName(scriptLabel);
      const newScript = {
        label: scriptLabel,
        description: '',
        source: '',
        config: {},
        runtime_name: ''
      };

      this.setState({
        script: null,
        scriptData: _.merge(scriptData, script || newScript)
      });
    };
    const currentScript = this.getCurrentScript();
    const autoCompleteScriptSearchText = currentScript ? currentScript.label : scriptData.label;

    const content = {
      step0: (
        <div>
          <TextField
            ref="label"
            name="label"
            autoFocus={true}
            fullWidth={true}
            value={this.state.label}
            onChange={(event, value) => this.setState({ label: value })}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Trigger's label"
            floatingLabelText="Label"
          />
          <SelectFieldWrapper
            name="signal"
            options={Store.getSignalsDropdown()}
            value={signal}
            onChange={(event, index, value) => this.setSelectFieldValue('signal', value)}
            errorText={this.getValidationMessages('signal').join(' ')}
          />
          <AutoCompleteWrapper
            name="class"
            data-e2e="class-name"
            hintText="Start typing to see matching Data Classes list"
            items={{ userData: classes }}
            searchText={this.state.class}
            onNewRequest={(value) => this.handleChangeFields('class', value.item)}
            onUpdateInput={(value) => this.handleChangeFields('class', value)}
            errorText={this.getValidationMessages('class').join(' ')}
          />
          <AutoCompleteWrapper
            name="script"
            hintText="Start typing to see matching scripts list or type a new script label"
            items={{ userData: scripts.userScripts, sampleData: scripts.sampleScripts }}
            searchText={autoCompleteScriptSearchText}
            onNewRequest={handleNewScriptRequest}
            onUpdateInput={handleUpdateScriptAutoComplete}
            errorText={this.getValidationMessages('script').join(' ')}
            data-e2e="trigger-modal-script"
          />
        </div>
      ),
      step1: (
        <div>
          <ScriptDialogContent
            {...scriptData}
            errors={errors}
            handleChangeTextField={this.handleChangeTextField}
            handleChangeAutoComplete={this.handleChangeAutoComplete}
          />
        </div>
      ),
      step2: (
        <TriggerSummaryDialog trigger={createdTrigger} />
      )
    }[`step${stepIndex}`];

    return content;
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const stepTitle = {
      step0: this.hasEditMode() ? 'Edit a Trigger Socket' : 'Add a Trigger Socket',
      step1: 'Create a Script',
      step2: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, padding: '4px 8px 0 8px' }}
            color={Colors.amber300}
            className="synicon-socket-trigger"
          />
          <div>
            {`You've just ${actionText} a Trigger!`}
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
      <div data-e2e={isFinished ? 'trigger-dialog-summary-title' : 'trigger-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Trigger</span>
          <span>Create a Script (optional)</span>
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
    const buttonsConfig = this.getActionButtonsConfig();

    if (isFinished) {
      return (
        <RaisedButton
          data-e2e="trigger-summary-dialog-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="trigger-dialog-confirm-button"
        disabled={!canSubmit}
        submitLabel={buttonsConfig.submitLabel}
        cancelLabel={buttonsConfig.cancelLabel}
        handleCancel={buttonsConfig.handleCancel}
        handleConfirm={this.handleFormValidation}
      />
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
        {this.renderFormNotifications()}
        {this.renderStepContent()}
      </Dialog.FullPage>
    );
  }
});
