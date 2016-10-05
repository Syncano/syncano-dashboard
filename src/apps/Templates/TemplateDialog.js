import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './TemplatesActions';
import DialogStore from './TemplateDialogStore';
import SessionStore from '../Session/SessionStore';

// Components
import defaultCode from './TemplatesDefaultCode';
import { FontIcon, RaisedButton } from 'material-ui';
import { Dialog, Color, Stepper } from '../../common/';
import TemplateDialogSidebar from './TemplateDialogSidebar';
import TemplateDialogContent from './TemplateDialogContent';
import TemplateSummary from './TemplateSummary';

export default React.createClass({
  displayName: 'TemplateDialog',

  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    return {
      name: {
        presence: _.isEmpty(this.state.name)
      },
      content_type: {
        presence: _.isEmpty(this.state.content_type)
      }
    };
  },

  getStyles() {
    return {
      fontSize: 32,
      paddingTop: 4,
      paddingRight: 8
    };
  },

  handleAddSubmit() {
    const { name, content_type } = this.state;
    let { content, context } = defaultCode;
    const defaultTemplateConfig = {
      'application/json': {
        content: content.json,
        context: context.json
      },
      default: {
        content: content.html,
        context: context.html
      }
    };
    const config = defaultTemplateConfig[content_type] || defaultTemplateConfig.default;

    content = config.content;
    context = config.context;

    Actions.createTemplate({ name, content_type, content, context });
  },

  handleEditSubmit() {
    const { name, content_type } = this.state;

    Actions.updateTemplate(name, { content_type });
  },

  handleNameTextFieldChange(event, value) {
    this.setState({ name: value });
  },

  handleChangeAutoComplete(value) {
    const contentType = _.isString(value) ? value : value.text;

    this.setState({ content_type: contentType });
  },

  handleClickCloseSummary() {
    const { createdTemplate } = this.state;

    createdTemplate && this.redirectToCreatedTemplate();
    this.handleCancel();
  },

  redirectToCreatedTemplate() {
    const { createdTemplate } = this.state;
    const router = SessionStore.getRouter();
    const redirectPath = `/instances/${router.params.instanceName}/templates/${createdTemplate.name}/`;

    router.push(redirectPath);
  },

  renderStepContent() {
    const { stepIndex, errors, content_type, name, createdTemplate } = this.state;
    const stepContent = {
      step0: (
        <TemplateDialogContent
          hasEditMode={this.hasEditMode()}
          errors={errors}
          contentType={content_type}
          name={name}
          handleNameTextFieldChange={this.handleNameTextFieldChange}
          handleChangeAutoComplete={this.handleChangeAutoComplete}
        />
      ),
      step1: (
        <TemplateSummary createdTemplate={createdTemplate} />
      )
    }[`step${stepIndex}`];

    return stepContent;
  },

  renderStepTitle() {
    const { stepIndex } = this.state;
    const styles = this.getStyles();
    const title = this.hasEditMode() ? 'Edit' : 'Add';
    const doneAction = this.hasEditMode() ? 'edited' : 'created';
    const iconColor = Color.getColorByName('blue', 'xlight');
    const iconClassName = 'synicon-code-braces';
    const summaryTitle = (
      <div className="row align-middle">
        <FontIcon
          style={styles}
          color={iconColor}
          className={iconClassName}
        />
        <span data-e2e="dialog-summary-title">
          {`You've just ${doneAction} a Template`}
        </span>
      </div>
    );
    const stepTitle = {
      step0: `${title} a Template`,
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
          <span data-e2e={`template-step-title-${title}`}>{title} a Template</span>
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

    return !isFinished && <TemplateDialogSidebar />;
  },

  renderActionButtons() {
    const { stepIndex, canSubmit } = this.state;
    const actionButtons = {
      step0: (
        <Dialog.StandardButtons
          data-e2e-submit="templates-submit-button"
          data-e2e-cancel="templates-cancel-button"
          disabled={!canSubmit}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleFormValidation}
        />
      ),
      step1: (
        <RaisedButton
          data-e2e="templates-close-button-summary"
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

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={this.renderTitle()}
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
