import React from 'react';
import Reflux from 'reflux';

// Utils
import { FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './DataObjectsActions';
import Store from './DataObjectsStore';

// Components
import { IconButton, TextField } from 'material-ui';


const DataObjectSearchDropdown = React.createClass({
  displayName: 'DataObjectSearchDropdown',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    dataObjectId: {
      presence: true,
      numericality: true
    }
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        alignItems: 'center',
        height: '80px'
      },
      searchButton: {
        boxShadow: 'none',
        marginLeft: '8px'
      },
      textField: {
        width: '140px',
        fontSize: '14px'
      },
      textFieldError: {
        fontSize: '10px',
        bottom: '10px'
      },
      textFieldUnderline: {
        bottom: '12px'
      },
      iconButton: {
        marginTop: '2px'
      }
    };
  },

  handleSuccessfullValidation(event) {
    const id = this.state.dataObjectId;
    const { className } = this.state.classObj;

    Actions.getDataObject({ id, className });
    this.togglePopover(event, false);
  },

  togglePopover(event, isOpen) {
    this.setState({
      open: isOpen,
      anchorEl: event ? event.currentTarget : null,
      errors: {}
    });
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <form
          onSubmit={this.handleFormValidation}
          acceptCharset="UTF-8"
          method="post"
        >
          <div style={styles.container}>
            <TextField
              ref="searchDataObject"
              name="search-data-object"
              hintText="Type Data Object ID"
              autoFocus={true}
              style={styles.textField}
              errorStyle={styles.textFieldError}
              underlineStyle={styles.textFieldUnderline}
              onChange={(event, value) => this.setState({ dataObjectId: value })}
              errorText={this.getValidationMessages('dataObjectId').join(' ')}
            />
            <IconButton
              iconClassName={'synicon-magnify'}
              style={styles.iconButton}
              type="submit"
              tooltip={'Search for a Data Object'}
            />
          </div>
        </form>
      </div>
    );
  }
});

export default DataObjectSearchDropdown;
