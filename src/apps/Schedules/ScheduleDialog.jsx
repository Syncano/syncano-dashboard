import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment-timezone';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';
import ScriptDialogMixin from '../Scripts/ScriptDialogMixin';

// Stores and Actions
import Actions from './SchedulesActions';
import Store from './ScheduleDialogStore';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';

// Components
import { AutoComplete, TextField, RaisedButton, FontIcon } from 'material-ui';
import { Dialog, Loading, Stepper, AutoCompleteWrapper } from '../../common/';
import { colors as Colors } from 'material-ui/styles';

import ScheduleSummary from './ScheduleSummary';
import ScheduleDialogSidebar from './ScheduleDialogSidebar';

import ScriptDialogSidebar from './../Scripts/ScriptDialogSidebar';
import ScriptDialogContent from './../Scripts/ScriptDialogContent';

import { getSampleScript } from '../Scripts/SampleScripts';

export default React.createClass({
  displayName: 'ScheduleDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin,
    ScriptDialogMixin
  ],

  validatorConstraints() {
    const { script, scriptData } = this.state;

    const validateObj = {
      label: {
        presence: true
      }
    };

    if (!(script || scriptData.label)) {
      validateObj.script = {
        presence: {
          message: "^Script can't be blank"
        }
      };
    }

    return validateObj;
  },

  getStyles() {
    return {
      autoCompleteItem: {
        cursor: 'pointer'
      },
      orTag: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '-16px'
      },
      stepTitleIcon: {
        fontSize: 32,
        paddingTop: 4,
        paddingRight: 8
      }
    };
  },

  getActionButtonsConfig() {
    const { stepIndex } = this.state;
    const submitText = this.hasEditMode() ? 'Confirm changes' : 'Create a Schedule';

    return {
      step0: {
        submitLabel: this.actualScript() ? submitText : 'Go to Script creation',
        cancelLabel: 'Cancel',
        handleCancel: this.handleCancel
      },
      step1: {
        submitLabel: 'Create a Schedule',
        cancelLabel: 'Back',
        handleCancel: () => {
          Actions.changeStep(0);
        }
      }
    }[`step${stepIndex}`];
  },

  getScheduleParams() {
    const { label, crontab, script, interval_sec, timezone } = this.state;
    const params = {
      label,
      crontab,
      interval_sec,
      timezone,
      script: _.isNumber(script) ? script : this.handleNewScript()
    };

    return params;
  },

  handleNewScript() {
    const { scriptData } = this.state;

    return getSampleScript(scriptData.label) ? getSampleScript(scriptData.label) : scriptData;
  },

  handleDialogShow() {
    console.info('ScheduleDialog::handleDialogShow');
    ScriptsActions.fetch();
  },

  handleAddSubmit() {
    const { script } = this.state;
    const action = _.isNumber(script) ? 'createSchedule' : 'createScheduleWithScript';
    const params = this.getScheduleParams();

    this.setScheduleError() && this.handleFinish(() => Actions[action](params));
  },

  handleEditSubmit() {
    const { id, script } = this.state;

    const action = _.isNumber(script) ? 'updateSchedule' : 'updateScheduleWithScript';
    const params = this.getScheduleParams();

    this.setScheduleError() && this.handleFinish(() => Actions[action](id, params));
  },

  handleFinish(finishAction) {
    const { stepIndex } = this.state;

    const nextStep = {
      step0: this.actualScript() ? finishAction : () => Actions.changeStep(1),
      step1: finishAction
    }[`step${stepIndex}`];

    nextStep();
  },

  handleChangeFields(key, value) {
    const keyMap = {
      timezone: value.text ? value.text : value,
      crontab: value.text ? value.text : value,
      interval_sec: !_.isEmpty(value) ? value : null
    };

    this.setState({ [key]: keyMap[key] });
  },

  actualScript() {
    return ScriptsStore.getScriptById(this.state.script);
  },

  setScheduleError() {
    const { crontab, interval_sec } = this.state;

    if (!(crontab || interval_sec)) {
      this.setState({
        errors: {
          feedback: 'Crontab or Interval can\'t be blank.'
        }
      });
      return false;
    }
    if (crontab && interval_sec) {
      this.setState({
        errors: {
          feedback: 'You can\'t specify both Crontab and Interval.'
        }
      });
      return false;
    }
    return true;
  },

  renderCrontabDataSource() {
    const crontabs = Store.getCrontabDropdown();
    const styles = this.getStyles();

    return _.map(crontabs, (crontab) => ({
      text: crontab.payload,
      value: (
        <AutoComplete.Item
          primaryText={crontab.text}
          secondaryText={crontab.payload}
          style={styles.autoCompleteItem}
        />
      )
    }));
  },

  renderTimezoneDataSource() {
    const timezones = moment.tz.names();
    const styles = this.getStyles();

    return _.map(timezones, (timezone) => ({
      text: timezone,
      value: (
        <AutoComplete.Item
          primaryText={timezone}
          style={styles.autoCompleteItem}
        />
      )
    }));
  },

  renderStepContent(stepIndex) {
    const {
      isLoading,
      crontab,
      interval_sec,
      label,
      timezone,
      createdSchedule,
      scriptData,
      errors,
      scripts
    } = this.state;

    const handleNewRequest = (item) => {
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
    const handleUpdateAutoComplete = (scriptLabel) => {
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
    const styles = this.getStyles();
    const currentScript = this.actualScript();
    const autoCompleteSearchText = currentScript ? currentScript.label : scriptData.label;

    const stepsMap = {
      step0: (
        <div>
          <Dialog.ContentSection>
            <TextField
              ref="label"
              name="label"
              autoFocus={true}
              fullWidth={true}
              value={label}
              onChange={(event, value) => this.setState({ label: value })}
              errorText={this.getValidationMessages('label').join(' ')}
              hintText="Schedule's label"
              floatingLabelText="Label"
              data-e2e="schedule-modal-label"
            />
            <AutoCompleteWrapper
              name="script"
              hintText="Start typing to see matching scripts list or type a new script label"
              items={{ userData: scripts.items, sampleData: scripts.sampleScripts }}
              searchText={autoCompleteSearchText}
              onNewRequest={(value) => handleNewRequest(value.item)}
              onUpdateInput={(value) => handleUpdateAutoComplete(value)}
              errorText={this.getValidationMessages('script').join(' ')}
              data-e2e="schedule-modal-script"
            />
            <TextField
              ref="Interval"
              name="interval_sec"
              fullWidth={true}
              value={interval_sec}
              onChange={(event, value) => this.handleChangeFields('interval_sec', value)}
              errorText={this.getValidationMessages('interval_sec').join(' ')}
              hintText="Type interval time in seconds"
              floatingLabelText="Interval"
            />
            <div
              className="vp-2-t"
              style={styles.orTag}
            >
              OR
            </div>
            <AutoComplete
              ref="crontab"
              name="crontab"
              floatingLabelText="Crontab"
              hintText="Choose option below or type your own crontab"
              filter={AutoComplete.noFilter}
              animated={false}
              style={{ width: '50%' }}
              fullWidth={true}
              searchText={crontab}
              openOnFocus={true}
              onNewRequest={(value) => this.handleChangeFields('crontab', value)}
              onUpdateInput={(value) => this.handleChangeFields('crontab', value)}
              dataSource={this.renderCrontabDataSource()}
              errorText={this.getValidationMessages('crontab').join(' ')}
              data-e2e="schedule-modal-crontab"
            />
            <AutoComplete
              floatingLabelText="Timezone"
              hintText="Start typing to see available timezones"
              animated={false}
              fullWidth={true}
              style={{ width: '50%' }}
              filter={(searchText, key) => _.toLower(key).includes(_.toLower(searchText))}
              maxSearchResults={5}
              searchText={timezone}
              onNewRequest={(value) => this.handleChangeFields('timezone', value)}
              onUpdateInput={(value) => this.handleChangeFields('timezone', value)}
              dataSource={this.renderTimezoneDataSource()}
              errorText={this.getValidationMessages('timezone').join(' ')}
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
        <Loading show={isLoading || !createdSchedule}>
          <ScheduleSummary
            hasEditMode={this.hasEditMode()}
            item={createdSchedule}
          />
        </Loading>
      )
    };

    return stepsMap[`step${stepIndex}`];
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const styles = this.getStyles();
    const stepTitleMap = {
      step0: this.hasEditMode() ? 'Edit a Schedule Socket' : 'Add a Schedule Socket',
      step1: 'Create a Script',
      step2: (
        <div className="row align-middle">
          <FontIcon
            style={styles.stepTitleIcon}
            color={Colors.blue500}
            className="synicon-socket-schedule"
          />
          <div>
            {`You've just ${actionText} a Schedule!`}
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
          data-e2e="schedule-summary-dialog-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="schedule-dialog-confirm-button"
        data-e2e-cancel="schedule-dialog-cancel-button"
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
      step0: <ScheduleDialogSidebar />,
      step1: <ScriptDialogSidebar />,
      step2: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderDialogTitle() {
    const { stepIndex, isFinished } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div data-e2e={isFinished ? 'schedule-dialog-summary-title' : 'schedule-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Schedule Socket</span>
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
