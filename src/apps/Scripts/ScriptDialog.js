import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';
import ScriptDialogMixin from './ScriptDialogMixin';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptDialogStore';
import RuntimeStore from '../Runtimes/RuntimesStore';

// Components
import { FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Stepper } from '../../common/';
import { DialogBindShortcutsHOC } from '../../common/Dialog';
import ScriptDialogSidebar from './ScriptDialogSidebar';
import ScriptDialogContent from './ScriptDialogContent';
import ScriptSummary from './ScriptSummary';

const ScriptDialog = React.createClass({
  displayName: 'ScriptDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin,
    ScriptDialogMixin
  ],

  validatorConstraints() {
    const validateObj = {};
    const { searchQuery, scriptData } = this.state;
    const { disableBindShortcuts } = this.context;

    validateObj.runtime_name = () => {
      const isRuntimeChosen = !_.isEmpty(scriptData.runtime_name);
      const hasSearchQuery = !_.isEmpty(searchQuery);

      if (!isRuntimeChosen && hasSearchQuery) {
        disableBindShortcuts();
        return {
          presence: {
            message: '^Unknown runtime name. Please choose one from the list.'
          }
        };
      }

      if (!isRuntimeChosen && !hasSearchQuery) {
        disableBindShortcuts();
        return {
          presence: true
        };
      }

      return {};
    };

    return validateObj;
  },

  handleEditSubmit() {
    const { id, label, description, runtime_name } = this.state.scriptData;

    Actions.updateScript(id, { label, description, runtime_name });
  },

  handleAddSubmit() {
    const { label, description, runtime_name } = this.state.scriptData;

    Actions.createScript({ label, description, runtime_name });
  },

  handleClickCloseSummary() {
    const { createdScript } = this.state;

    createdScript && this.redirectToCreatedScript();
    this.handleCancel();
  },

  handleUpdateAutoComplete(value) {
    if (_.isString(value)) {
      this.setState({ searchQuery: value });
    }
  },

  redirectToCreatedScript() {
    const { router, params } = this.props;
    const { createdScript } = this.state;

    router.push(`/instances/${params.instanceName}/scripts/${createdScript.id}/`);
  },

  renderStepContent() {
    const { stepIndex, errors, scriptData, createdScript, searchQuery, shortcutsBinded } = this.state;
    const stepContent = {
      step0: (
        <ScriptDialogContent
          {...scriptData}
          errors={errors}
          handleChangeTextField={this.handleChangeTextField}
          handleChangeAutoComplete={this.handleChangeAutoComplete}
          handleUpdateAutoComplete={this.handleUpdateAutoComplete}
          searchQuery={searchQuery}
          shortcutsBinded={shortcutsBinded}
        />
      ),
      step1: (
        <ScriptSummary createdScript={createdScript} />
      )
    }[`step${stepIndex}`];

    return stepContent;
  },

  renderStepTitle() {
    const { stepIndex, createdScript } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const doneAction = this.hasEditMode() ? 'edited' : 'created';
    const iconColor = createdScript ? RuntimeStore.getRuntimeByKey(createdScript.runtime_name).color : Colors.green400;
    const iconClassName = `synicon-${
      createdScript ? RuntimeStore.getRuntimeByKey(createdScript.runtime_name).icon : 'xml'}`;
    const summaryTitle = (
      <div className="row align-middle">
        <FontIcon
          style={{ fontSize: 32, paddingTop: 4, paddingRight: 8 }}
          color={iconColor}
          className={iconClassName}
        />
        <span>{`You've just ${doneAction} a Script`}</span>
      </div>
    );
    const stepTitle = {
      step0: `${title} a Script`,
      step1: summaryTitle
    }[`step${stepIndex}`];

    return stepTitle;
  },

  renderTitle() {
    const { stepIndex } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Script</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle()}
        </div>
      </div>
    );
  },

  renderSidebarContent() {
    const { isFinished } = this.state;

    return !isFinished ? <ScriptDialogSidebar /> : null;
  },

  renderActionButtons() {
    const { stepIndex } = this.state;
    const actionButtons = {
      step0: (
        <Dialog.StandardButtons
          data-e2e-submit="scripts-submit-button"
          data-e2e-cancel="scripts-cancel-button"
          disabled={!this.state.canSubmit}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleFormValidation}
        />
      ),
      step1: (
        <RaisedButton
          data-e2e="script-close-button-summary"
          label="Close"
          primary={true}
          onTouchTap={this.handleClickCloseSummary}
        />
      )
    }[`step${stepIndex}`];

    return actionButtons;
  },

  render() {
    const { isLoading, open } = this.state;
    const { hasBindShortcutsEnabled } = this.context;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={this.renderTitle()}
        bindShortcuts={hasBindShortcutsEnabled}
        onRequestClose={this.handleClickCloseSummary}
        open={open}
        isLoading={isLoading}
        sidebar={this.renderSidebarContent()}
        actions={this.renderActionButtons()}
      >
        {this.renderFormNotifications()}
        {this.renderStepContent()}
      </Dialog.FullPage>
    );
  }
});

ScriptDialog.contextTypes = {
  hasBindShortcutsEnabled: PropTypes.bool,
  disableBindShortcuts: PropTypes.func
};

const ScriptDialogWithRouter = withRouter(ScriptDialog);

export default DialogBindShortcutsHOC(ScriptDialogWithRouter);
