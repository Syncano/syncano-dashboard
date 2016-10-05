import _ from 'lodash';
import shortid from 'shortid';
import { Color, Icon } from '../../common';
import SampleSchemas from './SampleSchemas';

export default {
  componentWillUpdate(nextProps, nextState) {
    let { classData } = nextState;

    if (nextState.classData && !nextState.classData.schemaInitialized && nextState.classData.schema) {
      const fields = this.setFields(nextState.classData.schema);

      classData.schemaInitialized = true;
      classData.fields = fields;

      this.setState({ classData });
    }

    const willDialogShow = !this.state._dialogVisible && nextState._dialogVisible;
    const editMode = nextState._dialogMode === 'edit';
    const emptyMetadataState = !nextState.classData || !nextState.classData.metadata;
    const emptyMetadataProps = !nextProps.classData || !nextProps.classData.metadata;

    const shouldGetRandomIcon = willDialogShow && !editMode && emptyMetadataState && emptyMetadataProps;

    if (shouldGetRandomIcon) {
      const metadata = {
        color: Color.getRandomColorName(),
        icon: Icon.Store.getRandomIconPickerIcon()
      };

      classData = _.merge(classData, { metadata });

      this.setState({ classData });
    }
  },

  setFields(schema) {
    const { fields, schemaInitialized } = this.state.classData;

    if (schemaInitialized) fields.length = 0;
    _.map(schema, (item) => {
      fields.push({
        key: shortid.generate(),
        fieldName: item.name,
        fieldType: item.type,
        fieldTarget: item.target,
        fieldOrder: item.order_index,
        fieldFilter: item.filter_index
      });
    });

    return fields;
  },

  handleIconChange(icon) {
    let { classData } = this.state;
    const metadata = _.merge({}, classData.metadata, { icon });

    classData = _.merge(classData, { metadata });

    this.setState({ classData });
  },

  handleColorChange(color) {
    let { classData } = this.state;
    const metadata = _.merge({}, classData.metadata, { color });

    classData = _.merge(classData, { metadata });

    this.setState({ classData });
  },

  handleFieldAdd() {
    const { classData } = this.state;
    const { fields, fieldName, fieldType = 'string', fieldTarget, fieldOrder, fieldFilter } = classData;

    if (_.includes(_.map(fields, 'fieldName'), fieldName)) {
      return this.setState({
        errors: {
          fieldName: ['Field with this name already exists.']
        }
      });
    }

    if (!fieldName) {
      return null;
    }

    const classFields = fields;

    const field = {
      key: shortid.generate(),
      fieldName,
      fieldType,
      fieldOrder,
      fieldFilter
    };

    if (fieldType === 'reference' || fieldType === 'relation') {
      field.fieldTarget = fieldTarget;
    }

    classFields.push(field);

    return this.setState({
      errors: {
        fieldName: []
      },
      classData: _.merge(classData, {
        fields: classFields,
        fieldName: '',
        fieldOrder: false,
        fieldFilter: false,
        fieldType,
        fieldTarget: 'self'
      })
    });
  },

  handleRemoveField(item) {
    const { classData } = this.state;
    const { fields } = classData;
    const fieldsLeft = _.filter(fields, (field) => field.fieldName !== item.fieldName);

    classData.fields = fieldsLeft;

    this.setState({ classData });
  },

  handleOnCheck(item, isChecked, type) {
    const { classData } = this.state;
    const { fields } = classData;

    if (_.some(fields, item)) {
      const newFields = _.map(fields, (field) => {
        if (field.fieldName === item.fieldName) {
          field[`field${_.upperFirst(type)}`] = isChecked;
        }
        return field;
      });

      this.setState({ classData: _.merge(classData, { fields: newFields }) });
    } else {
      item[`field${_.upperFirst(type)}`] = isChecked;
      this.setState({ classData: _.merge(classData, { [`field${_.upperFirst(type)}`]: isChecked }) });
    }
  },

  handleChangeTextField(key, value) {
    const { classData } = this.state;

    _.set(classData, key, value);

    this.setState({ classData });
  },

  handleSampleSchema({ item }) {
    const sampleSchema = SampleSchemas[item.name];

    if (!sampleSchema) {
      return;
    }

    const classData = { ...sampleSchema, schemaInitialized: false };

    this.setState({ item, classData });
  }
};
