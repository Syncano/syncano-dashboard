import React from 'react';
import { FormMixin } from '../../mixins';
import DataObjectsActions from './DataObjectsActions';
import { IconButton, TextField } from 'material-ui';

const DataObjectSearchForm = React.createClass({
  mixins: [FormMixin],

  validatorConstraints: {
    dataObjectID: {
      presence: true,
      numericality: {
        message: '^Data Object ID is not a number'
      }
    }
  },

  getInitialState() {
    return {
      dataObjectID: null
    };
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        alignItems: 'center',
        height: '80px'
      },
      textField: {
        width: 160
      },
      textFieldError: {
        fontSize: 10,
        bottom: 10
      },
      textFieldUnderline: {
        bottom: 10
      },
      iconButton: {
        marginTop: 2
      }
    };
  },

  handleSuccessfullValidation() {
    const id = this.state.dataObjectID;
    const { className } = this.props.classObj;

    DataObjectsActions.getDataObject({ id, className });
    this.clearTextField();
  },

  handleTextFieldChange(event, value) {
    this.setState({ dataObjectID: value });
  },

  clearTextField() {
    this.setState({ dataObjectID: '' });
  },

  render() {
    const styles = this.getStyles();
    const { dataObjectID } = this.state;

    return (
      <div>
        <form
          method="post"
          acceptCharset="UTF-8"
          onSubmit={this.handleFormValidation}
        >
          <div style={styles.container}>
            <TextField
              name="search-data-object"
              autoFocus={true}
              hintText="Type Data Object ID"
              errorText={this.getValidationMessages('dataObjectID').join(' ')}
              style={styles.textField}
              errorStyle={styles.textFieldError}
              underlineStyle={styles.textFieldUnderline}
              value={dataObjectID}
              onChange={this.handleTextFieldChange}
            />
            <IconButton
              type="submit"
              tooltip="Search for a Data Object"
              iconClassName="synicon-magnify"
              style={styles.iconButton}
            />
          </div>
        </form>
      </div>
    );
  }
});

export default DataObjectSearchForm;
