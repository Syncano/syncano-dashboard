import React from 'react';
import _ from 'lodash';

import { FormMixin } from '../../mixins';
import Constants from '../../constants/Constants';
import SampleSchemas from './SampleSchemas';

import ClassesStore from './ClassesStore';

import {
  Checkbox,
  FlatButton,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Tabs,
  TextField
} from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { AutoCompleteWrapper, ColorIconPicker, Dialog, Notification, SelectFieldWrapper, Show } from '../../common/';
import { GroupsActions, GroupsDropdown } from '../Groups';

const ClassDialogContent = React.createClass({
  mixins: [
    FormMixin
  ],

  componentDidMount() {
    GroupsActions.fetch();
  },

  getStyles() {
    return {
      schemaContentSection: {
        alignItems: 'stretch',
        marginTop: '24px'
      },
      checkBox: {
        alignSelf: 'center'
      },
      tab: {
        color: Colors.blue400,
        fontSize: 13,
        lineHeight: '18px',
        fontWeight: 800
      },
      inkBarStyle: {
        background: Colors.blue400
      },
      contentContainerStyle: {
        padding: '0 8px 0 8px'
      },
      tabItemContainerStyle: {
        background: 'transparent',
        borderBottom: '1px solid #b8c0c9'
      },
      tableRow: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'none'
      },
      tableRowColumn: {
        fontSize: 16,
        display: 'flex',
        alignItems: 'center'
      },
      tableRowColumnButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      tableHeaderColumn: {
        display: 'flex'
      },
      tableHeaderRow: {
        display: 'flex',
        justifyContent: 'center',
        height: '30px',
        borderBottom: 'none'
      },
      tableHeaderColumnButton: {
        display: 'flex',
        justifyContent: 'center'
      },
      underlineStyle: {
        borderColor: Colors.blue400
      },
      removeButtonLabel: {
        webkitHyphens: 'none'
      },
      itemStyles: {
        innerDiv: {
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      permissionsContentSection: {
        paddingBottom: 20
      }
    };
  },

  getErrors(key) {
    const { errors } = this.props;

    return _.get(errors, key) || [];
  },

  getFieldTypes() {
    return _.map(Constants.fieldTypes, (item) => ({
      payload: item.text,
      text: item.text,
      desc: item.desc
    }));
  },

  getFields() {
    const { fields } = this.props;

    return fields;
  },

  getFieldTargetOptions() {
    const options = ClassesStore.getClassesDropdown(true);

    return _.filter(options, (option) => option.payload !== this.props.className);
  },

  getSchema() {
    const { fields } = this.props;
    const lastField = this.getLastSchemaField();

    const schema = _.map(fields, (item) => {
      const field = {
        name: item.fieldName,
        type: item.fieldType,
        target: item.fieldTarget
      };

      if (item.fieldOrder) {
        field.order_index = item.fieldOrder;
      }

      if (item.fieldFilter) {
        field.filter_index = item.fieldFilter;
      }
      return field;
    });

    lastField && schema.push(lastField);
    return schema;
  },

  getLastSchemaField() {
    const { fieldName, fieldType = 'string', fieldTarget, fieldOrder, fieldFilter } = this.props;
    const hasTargetField = this.hasTargetField(fieldType);

    if (fieldName) {
      const lastField = {
        name: fieldName,
        type: fieldType
      };

      if (hasTargetField) {
        lastField.target = fieldTarget;
      }

      if (fieldOrder) {
        lastField.order_index = fieldOrder;
      }

      if (fieldFilter) {
        lastField.filter_index = fieldFilter;
      }
      return lastField;
    }

    return null;
  },

  getClassParams() {
    const { metadata, name, description, group, group_permissions, other_permissions } = this.props;
    const schema = this.getSchema();

    return {
      name,
      description,
      group: group !== 'none' ? group : null,
      group_permissions,
      other_permissions,
      schema,
      metadata
    };
  },

  hasIndex(indexType, fieldType) {
    if (indexType === 'filter') {
      return this.hasFilter(fieldType);
    }

    return this.hasOrder(fieldType);
  },

  hasFilter(fieldType) {
    const noFilterFields = ['file', 'text', 'object'];

    return !_.includes(noFilterFields, fieldType);
  },

  hasOrder(fieldType) {
    const noOrderFields = ['file', 'text', 'array', 'object', 'geopoint', 'relation'];

    return !_.includes(noOrderFields, fieldType);
  },

  hasTargetField(fieldType) {
    return fieldType === 'reference' || fieldType === 'relation';
  },

  handleEditTypeField(stateKey, index, value) {
    const { setSelectFieldValue, fields } = this.props;
    const { fieldName, fieldTarget, fieldOrder, fieldFilter, key } = fields[index];
    let valueObject = {
      fieldType: value,
      fieldName,
      key,
      fieldTarget: this.hasTargetField(value) && fieldTarget,
      fieldOrder: this.hasOrder(value) && fieldOrder,
      fieldFilter: this.hasFilter(value) && fieldFilter
    };

    valueObject = _.omitBy(valueObject, (val) => !val);

    setSelectFieldValue(stateKey, valueObject);
  },

  handleChangeClassData(key, value) {
    const { setSelectFieldValue } = this.props;

    setSelectFieldValue(`classData.${key}`, value);
  },

  handleChangeFieldName(event, value) {
    const { handleChangeTextField } = this.props;

    handleChangeTextField('fieldName', value);
  },

  handleChangeFieldType(event, index, value) {
    this.handleChangeClassData('fieldType', value);
  },

  handleChangeFieldTarget(event, index, value) {
    this.handleChangeClassData('fieldTarget', value);
  },

  handleChangeFieldGroup(event, index, value) {
    this.handleChangeClassData('group', value);
  },

  handleChangeFieldGroupPermissions(event, index, value) {
    this.handleChangeClassData('group_permissions', value);
  },

  handleChangeFieldOtherPermissions(event, index, value) {
    this.handleChangeClassData('other_permissions', value);
  },

  handleChangeClassName(value) {
    this.props.handleChangeTextField('name', value);
  },

  handleChangeDescription(event, value) {
    this.props.handleChangeTextField('description', value);
  },

  renderCheckbox(item, indexType) {
    const { handleOnCheck } = this.props;

    if (!this.hasIndex(indexType, item.fieldType)) {
      return this.renderDisabledCheckbox(item.fieldType, indexType);
    }

    return (
      <Checkbox
        ref={`checkbox${_.upperFirst(indexType)}${item.fieldName}`}
        name={indexType}
        data-e2e={`${indexType}-${item.fieldType}-checkbox-name`}
        defaultChecked={item[`field${_.upperFirst(indexType)}`]}
        onCheck={(event, isChecked) => handleOnCheck(item, isChecked, indexType)}
      />
    );
  },

  renderDisabledCheckbox(fieldType, indexType) {
    const message = {
      filter: 'filtering',
      order: 'sorting'
    };

    return (
      <IconButton
        tooltip={`${fieldType} doesn't support ${message[indexType]}`}
        iconClassName="synicon-close-box-outline"
        iconStyle={{ color: Colors.grey400, marginLeft: -24 }}
      />
    );
  },

  renderSchemaFieldRows() {
    const { fields, handleRemoveField, handleChangeTextField } = this.props;
    const styles = this.getStyles();

    const schemaFields = _.map(fields, (item, index) => (
      <TableRow
        key={item.key}
        style={styles.tableRow}
      >
        <TableRowColumn
          className="col-sm-8"
          style={styles.tableRowColumn}
        >
          <TextField
            name="fieldName"
            hintText="Field Name"
            fullWidth={true}
            value={item.fieldName}
            underlineStyle={!fields[index].fieldName && styles.underlineStyle}
            onChange={(event, value) => handleChangeTextField(`fields[${index}].fieldName`, value)}
          />
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-8"
          style={styles.tableRowColumn}
        >
          <SelectFieldWrapper
            name="fieldType"
            hintText="Field Type"
            floatingLabelText=""
            itemStyles={styles.itemStyles}
            maxHeight="100vh"
            options={this.getFieldTypes()}
            autoWidth={true}
            value={item.fieldType}
            underlineStyle={!fields[index].fieldType && styles.underlineStyle}
            onChange={(event, key, value) => this.handleEditTypeField(`classData.fields[${index}]`, index, value)}
          />
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-8"
          style={styles.tableRowColumn}
        >
          <Show if={this.hasTargetField(item.fieldType)}>
            <SelectFieldWrapper
              name="fieldTarget"
              floatingLabelText=""
              options={this.getFieldTargetOptions()}
              value={item.fieldTarget}
              underlineStyle={!fields[index].fieldTarget && styles.underlineStyle}
              onChange={(event, key, value) => this.handleChangeClassData(`fields[${index}].fieldTarget`, value)}
            />
          </Show>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(item, 'filter')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(item, 'order')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-5"
          style={styles.tableRowColumnButton}
        >
          <FlatButton
            label="Remove"
            labelStyle={styles.removeButtonLabel}
            secondary={true}
            onClick={() => handleRemoveField(item)}
          />
        </TableRowColumn>
      </TableRow>
    ));

    return schemaFields;
  },

  renderSchemaFieldNewRow() {
    const styles = this.getStyles();

    const {
      fieldType = 'string',
      fieldTarget,
      fieldName,
      fieldOrder,
      fieldFilter,
      handleFieldAdd
    } = this.props;

    const newFieldObj = {
      fieldOrder,
      fieldFilter,
      fieldType,
      fieldName
    };

    return (
      <TableRow
        key="newField"
        style={styles.tableRow}
      >
        <TableRowColumn
          className="col-sm-8"
          style={{ overflow: 'visible' }}
        >
          <TextField
            ref="fieldName"
            name="fieldName"
            data-e2e={`${fieldName || 'new'}-class-field-name`}
            hintText="Field Name"
            fullWidth={true}
            value={newFieldObj.fieldName}
            underlineStyle={!fieldName && styles.underlineStyle}
            onChange={this.handleChangeFieldName}
            errorText={this.getErrors('fieldName').join(' ')}
          />
        </TableRowColumn>
        <TableRowColumn className="col-sm-8">
          <SelectFieldWrapper
            name="fieldType"
            hintText="Field Type"
            floatingLabelText=""
            itemStyles={styles.itemStyles}
            maxHeight="100vh"
            options={this.getFieldTypes()}
            value={newFieldObj.fieldType}
            autoWidth={true}
            underlineStyle={!fieldType && styles.underlineStyle}
            onChange={this.handleChangeFieldType}
            errorText={this.getErrors('fieldType').join(' ')}
          />
        </TableRowColumn>
        <TableRowColumn className="col-sm-8">
          <Show if={fieldType === 'reference' || fieldType === 'relation'}>
            <SelectFieldWrapper
              name="fieldTarget"
              floatingLabelText=""
              options={this.getFieldTargetOptions()}
              value={fieldTarget}
              autoWidth={true}
              underlineStyle={!fieldTarget && styles.underlineStyle}
              onChange={this.handleChangeFieldTarget}
              errorText={this.getErrors('fieldTarget').join(' ')}
            />
          </Show>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(newFieldObj, 'filter')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-3"
          style={styles.tableRowColumn}
        >
          <div style={styles.checkBox}>
            {this.renderCheckbox(newFieldObj, 'order')}
          </div>
        </TableRowColumn>
        <TableRowColumn
          className="col-sm-5"
          style={styles.tableRowColumnButton}
        >
          <FlatButton
            data-e2e="class-add-field-button"
            label="Add"
            secondary={true}
            disabled={!fieldType || !fieldName}
            onClick={handleFieldAdd}
          />
        </TableRowColumn>
      </TableRow>
    );
  },

  render() {
    const {
      name,
      group,
      metadata,
      description,
      hasEditMode,
      handleIconChange,
      handleColorChange,
      handleSampleSchema
    } = this.props;

    const styles = this.getStyles();

    return (
      <div>
        <Tabs
          inkBarStyle={styles.inkBarStyle}
          contentContainerStyle={styles.contentContainerStyle}
          tabItemContainerStyle={styles.tabItemContainerStyle}
        >
          <Tab
            label="General"
            style={styles.tab}
          >
            <Dialog.ContentSection>
              <div style={{ padding: '20px 0', width: '100%' }}>
                <AutoCompleteWrapper
                  name="class"
                  hintText="Start typing to see example classes list or type a new Data Class name"
                  items={{ sampleData: SampleSchemas }}
                  searchText={name}
                  onNewRequest={handleSampleSchema}
                  onUpdateInput={this.handleChangeClassName}
                  disabled={hasEditMode}
                  errorText={_.union(this.getErrors('name')).join(' ')}
                />
                <TextField
                  ref="description"
                  name="description"
                  fullWidth={true}
                  value={description}
                  onChange={this.handleChangeDescription}
                  errorText={this.getErrors('description').join(' ')}
                  hintText="Data Class description"
                  floatingLabelText="Description (optional)"
                />
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection
              title="Permissions"
              style={styles.permissionsContentSection}
            >
              <div className="col-flex-3">
                <GroupsDropdown
                  value={group}
                  onChange={this.handleChangeFieldGroup}
                  errorText={this.getErrors('group').join(' ')}
                />
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection
              title="Schema"
              style={styles.schemaContentSection}
            >
              <div>
                <div className="vm-2-b">
                  <Show if={hasEditMode}>
                    <Notification type="warning">
                      Be careful! Editing an existing schema fields will remove their values from all
                       Data Objects.
                    </Notification>
                  </Show>
                </div>
                <Show if={this.getErrors('schema').length}>
                  <div className="vm-3-b">
                    <Notification type="error">
                      {this.getErrors('schema').join(' ')}
                    </Notification>
                  </div>
                </Show>
                <div className="col-flex-1">
                  <Table
                    selectable={false}
                    bodyStyle={{ overflow: 'visible' }}
                    wrapperStyle={{ overflow: 'visible' }}
                  >
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                    >
                      <TableRow style={styles.tableHeaderRow}>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumn}
                          className="col-sm-8"
                        >
                          Field Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumn}
                          className="col-sm-8"
                        >
                          Field Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumn}
                          className="col-sm-8"
                        >
                          Target Data Class
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumn}
                          className="col-sm-3"
                        >
                          Filter
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumn}
                          className="col-sm-3"
                        >
                          Order
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={styles.tableHeaderColumnButton}
                          className="col-sm-5"
                        >
                          Action
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {this.renderSchemaFieldRows()}
                      {this.renderSchemaFieldNewRow()}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Dialog.ContentSection>
          </Tab>
          <Tab
            label="Customize"
            style={styles.tab}
          >
            <div className="row align-middle vp-4-t vp-4-b">
              <div className="col-sm-11">
                <ColorIconPicker.Preview
                  color={metadata.color}
                  icon={metadata.icon}
                />
              </div>
              <div className="col-sm-12">
                <ColorIconPicker.IconPicker
                  selectedIcon={metadata.icon}
                  onIconChange={handleIconChange}
                />
              </div>
              <div className="col-sm-12">
                <ColorIconPicker.ColorPicker
                  selectedColor={metadata.color}
                  onColorChange={handleColorChange}
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

export default ClassDialogContent;
