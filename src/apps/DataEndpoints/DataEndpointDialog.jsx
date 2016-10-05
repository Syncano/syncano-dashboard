import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import shortid from 'shortid';
import _ from 'lodash';

import JSONUtil from '../../utils/JSONUtil';
import { DialogMixin, FormMixin } from '../../mixins';
import ClassDialogMixin from '../Classes/ClassDialogMixin';

import Store from './DataEndpointDialogStore';
import Actions from './DataEndpointsActions';
import DataEndpointsStore from './DataEndpointsStore';
import ClassesStore from '../Classes/ClassesStore';
import ClassesActions from '../Classes/ClassesActions';

import { FontIcon, RaisedButton, TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import {
  AutoCompleteWrapper,
  Color,
  Dialog,
  Editor,
  Icon,
  Loading,
  Notification,
  SelectFieldWrapper,
  Show,
  Stepper
} from '../../common/';
import { DialogBindShortcutsHOC } from '../../common/Dialog';
import ClassDialogContent from '../Classes/ClassDialogContent';
import ClassDialogSidebarContent from '../Classes/ClassDialogSidebarContent';
import ClassSchemaTable from './ClassSchemaTable';
import DataEndpointSummary from './DataEndpointSummary';

const DataEndpointDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    ClassDialogMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const excludedNames = _.map(DataEndpointsStore.getDataEndpoints(), (item) => item.name);
    const validationObject = {
      name: {
        presence: true
      },
      query: (value) => {
        if (!JSONUtil.isValidJSONInput(value)) {
          return {
            inclusion: {
              within: [],
              message: 'is not a valid JSON'
            }
          };
        }

        return true;
      }
    };

    if (!this.hasEditMode()) {
      validationObject.name.exclusion = {
        within: excludedNames,
        message: '^Data Endpoint name must be unique'
      };
    }

    return validationObject;
  },

  componentWillUpdate(nextProps, nextState) {
    if (_.isString(nextState.classes[0])) {
      ClassesActions.fetch();
    }

    if (nextState._dialogVisible && nextState.stepIndex === 1 && this.state.stepIndex === 0) {
      let { classData } = this.state;
      const metadata = {
        color: Color.getRandomColorName(),
        icon: Icon.Store.getRandomIconPickerIcon()
      };

      classData = _.merge(classData, { metadata });

      this.setState({ classData });
    }
  },

  getInitialState() {
    return {
      classData: {
        name: null,
        fieldType: 'string',
        fieldTarget: 'self',
        group_permissions: 'create_objects',
        other_permissions: 'create_objects',
        fields: [],
        metadata: {}
      }
    };
  },

  getParsedQueryParam(query) {
    if (!query) {
      return {};
    }

    if (_.isObject(query)) {
      return query;
    }

    return JSON.parse(query);
  },

  getParams() {
    const { name, description, order_by, page_size, excluded_fields, expand, query, createdClass } = this.state;
    const className = createdClass ? createdClass.name : this.state.class;
    const params = {
      class: className,
      query: this.getParsedQueryParam(query),
      name,
      description,
      order_by,
      page_size,
      excluded_fields,
      expand
    };

    return params;
  },

  getActionButtonsConfig() {
    const { stepIndex } = this.state;

    return {
      step0: {
        submitLabel: this.isActualClass() ? 'Configure Data Endpoint' : 'Go to Data Class creation',
        cancelLabel: 'Cancel',
        handleCancel: this.handleCancel
      },
      step1: {
        submitLabel: 'Create a Data Class',
        cancelLabel: 'Back',
        handleCancel: () => {
          this.resetClassState();
          Actions.changeStep(0);
        }
      },
      step2: {
        submitLabel: this.hasEditMode() ? 'Confirm changes' : 'Create a Data Endpoint',
        cancelLabel: 'Back to beginning',
        handleCancel: () => {
          this.resetClassState();
          Actions.changeStep(0);
        }
      }
    }[`step${stepIndex}`];
  },

  getStyles() {
    return {
      contentSection: {
        paddingTop: 16
      }
    };
  },

  isActualClass() {
    return ClassesStore.getClassByName(this.state.class);
  },

  handleFinish(finishAction) {
    const { stepIndex } = this.state;
    const nextStep = {
      step0: this.isActualClass() ? () => Actions.changeStep(2) : () => Actions.changeStep(1),
      step1: this.handleAddClassSubmit,
      step2: finishAction
    }[`step${stepIndex}`];

    nextStep();
  },

  handleAddSubmit() {
    const params = this.getParams();

    this.handleFinish(() => Actions.createDataEndpoint(params));
  },

  handleEditSubmit() {
    const params = this.getParams();

    this.handleFinish(() => Actions.updateDataEndpoint(params.name, params));
  },

  handleClassAutocompleteFilter(searchText, key) {
    if (!searchText) {
      return true;
    }

    return searchText !== '' && key.includes(searchText) || key === '';
  },

  handleExpandField(isChecked, fieldName) {
    let { expand } = this.state;

    expand = expand.length ? expand.split(',') : [];

    if (isChecked) {
      expand.push(fieldName);
    } else {
      _.remove(expand, (item) => item === fieldName);
    }

    expand = _.union(expand);

    this.setState({ expand: expand.join(',') });
  },

  handleExcludeSchemaFields(selectedIndexes) {
    const { createdClass } = this.state;
    let { excluded_fields } = this.state;
    const chosenClass = createdClass || ClassesStore.getClassByName(this.state.class);
    const schemaFieldsNames = _.map(chosenClass.schema, (field) => field.name);
    const indexesMap = {
      none: schemaFieldsNames,
      all: []
    };

    excluded_fields = excluded_fields.split(',');

    if (_.isArray(selectedIndexes)) {
      const includedFields = _.map(selectedIndexes, (selectedIndex) => schemaFieldsNames[selectedIndex]);

      excluded_fields = _.difference(schemaFieldsNames, includedFields);
    } else {
      excluded_fields = indexesMap[selectedIndexes];
    }

    this.setState({ excluded_fields: excluded_fields.join(',') });
  },

  handleAddClassSubmit() {
    const classParams = this.refs.classDialogContent ? this.refs.classDialogContent.getClassParams() : {};
    const schema = this.refs.classDialogContent.getSchema();

    if (schema.length < 1) {
      return this.setState({
        errors: {
          schema: ['You need to add at least one field!']
        }
      });
    }

    return Actions.createClass(classParams);
  },

  handleNameChange(event, value) {
    this.setState({ name: value });
  },

  handleDescriptionChange(event, value) {
    this.setState({ description: value });
  },

  handleClassChange(name) {
    const { classData } = this.state;

    this.setState({ class: name, classData: _.merge(classData, { name }) });
  },

  handlePageSizeChange(event, value) {
    this.setState({ page_size: value });
  },

  handleQueryChange(value) {
    this.setState({ query: value });
  },

  handleOrderChange(value) {
    this.setSelectFieldValue('order_by', value);
  },

  resetClassState() {
    let { classData } = this.state;
    const cleanClassData = {
      group: null,
      fields: [],
      metadata: {},
      fieldName: '',
      fieldType: this.fieldType,
      description: '',
      fieldOrder: false,
      fieldFilter: false,
      fieldTarget: 'self',
      group_permissions: 'create_objects',
      other_permissions: 'create_objects'
    };

    classData = _.merge(classData, cleanClassData);

    this.setState({ classData });
  },

  renderOptions() {
    const { createdClass } = this.state;
    const createdClassName = createdClass ? createdClass.name : null;
    const orderFields = ClassesStore.getClassOrderFieldsPayload(createdClassName || this.state.class);
    let orderField = (
      <div
        key="options_header"
        style={{
          paddingTop: 24,
          paddingBottom: 24
        }}
      >
        <Notification>Add schema fields with order index</Notification>
      </div>
    );

    if (orderFields.length) {
      orderField = (
        <SelectFieldWrapper
          name="order_by"
          floatingLabelText="Ordering options"
          options={orderFields}
          value={this.state.order_by || 'id'}
          onChange={this.handleOrderChange}
          errorText={this.getValidationMessages('order_by').join(' ')}
        />
      );
    }

    return orderField;
  },

  renderSidebarContent(stepIndex) {
    const filteringUrl = 'http://docs.syncano.io/docs/data-objects-filtering-ordering#filtering-data-objects';
    const learnMore = (
      <Dialog.SidebarSection last={true}>
        <Dialog.SidebarLink to="http://docs.syncano.io/docs/endpoints-data">
          Learn more
        </Dialog.SidebarLink>
      </Dialog.SidebarSection>
    );
    const headDescription = (
      <Dialog.SidebarSection>
        With Data Endpoints you can configure Data Object calls and save them for later use.
      </Dialog.SidebarSection>
    );
    const sidebarContentMap = {
      step0: (
        <Dialog.SidebarBox>
          {headDescription}
          <Dialog.SidebarSection title="Data Class">
            Data Classes define properties of Data Objects. If you have no Data Classes yet you can create one&nbsp;
            <Dialog.SidebarLink to="classes">
              here.
            </Dialog.SidebarLink>
          </Dialog.SidebarSection>
          {learnMore}
        </Dialog.SidebarBox>
      ),
      step1: (
        <ClassDialogSidebarContent />
      ),
      step2: (
        <Dialog.SidebarBox>
          {headDescription}
          <Dialog.SidebarSection title="Data Class Fields">
            Choose which fields of Data Class schema will be included in the response. If a field is referencing
            Data Objects in a different Data Class, you can expand it to get those Data Objects proprerties.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection title="Response options">
            You can order or filter your indexed data class schema fields.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection title="Records number">
            Set the number of Data Objects that should be returned in one call.
          </Dialog.SidebarSection>
          <Dialog.SidebarSection title="Query">
            {'In this field you can specify a filtering method just as you would when using '}
            <Dialog.SidebarLink to={filteringUrl}>
              Data Objects filtering.
            </Dialog.SidebarLink>
          </Dialog.SidebarSection>
          {learnMore}
        </Dialog.SidebarBox>
      ),
      step3: null
    };

    return sidebarContentMap[`step${stepIndex}`];
  },

  renderStepContent(stepIndex) {
    const styles = this.getStyles();
    const { enableBindShortcuts, disableBindShortcuts } = this.context;
    const {
      excluded_fields,
      expand,
      query,
      createdDataEndpoint,
      createdClass,
      isLoading,
      classData,
      errors,
      classes
    } = this.state;

    const handleNewRequest = (value) => {
      const fields = _.map(value.item.schema, (field) => ({
        fieldName: field.name,
        fieldType: field.type,
        fieldTarget: field.target,
        fieldOrder: field.order,
        fieldFilter: field.filter,
        key: shortid.generate()
      }));
      const newClassData = {
        name: value.item.name,
        fields,
        metadata: value.item.metadata,
        description: value.item.description
      };

      this.setState({
        class: value.item.name,
        classData: _.merge(classData, newClassData)
      });
    };
    const stepsMap = {
      step0: (
        <div>
          <Dialog.ContentSection>
            <TextField
              ref="name"
              name="name"
              autoFocus={true}
              fullWidth={true}
              disabled={this.hasEditMode()}
              value={this.state.name}
              onChange={this.handleNameChange}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Data Endpoint's name"
              floatingLabelText="Name"
            />
          </Dialog.ContentSection>
          <Dialog.ContentSection>
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Data Endpoint's description"
              floatingLabelText="Description (optional)"
            />
          </Dialog.ContentSection>
          <Dialog.ContentSection>
            <AutoCompleteWrapper
              name="class"
              hintText="Start typing to see matching classes list or type a new Data Class name"
              items={{ userData: classes.userClasses, sampleData: classes.sampleClasses }}
              searchText={this.state.class}
              onNewRequest={handleNewRequest}
              onUpdateInput={this.handleClassChange}
              errorText={this.getValidationMessages('class').join(' ')}
            />
          </Dialog.ContentSection>
        </div>
      ),
      step1: (
        <ClassDialogContent
          {...classData}
          errors={errors}
          handleOnCheck={this.handleOnCheck}
          handleFieldAdd={this.handleFieldAdd}
          handleIconChange={this.handleIconChange}
          handleRemoveField={this.handleRemoveField}
          handleColorChange={this.handleColorChange}
          setSelectFieldValue={this.setSelectFieldValue}
          handleChangeTextField={this.handleChangeTextField}
          ref="classDialogContent"
        />
      ),
      step2: (
        <div className="vm-2-t">
          <Dialog.ContentSection
            title="Choose Data Class schema fields"
            style={styles.contentSection}
          >
            <div className="col-flex-1">
              <ClassSchemaTable
                expandedFields={expand}
                excludedFieldsNames={excluded_fields}
                handleExpandField={this.handleExpandField}
                handleClickRowCheckbox={this.handleExcludeSchemaFields}
                class={createdClass || ClassesStore.getClassByName(this.state.class)}
              />
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection
            title="Configure the response"
            style={styles.contentSection}
          >
            <div className="col-flex-1">
              <TextField
                ref="page_size"
                name="page_size"
                fullWidth={true}
                value={this.state.page_size}
                onChange={this.handlePageSizeChange}
                errorText={this.getValidationMessages('page_size').join(' ')}
                hintText="Records number"
                floatingLabelText="Records number"
              />
            </div>
            <div className="col-flex-1">
              {this.renderOptions()}
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection
            title="Query"
            last={true}
            style={styles.contentSection}
          >
            <div className="col-flex-1">
              <Editor
                mode="json"
                height="200px"
                onChange={this.handleQueryChange}
                onFocus={disableBindShortcuts}
                onBlur={enableBindShortcuts}
                value={JSON.stringify(query, null, '\t')}
              />
              <Show if={this.getValidationMessages('query').length}>
                <div className="vm-2-t">
                  <Notification type="error">
                    {this.getValidationMessages('query').join(' ')}
                  </Notification>
                </div>
              </Show>
            </div>
          </Dialog.ContentSection>
        </div>
      ),
      step3: (
        <Loading show={isLoading || !createdDataEndpoint}>
          <DataEndpointSummary
            hasEditMode={this.hasEditMode()}
            item={createdDataEndpoint}
          />
        </Loading>
      )
    };

    return stepsMap[`step${stepIndex}`];
  },

  renderStepTitle(stepIndex) {
    const actionText = this.hasEditMode() ? 'edited' : 'created';
    const stepTitleMap = {
      step0: this.hasEditMode() ? 'Edit a Data Endpoint' : 'Name a Data Endpoint & choose a Data Class',
      step1: 'Create a Data Class',
      step2: 'Configure a Data Endpoint',
      step3: (
        <div className="row align-middle">
          <FontIcon
            style={{ fontSize: 32, paddingTop: 4, paddingRight: 8 }}
            color={Colors.green400}
            className="synicon-socket-data"
          />
          <div>
            {`You've just ${actionText} a Data Endpoint!`}
          </div>
        </div>
      )
    };

    return stepTitleMap[`step${stepIndex}`];
  },

  renderActionButtons() {
    const { stepIndex, canSubmit } = this.state;
    const isLastStep = stepIndex === 3;

    if (isLastStep) {
      return (
        <RaisedButton
          data-e2e="data-endpoint-close-summary"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="data-endpoint-submit"
        data-e2e-cancel="data-endpoint-cancel"
        submitLabel={this.getActionButtonsConfig().submitLabel}
        cancelLabel={this.getActionButtonsConfig().cancelLabel}
        handleCancel={this.getActionButtonsConfig().handleCancel}
        handleConfirm={this.handleFormValidation}
        disabled={!canSubmit}
      />
    );
  },

  renderDialogTitle() {
    const { stepIndex } = this.state;

    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <span>Name a DataEndpoint & choose a Data Class</span>
          <span>Create a Data Class (optional)</span>
          <span>Configure a Data Endpoint</span>
          <span>Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle(stepIndex)}
        </div>
      </div>
    );
  },

  render() {
    const { hasBindShortcutsEnabled } = this.context;
    const { open, isLoading, stepIndex } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        open={open}
        isLoading={isLoading}
        bindShortcuts={hasBindShortcutsEnabled}
        onRequestClose={this.handleCancel}
        title={this.renderDialogTitle()}
        actions={this.renderActionButtons()}
        sidebar={this.renderSidebarContent(stepIndex)}
      >
        {this.renderFormNotifications()}
        {this.renderStepContent(stepIndex)}
      </Dialog.FullPage>
    );
  }
});

DataEndpointDialog.contextTypes = {
  hasBindShortcutsEnabled: PropTypes.bool,
  enableBindShortcuts: PropTypes.func,
  disableBindShortcuts: PropTypes.func
};

export default DialogBindShortcutsHOC(DataEndpointDialog);
