import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { DialogMixin, DialogsMixin, FormMixin } from '../../mixins';

import Store from './InstanceDialogStore';
import Actions from './InstanceDialogActions';
import InstancesStore from './InstancesStore';

import { TextField, FlatButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import {
  Color,
  Dialog,
  Icon,
  Notification,
  ColorIconPicker,
  Show
  } from '../../common/';

const InstanceDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    },
    description: {
      length: {
        maximum: 256
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible && nextState._dialogMode !== 'edit') {
      this.setState({
        name: Store.genUniqueName(),
        metadata: {
          color: Color.getRandomColorName(),
          icon: Icon.Store.getRandomIconPickerIcon()
        }
      });
    }
  },

  getStyles() {
    return {
      dropdownHeaderItem: {
        paddingTop: 6,
        paddingBottom: 6,
        borderBottom: '1px solid #DDD',
        borderTop: '1px solid #DDD'
      },
      restoreFromFileListItem: {
        paddingTop: 8,
        paddingBottom: 8
      }
    };
  },

  handleAddSubmit() {
    const { name, description, metadata } = this.state;

    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
    }

    return Actions.createInstance({ name, description, metadata });
  },

  handleEditSubmit() {
    const { name, initialName, description, metadata } = this.state;

    if (initialName && initialName !== name) {
      return Actions.renameAndUpdateInstance(initialName, name, { description, metadata });
    }

    return Actions.updateInstance(name, { description, metadata });
  },

  handleColorChange(color) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { color }) });
  },

  handleIconChange(icon) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { icon }) });
  },

  handleNameChange(event, value) {
    this.setState({ name: value });
  },

  handleDescriptionChange(event, value) {
    this.setState({ description: value });
  },

  handleDeleteInstance() {
    this.refs.deleteInstanceDialog.show();
  },

  handleInstanceNameFieldFocus() {
    const { name } = this.state;

    this.setState({
      notificationShowed: true,
      initialName: name
    });
  },

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteInstanceDialog',
        ref: 'deleteInstanceDialog',
        title: 'Delete an Instance',
        handleConfirm: Actions.removeInstances,
        items: [this.state],
        withConfirm: true,
        groupName: 'Instance',
        isLoading
      }
    }];
  },

  extendSubmit() {
    this.props.handleSubmit();
    this.stopListeningTo(Actions.createInstance.completed);
  },

  renderNotification() {
    return (
      <Notification type="warning">
        Do you want to change the name? It will affect all of your apps!
      </Notification>
    );
  },

  renderContent() {
    const {
      name,
      notificationShowed,
      description
    } = this.state;

    return (
      <div>
        {DialogsMixin.getDialogs(this.initDialogs())}
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <div className="col-flex-1">
            <Show if={this.getValidationMessages('detail').length}>
              <Notification
                type="error"
                className="vm-2-t"
              >
                {this.getValidationMessages('detail').join(' ')}
              </Notification>
            </Show>
            <TextField
              ref="name"
              name="name"
              autoFocus={!this.hasEditMode() && true}
              fullWidth={true}
              value={name}
              onChange={this.handleNameChange}
              errorText={this.getValidationMessages('name').join(' ')}
              onFocus={this.handleInstanceNameFieldFocus}
              floatingLabelText="Name"
            />
            {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              multiLine={true}
              defaultValue={description}
              onChange={this.handleDescriptionChange}
              errorText={this.getValidationMessages('description').join(' ')}
              floatingLabelText="Description (optional)"
            />
          </div>
        </Dialog.ContentSection>
      </div>
    );
  },

  renderDeleteInstanceButton() {
    if (this.hasEditMode() && InstancesStore.amIOwner(this.state)) {
      return (
        <FlatButton
          style={{ float: 'left' }}
          labelStyle={{ color: Colors.red400 }}
          label="Delete an Instance"
          onTouchTap={this.handleDeleteInstance}
        />
      );
    }

    return null;
  },

  render() {
    const {
      open,
      metadata,
      isLoading,
      canSubmit
    } = this.state;
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an Instance`}
        open={open}
        isLoading={isLoading}
        onRequestClose={this.handleCancel}
        onConfirm={this.handleFormValidation}
        showCloseButton={true}
        actions={
          <div>
            {this.renderDeleteInstanceButton()}
            <Dialog.StandardButtons
              disabled={!canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}
            />
          </div>
        }
        sidebar={[
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Instance gathers all the data associated with a project into a&nbsp;shared space. It can be an equivalent
              of an app or a&nbsp;piece of functionality.
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>,
          <ColorIconPicker
            key="coloriconpicker"
            icon={metadata.icon}
            color={metadata.color}
            onIconChange={this.handleIconChange}
            onColorChange={this.handleColorChange}
          />
        ]}
      >
        {this.renderContent()}
      </Dialog.FullPage>
    );
  }
});

export default InstanceDialog;
