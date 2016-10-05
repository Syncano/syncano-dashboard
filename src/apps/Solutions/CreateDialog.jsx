import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import Actions from './CreateDialogActions';
import Store from './CreateDialogStore';

// Components
import { TextField, Toggle } from 'material-ui';
import { Dialog } from '../../common/';

export default React.createClass({

  displayName: 'SolutionDialog',

  mixins: [
    Reflux.connect(Store),

    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleAddSubmit() {
    const { label, description, tags } = this.state;

    Actions.createSolution({ label, description, tags, public: this.state.public });
  },

  handleEditSubmit() {
    const { id, label, description, tags } = this.state;

    Actions.updateSolution(id, { label, description, tags, public: this.state.public });
  },

  handleTagsListChange(tagsString, tagsArray) {
    this.setState({
      tags: tagsArray.map((item) => item.value)
    });
  },

  handleToogle(event, status) {
    const state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} a Solution`}
        contentSize="medium"
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
      >
        <div>
          {this.renderFormNotifications()}
          <TextField
            ref="label"
            name="label"
            autoFocus={true}
            fullWidth={true}
            value={this.state.label}
            onChange={(event, value) => this.setState({ label: value })}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Solution's name"
            floatingLabelText="Name"
          />
          <TextField
            ref="description"
            name="description"
            fullWidth={true}
            value={this.state.description}
            onChange={(event, value) => this.setState({ description: value })}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Solution's description"
            floatingLabelText="Description (optional)"
            className="vm-4-b"
          />
          <Select
            value={this.state.tags}
            delimiter=","
            multi={true}
            allowCreate={true}
            placeholder="Select tags"
            options={Store.getTagsOptions()}
            onChange={this.handleTagsListChange}
            className="vm-3-b"
          />
          <Toggle
            ref="public"
            name="public"
            defaultToggled={this.state.public}
            onToggle={this.handleToogle}
            label="Make this solution public?"
          />
        </div>
      </Dialog.FullPage>
    );
  }
});
