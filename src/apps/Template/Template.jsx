import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import localStorage from 'local-storage-fallback';
import _ from 'lodash';

import { DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin } from '../../mixins';
import AutosaveMixin from '../Script/ScriptAutosaveMixin';

import TemplateStore from './TemplateStore';
import TemplateActions from './TemplateActions';

import { Checkbox, FontIcon, RaisedButton, TextField } from 'material-ui';
import { Editor, InnerToolbar, Loading, Notification, Show, TogglePanel, ToolbarTitle } from '../../common/';

const Template = React.createClass({
  contextTypes: {
    params: PropTypes.object
  },

  mixins: [
    Reflux.connect(TemplateStore),
    AutosaveMixin,
    DialogsMixin,
    FormMixin,
    MousetrapMixin,
    SnackbarNotificationMixin
  ],

  mixinsConfig: {
    autosaveAttributeName: 'templateContentAutosave',
    editorRefs: ['contextEditor', 'contentEditor', 'previewEditor']
  },

  validatorConstraints() {
    const { successValidationAction } = this.state;
    const validataObj = {};

    validataObj.dataSourceUrl = (value) => {
      let urlValidation = {
        url: {
          message: '^Invalid URL'
        }
      };

      if (successValidationAction === 'tabRender') {
        urlValidation = {
          presence: true
        };
      }

      if (value && value.indexOf(SYNCANO_BASE_URL) === -1) {
        urlValidation = {
          inclusion: {
            within: [],
            message: '^Invalid endpoint URL'
          }
        };
      }

      return urlValidation;
    };

    return validataObj;
  },

  getInitialState() {
    return {
      isSidebarHidden: JSON.parse(localStorage.getItem('isSidebarHidden'))
    };
  },

  componentDidMount() {
    TemplateActions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
    this._handleUpdate = _.debounce(this.handleUpdate, 500, { leading: true });
    this._handleRender = _.debounce(this.handleRender, 500, { leading: true });
  },

  componentDidUpdate() {
    const { renderedTemplate } = this.state;

    if (renderedTemplate) {
      const value = _.isObject(renderedTemplate) ? JSON.stringify(renderedTemplate, null, '\t') : renderedTemplate;

      this.refs.previewEditor.editor.setValue(value);
    }
  },

  componentWillUnmount() {
    TemplateActions.clearTemplate();
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0
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
      codeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRight: '1px solid rgba(224, 224, 224, .5)'
      },
      codeTogglePanel: {
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 100%'
      },
      codeEditorContainer: {
        position: 'relative',
        flex: 1
      },
      sidebar: {
        padding: 0,
        maxWidth: 600
      },
      sidebarSection: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)'
      },
      previewEditorContainer: {
        position: 'relative',
        flex: 1,
        minHeight: 200
      }
    };
  },

  isSaved() {
    const { template } = this.state;
    const contentEditor = this.refs.contentEditor;
    const contextEditor = this.refs.contextEditor;

    if (template && contentEditor && contextEditor) {
      const contentEditorValue = contentEditor.editor.getValue();
      const contextEditorValue = contextEditor.editor.getValue();
      const isContentSaved = _.isEqual(template.content, contentEditorValue);
      const isContextSaved = _.isEqual(JSON.stringify(template.context, null, '\t'), contextEditorValue);

      return isContentSaved && isContextSaved;
    }

    return true;
  },

  handleUpdate() {
    const { template } = this.state;
    const content = this.refs.contentEditor.editor.getValue();
    const context = this.refs.contextEditor.editor.getValue();

    if (this.areEditorsLoaded()) {
      this.clearAutosaveTimer();
      TemplateActions.setDataSource(this.refs.dataSourceUrl.getValue());
      TemplateActions.updateTemplate(template.name, { content, context });
      this.setSnackbarNotification({ message: 'Saving...' });
    }
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleShowSidebarCheckboxCheck(event, isInputChecked) {
    this.setState({ isSidebarHidden: !isInputChecked });
    localStorage.setItem('isSidebarHidden', !isInputChecked);
  },

  handleSuccessfullValidation() {
    const { successValidationAction } = this.state;
    const flagMap = {
      update: this._handleUpdate,
      render: this._handleRender,
      tabRender: this._handleUpdate
    };

    flagMap[successValidationAction]();
  },

  handleRender() {
    if (!this.areEditorsLoaded()) {
      return null;
    }

    const { template } = this.state;
    const { dataSourceUrl } = this.refs;

    if (dataSourceUrl && dataSourceUrl.getValue().length) {
      return TemplateActions.renderFromEndpoint(template.name, dataSourceUrl.getValue());
    }

    return TemplateActions.renderTemplate(template.name, template.context);
  },

  handleDataSourceUrlChange(event, value) {
    this.setState({ dataSourceUrl: value });
  },

  handleSaveButtonTouchTap() {
    this.setFlag('update');
  },

  setFlag(successValidationAction) {
    TemplateActions.setFlag(successValidationAction, this.handleFormValidation);
  },

  showSidebar() {
    this.setState({ isSidebarHidden: false });
    localStorage.setItem('isSidebarHidden', false);
  },

  renderRunButtons(label, iconName, flagName) {
    const styles = this.getStyles();

    const handleTouchTap = () => {
      this.showSidebar();
      this.setFlag(flagName);
    };

    return (
      <RaisedButton
        label={label}
        primary={true}
        style={styles.toolbarButton}
        icon={<FontIcon className={iconName} />}
        onTouchTap={handleTouchTap}
        data-e2e={`template-${_.kebabCase(label)}-button`}
      />
    );
  },

  renderToolbar() {
    const styles = this.getStyles();
    const { isLoading, isSidebarHidden, template } = this.state;
    const title = `Template: ${template.name}`;

    return (
      <InnerToolbar>
        <ToolbarTitle title={title} />
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
            label="Save"
            style={styles.toolbarButton}
            onTouchTap={this.handleSaveButtonTouchTap}
            data-e2e="template-save-button"
          />
          {this.renderRunButtons('Render', 'synicon-play', 'render')}
          {this.renderRunButtons('Render in Tab', 'synicon-open-in-new', 'tabRender')}
        </Show>
      </InnerToolbar>
    );
  },

  renderCodeEditor() {
    const { template } = this.state;

    return (
      <Editor
        ref="contentEditor"
        name="contentEditor"
        mode="django"
        onChange={this.handleOnSourceChange}
        onLoad={this.clearAutosaveTimer}
        value={template.content}
        width="100%"
        height="100%"
        style={{ position: 'absolute' }}
        isEditorErrorVisible={this.getValidationMessages('content').length}
      />
    );
  },

  renderContent() {
    const styles = this.getStyles();

    return (
      <div
        className="col-flex-1"
        style={styles.codeContainer}
      >
        <TogglePanel
          title="Code"
          initialOpen={true}
          style={styles.codeTogglePanel}
          rightContent={
            <a
              href="http://jinja.pocoo.org/docs/dev/templates/"
              target="_blank"
            >
              Jinja template engine docs
            </a>
          }
        >
          <Show if={this.getValidationMessages('content').length}>
            <Notification
              type="error"
              className="vm-2-b"
              hasCloseButtonVisible={false}
            >
              {this.getValidationMessages('content').join(' ')}
            </Notification>
          </Show>
          <div style={styles.codeEditorContainer}>
            {this.renderCodeEditor()}
          </div>
        </TogglePanel>
      </div>
    );
  },

  renderSidebarDataSourceSection() {
    const { instanceName } = this.context.params;

    return (
      <TogglePanel
        title="Data source URL"
        initialOpen={true}
      >
        <TextField
          ref="dataSourceUrl"
          name="dataSourceUrl"
          fullWidth={true}
          value={this.state.dataSourceUrl}
          onChange={this.handleDataSourceUrlChange}
          errorText={this.getValidationMessages('dataSourceUrl').join(' ')}
          hintText={`e.g. ${SYNCANO_BASE_URL}/v1.1/instances/${instanceName}/classes/`}
          floatingLabelText="Data source URL"
        />
      </TogglePanel>
    );
  },

  renderSidebarContextSection() {
    const styles = this.getStyles();
    const { template } = this.state;

    return (
      <TogglePanel
        title="Context"
        initialOpen={true}
        style={styles.togglePanel}
      >
        <Editor
          name="contextEditor"
          ref="contextEditor"
          mode="json"
          height="200px"
          onChange={this.handleOnSourceChange}
          onLoad={this.clearAutosaveTimer}
          value={JSON.stringify(template.context, null, '\t') || [
            '{',
            '    "foo": "bar",',
            '    "bar": "foo"',
            '}'
          ].join('\n')}
        />
      </TogglePanel>
    );
  },

  renderSidebarPreviewSection() {
    const styles = this.getStyles();

    return (
      <TogglePanel
        title="Preview"
        initialOpen={true}
        style={styles.togglePanel}
      >
        <div style={styles.previewEditorContainer}>
          <Editor
            name="previewEditor"
            ref="previewEditor"
            mode="html"
            readOnly={true}
            width="100%"
            height="200px"
          />
        </div>
      </TogglePanel>
    );
  },

  renderSidebar() {
    const styles = this.getStyles();
    const { isSidebarHidden } = this.state;

    if (isSidebarHidden) {
      return null;
    }

    return (
      <div
        className="col-flex-1"
        style={styles.sidebar}
      >
        <div style={styles.sidebarSection}>
          {this.renderSidebarDataSourceSection()}
        </div>
        <div style={styles.sidebarSection}>
          {this.renderSidebarContextSection()}
        </div>
        <div>
          {this.renderSidebarPreviewSection()}
        </div>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { isLoading, template } = this.state;
    const title = `Template: ${template.name}`;

    return (
      <div
        className="col-flex-1"
        style={styles.root}
      >
        <Helmet title={title} />
        {this.renderToolbar()}
        <Loading
          show={isLoading}
          style={{ display: 'flex', flex: 1 }}
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

export default Template;
