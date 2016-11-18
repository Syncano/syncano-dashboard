import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';
import localStorage from 'local-storage-fallback';

import { DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin } from '../../mixins';
import AutosaveMixin from './ScriptAutosaveMixin';

import Store from './ScriptStore';
import Actions from './ScriptActions';

import { Checkbox, FlatButton, FontIcon, IconButton, RaisedButton, TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import {
  Dialog,
  Editor,
  InnerToolbar,
  Loading,
  Notification,
  DialogRefreshButton,
  SelectFieldWrapper,
  Show,
  TogglePanel
} from '../../common';
import Traces from '../Traces';

const Script = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    AutosaveMixin,
    DialogsMixin,
    FormMixin,
    MousetrapMixin,
    SnackbarNotificationMixin
  ],

  mixinsConfig: {
    autosaveAttributeName: 'scriptSourceAutosave',
    editorRefs: ['editorSource', 'payloadSource']
  },

  validatorConstraints() {
    const { scriptConfig } = this.state;
    const validateObj = {};

    _.forEach(scriptConfig, (item, index) => {
      validateObj[`fieldKey${index}`] = (value, options) => {
        const keyValidation = {
          presence: {
            message: '^This field cannot be blank'
          }
        };

        const isUnique = (configKey, fieldKey) => configKey === value && _.includes(fieldKey, 'fieldKey');

        if (_.filter(options, isUnique).length > 1) {
          const uniqueKeyValidation = {
            inclusion: {
              within: [],
              message: '^This field must be unique'
            }
          };

          _.assign(keyValidation, uniqueKeyValidation);
        }

        return keyValidation;
      };
      if (item.type === 'integer') {
        validateObj[`fieldValue${index}`] = {
          numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: Number.MIN_SAFE_INTEGER,
            lessThanOrEqualTo: Number.MAX_SAFE_INTEGER,
            message: '^This value should be an integer type and range'
          }
        };
      }
    });

    return validateObj;
  },

  getInitialState() {
    return {
      isSidebarHidden: JSON.parse(localStorage.getItem('isSidebarHidden')),
      isResultWrapped: JSON.parse(localStorage.getItem('isResultWrapped'))
    };
  },

  componentWillMount() {
    this.savePayloadToStorageThrottled = _.throttle(this.savePayloadToStorage, 1000, { leading: false });
  },

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });

    this.runScript = _.debounce(Actions.runScript, 500, { leading: true });
  },

  componentWillUnmount() {
    Store.clearCurrentScript();
  },

  getValidatorAttributes() {
    const { scriptConfig } = this.state;

    if (!scriptConfig.length) {
      return {};
    }

    const attributes = _.reduce(scriptConfig, (all, item, index) => {
      all[`fieldKey${index}`] = item.key;
      all[`fieldValue${index}`] = item.value;
      return all;
    }, {});

    return attributes;
  },

  getStyles() {
    const { isResultWrapped } = this.state;

    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      },
      notification: {
        margin: '20px 20px 10px 10px'
      },
      deleteIcon: {
        width: 64,
        display: 'flex',
        alignItems: 'center'
      },
      toolbarCheckbox: {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: 20
      },
      toolbarCheckboxLabelStyle: {
        whiteSpace: 'nowrap',
        width: 'auto'
      },
      toolbarButton: {
        marginLeft: 10
      },
      dialogRefreshButton: {
        paddingTop: 14,
        marginRight: 20
      },
      dialogRefreshButtonIcon: {
        fontSize: 36
      },
      codeContainer: {
        display: 'flex',
        borderRight: '1px solid rgba(224, 224, 224, .5)'
      },
      codeTogglePanel: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      },
      codeEditorContainer: {
        position: 'relative',
        flex: 1
      },
      loadingContainer: {
        display: 'flex',
        flex: 1
      },
      sidebar: {
        padding: 0,
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 110
      },
      sidebarSection: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)'
      },
      sidebarConfigField: {
        fontSize: 14
      },
      result: {
        color: '#444',
        fontFamily: "Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace",
        fontSize: 12,
        whiteSpace: isResultWrapped ? 'pre-line' : 'pre'
      },
      resultContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: '100%'
      },
      lastTrace: {
        zIndex: 1,
        position: 'fixed',
        bottom: 20,
        right: 80
      },
      sidebarResultSection: {
        overflow: 'hidden',
        flexBasis: 305,
        flexGrow: 1,
        display: 'flex'
      },
      linkIcon: {
        color: Colors.blue500,
        fontSize: 22,
        lineHeight: 1
      },
      resultIcon: {
        paddingTop: 10
      },
      rightContent: {
        display: 'flex'
      },
      wrapIcon: {
        fontSize: 48,
        color: isResultWrapped && Colors.blue500
      }
    };
  },

  getToolbarTitle() {
    const { currentScript } = this.state;

    return currentScript ? `Script: ${currentScript.label} (id: ${currentScript.id})` : '';
  },

  getConfigObject() {
    const { scriptConfig } = this.state;
    const scriptConfigObject = _.reduce(scriptConfig, (result, item) => {
      result[item.key] = item.type === 'integer' ? Number(item.value) : _.toString(item.value);
      return result;
    }, {});

    return scriptConfigObject;
  },

  getLinkToPackages(currentScript) {
    const runtimeName = currentScript && Store.getRuntimeByName(currentScript.runtime_name);

    return runtimeName ? runtimeName.packages : '';
  },

  getLastTrace(callback) {
    const { currentScript, traces } = this.state;
    const lastTrace = traces && traces[0];

    Actions.fetchScriptTrace(currentScript.id, lastTrace.id);
    const lastTraceResult = this.state.traces[0].result;

    if (_.has(lastTraceResult, '__error__')) {
      setTimeout(() => this.getLastTrace(callback), 250);
    } else {
      callback(lastTraceResult);
    }
  },

  isSaved() {
    const { currentScript } = this.state;

    if (!currentScript || !this.refs.editorSource) {
      return true;
    }

    const initialSource = currentScript.source;
    const currentSource = this.refs.editorSource.editor.getValue();

    return _.isEqual(initialSource, currentSource) && _.isEqual(currentScript.config, this.getConfigObject());
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleRunScript() {
    const { currentScript, payload } = this.state;
    const config = this.getConfigObject();
    const source = this.refs.editorSource.editor.getValue();
    const updateParams = {
      config,
      source
    };
    const runParams = {
      id: currentScript.id,
      payload
    };

    this.clearAutosaveTimer();
    this.setSnackbarNotification({ message: 'Saving...' });
    this.runScript(updateParams, runParams);
  },

  handleAddField(event) {
    event && event.preventDefault();
    const { scriptConfig, newFieldKey, newFieldValue, configValueType } = this.state;

    const newField = {
      key: newFieldKey,
      value: newFieldValue,
      type: configValueType
    };

    scriptConfig.push(newField);
    this.setState({
      newFieldKey: '',
      newFieldValue: '',
      scriptConfig
    });
    this.refs.newFieldKey.focus();
  },

  handleAddFieldOnSave() {
    const { newFieldKey, configValueType } = this.state;

    newFieldKey && configValueType && this.handleAddField();
  },

  handleUpdate() {
    if (this.areEditorsLoaded()) {
      const { id } = this.state.currentScript;

      this.handleAddFieldOnSave();
      const config = this.getConfigObject();
      const source = this.refs.editorSource.editor.getValue();

      this.clearAutosaveTimer();
      Actions.updateScript(id, { config, source });
      this.setSnackbarNotification({ message: 'Saving...' });
    }
  },

  handleDeleteKey(index) {
    const { scriptConfig } = this.state;

    scriptConfig.splice(index, 1);
    this.runAutoSave(0);
    this.clearValidations();
    this.setState({ scriptConfig });
  },

  handleUpdateKey(key, index) {
    const { scriptConfig } = this.state;
    const newValue = this.refs[`fieldValue${index}`].getValue();
    const newType = this.refs[`fieldType${index}`].props.value;

    const newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: newValue,
      type: newType
    };

    scriptConfig[index] = newField;
    this.setState({ scriptConfig });
  },

  handleCloseUsavedDataWarnDialog() {
    this.handleCancel('unsavedDataWarn');
  },

  handleShowTracesDialog() {
    this.showDialog('scriptTraces');
  },

  handleShowSidebarCheckboxCheck(event, isInputChecked) {
    this.setState({ isSidebarHidden: !isInputChecked });
    localStorage.setItem('isSidebarHidden', !isInputChecked);
  },

  handleSaveTouchTap() {
    this.setFlag(false);
  },

  handleRunTouchTap() {
    this.showSidebar();
    this.setFlag(true);
  },

  handleBackClick() {
    const { router, params } = this.props;
    const redirectPath = `/instances/${params.instanceName}/scripts/`;

    router.push(redirectPath);
  },

  handleSuccessfullValidation() {
    const { shouldRun } = this.state;

    if (shouldRun) {
      return this.handleRunScript();
    }

    return this.handleUpdate();
  },

  handleTypeFieldChange(fieldIndex, type) {
    const { scriptConfig } = this.state;
    const value = scriptConfig[fieldIndex].value;

    scriptConfig[fieldIndex].type = type;
    if (value === 0 || value === '') {
      scriptConfig[fieldIndex].value = type === 'integer' ? 0 : '';
    }
    this.setState({ scriptConfig });
  },

  handlePayloadChange(payload) {
    this.savePayloadToStorageThrottled();
    this.setState({ payload });
  },

  handlePayloadFromStorage() {
    const { currentScript } = this.state;
    const instance = localStorage.getItem('lastInstanceName');

    return currentScript && localStorage.getItem(`${instance}-${currentScript.id}`);
  },

  handlePayloadValue() {
    const defaultValue = [
      '{',
      '    "string": "This value can be accessed from ARGS.string",',
      '    "integer": 42,',
      '    "boolean": true',
      '}'
    ].join('\n');

    return this.handlePayloadFromStorage() || defaultValue;
  },

  handleRefreshClick() {
    const { currentScript } = this.state;

    return Actions.fetchScriptTraces(currentScript.id);
  },

  handleCloseTracesDialog() {
    this.handleCancel('scriptTraces');
  },

  handleNewFieldKeyChange(event, value) {
    this.updateNewField('newFieldKey', value);
  },

  handleNewFieldTypeChange(event, index, value) {
    this.setSelectFieldValue('configValueType', value);
  },

  handleNewFieldValueChange(event, value) {
    this.updateNewField('newFieldValue', value);
  },

  handleWrapResultCheckboxCheck() {
    const { isResultWrapped } = this.state;

    this.setState({ isResultWrapped: !isResultWrapped });
    localStorage.setItem('isResultWrapped', !isResultWrapped);
  },

  showSidebar() {
    this.setState({ isSidebarHidden: false });
    localStorage.setItem('isSidebarHidden', false);
  },

  initDialogs() {
    const { traceIsLoading, traces } = this.state;
    const styles = this.getStyles();
    const dialogRefreshButton = (
      <DialogRefreshButton
        style={styles.dialogRefreshButton}
        data-e2e="script-traces-refresh-button"
        iconStyle={styles.dialogRefreshButtonIcon}
        onTouchTap={this.handleRefreshClick}
      />
    );

    return [
      {
        dialog: Dialog.FullPage,
        params: {
          key: 'scriptTraces',
          ref: 'scriptTraces',
          title: `Traces for ${this.getToolbarTitle()}`,
          actions: [],
          cornerButtons: dialogRefreshButton,
          onRequestClose: this.handleCloseTracesDialog,
          children: <Traces.List
            isLoading={traceIsLoading}
            tracesFor="script"
            name="Traces"
            items={traces}
            onLoadMore={Actions.fetchScriptTrace}
          />
        }
      },
      {
        dialog: Dialog.FullPage,
        params: {
          key: 'unsavedDataWarn',
          ref: 'unsavedDataWarn',
          title: 'Unsaved Script config',
          actions: [
            <FlatButton
              label="Just leave"
              secondary={true}
              onTouchTap={this._handleContinueTransition}
            />,
            <FlatButton
              label="Continue editing"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleCloseUsavedDataWarnDialog}
            />
          ],
          modal: true,
          children: "You're leaving Script Config with unsaved changes. Are you sure you want to continue?"
        }
      }
    ];
  },

  updateNewField(fieldKey, value) {
    this.setState({
      [fieldKey]: value
    });
  },

  setFlag(flag) {
    this.setState({ shouldRun: flag }, this.handleFormValidation);
  },

  savePayloadToStorage() {
    const { currentScript, payload } = this.state;
    const instance = localStorage.getItem('lastInstanceName');

    return currentScript && localStorage.setItem(`${instance}-${currentScript.id}`, payload);
  },

  renderConfigFields() {
    const styles = this.getStyles();
    const { scriptConfig } = this.state;

    if (!scriptConfig.length) {
      return null;
    }

    return _.map(scriptConfig, (field, index) => (
      <div
        className="row align-center"
        key={index}
      >
        <div className="col-flex-1">
          <TextField
            key={`fieldKey${index}`}
            ref={`fieldKey${index}`}
            floatingLabelText="Key"
            value={scriptConfig[index].key}
            fullWidth={true}
            errorText={this.getValidationMessages(`fieldKey${index}`).join(' ')}
            onChange={() => this.handleUpdateKey(field.key, index)}
            style={styles.sidebarConfigField}
          />
        </div>
        <div className="col-flex-1">
          <SelectFieldWrapper
            key={`fieldType${index}`}
            ref={`fieldType${index}`}
            name="configValueType"
            floatingLabelText="Value Type"
            options={Store.getScriptConfigValueTypes()}
            value={scriptConfig[index].type}
            onTouchTap={this.handleSelectFieldClick}
            onChange={(event, selectedIndex, value) => this.handleTypeFieldChange(index, value)}
            errorText={this.getValidationMessages('configValueType').join(' ')}
            fullWidth={true}
            style={styles.sidebarConfigField}
          />
        </div>
        <div className="col-flex-1">
          <TextField
            key={`fieldValue${index}`}
            ref={`fieldValue${index}`}
            floatingLabelText="Value"
            value={scriptConfig[index].value}
            style={styles.sidebarConfigField}
            fullWidth={true}
            errorText={this.getValidationMessages(`fieldValue${index}`).join(' ')}
            onChange={() => this.handleUpdateKey(field.key, index)}
          />
        </div>
        <div
          className="col-flex-0"
          style={styles.deleteIcon}
        >
          <IconButton
            iconClassName="synicon-close"
            tooltip="Delete key"
            onClick={() => this.handleDeleteKey(index)}
          />
        </div>
      </div>
    ));
  },

  renderConfigNewFieldSection() {
    const styles = this.getStyles();
    const { configValueType, newFieldKey, newFieldValue } = this.state;

    return (
      <form
        key="form"
        className="row align-center"
        onSubmit={this.handleAddField}
      >
        <div className="col-flex-1">
          <TextField
            className="config-input-key"
            key="newFieldKey"
            floatingLabelText="Key"
            value={newFieldKey}
            onChange={this.handleNewFieldKeyChange}
            errorText={this.getValidationMessages('newFieldKey').join(' ')}
            fullWidth={true}
            style={styles.sidebarConfigField}
          />
        </div>
        <div className="col-flex-1">
          <SelectFieldWrapper
            key="newFieldType"
            name="configValueType"
            floatingLabelText="Value Type"
            options={Store.getScriptConfigValueTypes()}
            value={configValueType}
            onChange={this.handleNewFieldTypeChange}
            errorText={this.getValidationMessages('configValueType').join(' ')}
            fullWidth={true}
            style={styles.sidebarConfigField}
          />
        </div>
        <div className="col-flex-1">
          <TextField
            className="config-input-value"
            key="newFieldValue"
            floatingLabelText="Value"
            value={newFieldValue}
            onChange={this.handleNewFieldValueChange}
            fullWidth={true}
            style={styles.sidebarConfigField}
          />
        </div>
        <div
          className="col-flex-0"
          style={styles.deleteIcon}
        >
          <IconButton
            className="add-field-button"
            iconStyle={{ color: '#d2d2d2' }}
            iconClassName="synicon-plus"
            tooltip="Add field"
            type="submit"
          />
        </div>
      </form>
    );
  },

  renderToolbar() {
    const styles = this.getStyles();
    const { isLoading, isSidebarHidden } = this.state;

    return (
      <InnerToolbar
        title={this.getToolbarTitle()}
        backFallback={this.handleBackClick}
        forceBackFallback={true}
        backButtonTooltip="Go back to Scripts list"
      >
        <Show if={!isLoading}>
          <div style={styles.toolbarCheckbox}>
            <Checkbox
              label="Show Sidebar"
              labelStyle={styles.toolbarCheckboxLabelStyle}
              checked={!isSidebarHidden}
              onCheck={this.handleShowSidebarCheckboxCheck}
            />
          </div>
          <div style={styles.toolbarCheckbox}>
            <Checkbox
              ref="autosaveCheckbox"
              name="autosaveCheckbox"
              label="Autosave"
              labelStyle={styles.toolbarCheckboxLabelStyle}
              defaultChecked={this.isAutosaveEnabled()}
              onCheck={this.saveCheckboxState}
            />
          </div>
          <RaisedButton
            label="Traces"
            style={styles.toolbarButton}
            onTouchTap={this.handleShowTracesDialog}
            data-e2e="script-traces-button"
          />
          <RaisedButton
            label="Save"
            style={styles.toolbarButton}
            onTouchTap={this.handleSaveTouchTap}
          />
          <RaisedButton
            label="Run"
            primary={true}
            style={styles.toolbarButton}
            icon={<FontIcon className="synicon-play" />}
            onTouchTap={this.handleRunTouchTap}
            data-e2e="script-run-button"
          />
        </Show>
      </InnerToolbar>
    );
  },

  renderContent() {
    const styles = this.getStyles();
    const { currentScript } = this.state;
    const linkToPackages = currentScript && this.getLinkToPackages(currentScript);
    let source = null;
    let editorMode = 'python';

    if (currentScript) {
      source = currentScript.source;
      editorMode = Store.getEditorMode(currentScript.runtime_name);
    }

    return (
      <div
        className="col-flex-1"
        style={styles.codeContainer}
      >
        <TogglePanel
          title="Code"
          style={styles.codeTogglePanel}
          rightContent={
            <Show if={linkToPackages}>
              <a
                href={linkToPackages}
                target="_blank"
              >
                Available Packages
              </a>
            </Show>
          }
        >
          <Show if={this.getValidationMessages('source').length}>
            <div style={styles.notification}>
              <Notification type="error">
                {this.getValidationMessages('source').join(' ')}
              </Notification>
            </div>
          </Show>
          <div style={styles.codeEditorContainer}>
            <Editor
              ref="editorSource"
              name="editorSource"
              mode={editorMode}
              onChange={this.handleOnSourceChange}
              onLoad={this.clearAutosaveTimer}
              value={source}
              width="100%"
              height="100%"
              style={{ position: 'absolute' }}
            />
          </div>
        </TogglePanel>
      </div>
    );
  },

  renderSidebarConfigSection() {
    const styles = this.getStyles();

    return (
      <TogglePanel title="Config">
        <div>
          {this.renderConfigFields()}
          {this.renderConfigNewFieldSection()}
          <Show if={this.getValidationMessages('config').length}>
            <div style={styles.notification}>
              <Notification type="error">
                {this.getValidationMessages('config').join(' ')}
              </Notification>
            </div>
          </Show>
        </div>
      </TogglePanel>
    );
  },

  renderSidebarPayloadSection() {
    const styles = this.getStyles();

    return (
      <div>
        <TogglePanel title="Payload">
          <Editor
            name="payload-editor"
            ref="payloadSource"
            mode="json"
            height="120px"
            onChange={this.handlePayloadChange}
            onLoad={this.clearAutosaveTimer}
            value={this.handlePayloadValue()}
          />
        </TogglePanel>
        <Show if={this.getValidationMessages('payload').length}>
          <div style={styles.notification}>
            <Notification type="error">
              {this.getValidationMessages('payload').join(' ')}
            </Notification>
          </div>
        </Show>
      </div>
    );
  },

  renderLastTraceResultInNewTab() {
    const { currentScript, lastTraceStatus } = this.state;

    this.getLastTrace((pageContent) => {
      const rawResultPage = window.open();
      const documentContent = `
        <title>
          ${currentScript.label} || ${lastTraceStatus}
        </title>
        <pre>${pageContent.stdout}</pre>
        <pre>${pageContent.stderr}</pre>
      `;

      rawResultPage.document.write(documentContent);
    });
  },

  renderSidebarResultSection() {
    const styles = this.getStyles();
    const { lastTraceResult, isResultWrapped } = this.state;
    const showRightContent = lastTraceResult && lastTraceResult !== 'Success';
    const wrapIconTolltip = isResultWrapped ? 'Unwrap text' : 'Wrap text';
    const rightContent = showRightContent && (
      <div style={styles.rightContent}>
        <IconButton
          onTouchTap={this.renderLastTraceResultInNewTab}
          iconStyle={styles.linkIcon}
          style={styles.resultIcon}
          tooltip="Open last trace result in new tab"
          tooltipPosition="bottom-left"
          iconClassName="synicon-launch"
        />
        <IconButton
          onTouchTap={this.handleWrapResultCheckboxCheck}
          iconStyle={styles.wrapIcon}
          style={styles.resultIcon}
          tooltip={wrapIconTolltip}
          tooltipPosition="bottom-left"
          iconClassName="synicon-wrap-text"
        />
      </div>
    );

    return (
      <TogglePanel
        title="Result"
        style={styles.resultContainer}
        rightContent={rightContent}
      >
        <div style={styles.result}>
          {lastTraceResult}
        </div>
      </TogglePanel>
    );
  },

  renderSidebarLastRunSection() {
    const styles = this.getStyles();
    const { lastTraceStatus, lastTraceDuration } = this.state;

    if (!lastTraceStatus || !lastTraceDuration) {
      return null;
    }

    return (
      <div style={styles.lastTrace}>
        <Notification type={lastTraceStatus === 'success' ? 'info' : 'error'}>
          {`Last run status: ${lastTraceStatus} Duration: ${lastTraceDuration}ms`}
        </Notification>
      </div>
    );
  },

  renderSidebar() {
    const styles = this.getStyles();
    const { isSidebarHidden } = this.state;

    if (isSidebarHidden) {
      return null;
    }

    return (
      <div style={styles.sidebar}>
        <div style={styles.sidebarSection}>
          {this.renderSidebarConfigSection()}
        </div>
        <div style={styles.sidebarSection}>
          {this.renderSidebarPayloadSection()}
        </div>
        <div style={styles.sidebarResultSection}>
          {this.renderSidebarResultSection()}
        </div>

        {this.renderSidebarLastRunSection()}
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { currentScript, isLoading } = this.state;

    return (
      <div
        className="col-flex-1"
        style={styles.root}
      >
        <Helmet title={this.getToolbarTitle()} />
        {this.getDialogs()}
        {this.renderToolbar()}
        <Loading
          show={isLoading || !currentScript}
          style={styles.loadingContainer}
        >
          <div
            className="row"
            style={{ flex: 1 }}
          >
            {this.renderContent()}
            {this.renderSidebar()}
          </div>
        </Loading>
      </div>
    );
  }
});

export default withRouter(Script);
