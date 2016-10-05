import React from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../mixins';
import ClassDialogMixin from './ClassDialogMixin';

import Store from './ClassDialogStore';
import Actions from './ClassesActions';

import { RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { CheckIcon, Dialog, Stepper } from '../../common/';
import ClassDialogContent from './ClassDialogContent';
import ClassSummaryDialog from './ClassSummaryDialog';
import SidebarContent from './ClassDialogSidebarContent';

const ClassDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    ClassDialogMixin,
    DialogMixin,
    FormMixin
  ],

  handleAddSubmit() {
    const schema = this.refs.classDialogContent.getSchema();
    const params = this.refs.classDialogContent.getClassParams();

    if (schema.length < 1) {
      return this.setSchemaLengthError();
    }

    return Actions.createClass(params);
  },

  handleEditSubmit() {
    const schema = this.refs.classDialogContent.getSchema();
    const params = this.refs.classDialogContent.getClassParams();

    if (schema.length < 1) {
      return this.setSchemaLengthError();
    }

    return Actions.updateClass(params.name, params);
  },

  setSchemaLengthError() {
    this.setState({
      errors: {
        schema: ['You need to add at least one field!']
      }
    });
  },

  renderStepContent(stepIndex) {
    const { createdClass, errors, classData } = this.state;
    const content = {
      step0: (
        <ClassDialogContent
          {...classData}
          errors={errors}
          handleChangeTextField={this.handleChangeTextField}
          setSelectFieldValue={this.setSelectFieldValue}
          hasEditMode={this.hasEditMode()}
          handleOnCheck={this.handleOnCheck}
          handleRemoveField={this.handleRemoveField}
          handleFieldAdd={this.handleFieldAdd}
          handleColorChange={this.handleColorChange}
          handleIconChange={this.handleIconChange}
          handleSampleSchema={this.handleSampleSchema}
          ref="classDialogContent"
        />
      ),
      step1: (
        <ClassSummaryDialog
          item={createdClass}
          hasEditMode={this.hasEditMode()}
        />
      )
    }[`step${stepIndex}`];

    return content;
  },

  renderStepTitle() {
    const { createdClass, stepIndex } = this.state;
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const iconClassName = createdClass ? createdClass.metadata.icon : 'cloud';
    const iconColor = createdClass ? createdClass.metadata.color : Colors.indigo500;
    const stepTitle = {
      step0: this.hasEditMode() ? 'Edit a Data Class' : 'Add a Data Class',
      step1: (
        <div className="row align-middle">
          <CheckIcon.Circle
            style={{ fontSize: 32 }}
            background={iconColor}
            iconClassName={iconClassName}
            checkable={false}
          />
          <div>
            {`You've just ${actionText} a Data Class!`}
          </div>
        </div>
      )
    }[`step${stepIndex}`];

    return stepTitle;
  },

  renderActionButtons() {
    const { canSubmit, isFinished } = this.state;

    if (isFinished) {
      return (
        <RaisedButton
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
          data-e2e="class-summary-dialog-close-button"
        />
      );
    }

    return (
      <Dialog.StandardButtons
        disabled={!canSubmit}
        handleCancel={this.handleCancel}
        handleConfirm={this.handleFormValidation}
        data-e2e-submit="class-dialog-confirm-button"
      />
    );
  },

  renderDialogTitle() {
    const { stepIndex, isFinished } = this.state;
    const title = this.hasEditMode() ? 'Edit' : 'Add';

    return (
      <div data-e2e={isFinished ? 'class-dialog-summary-title' : 'class-dialog-title'}>
        <Stepper activeStep={stepIndex}>
          <span>{title} a Data Class</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle()}
        </div>
      </div>
    );
  },

  render() {
    const {
      isLoading,
      stepIndex,
      isFinished,
      open
    } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        title={this.renderDialogTitle()}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={this.renderActionButtons()}
        sidebar={!isFinished && <SidebarContent />}
      >
        {this.renderFormNotifications()}
        {this.renderStepContent(stepIndex)}
      </Dialog.FullPage>
    );
  }
});

export default ClassDialog;
