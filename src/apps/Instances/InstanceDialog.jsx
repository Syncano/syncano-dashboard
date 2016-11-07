import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';

import { DialogMixin, DialogsMixin, FormMixin } from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import { TextField, FlatButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import {
  Color,
  Dialog,
  Icon,
  Notification,
  ColorIconPicker,
  Show,
  Loading,
  SelectFieldWrapper
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
      Actions.fetchAllFullBackups();
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
      backupListItem: {
        fontSize: 11,
        color: '#AAA',
        fontWeight: 800,
        height: 15
      },
      restoreFromFileListItem: {
        paddingTop: 8,
        paddingBottom: 8
      },
      notificationWrapper: {
        width: '100%'
      }
    };
  },

  handleAddSubmit() {
    const { name, description, metadata, selectedBackup } = this.state;

    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
    }

    if (selectedBackup !== 'null') {
      return Actions.createInstanceFromBackup({ name, description, metadata }, selectedBackup);
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

  handleChangeBackup(event, index, value) {
    this.setState({
      selectedBackup: value
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

  renderDropDownItems() {
    const { fullBackups } = this.state;
    let dropdownItems = [];
    const emptyItem = {
      value: 'None',
      text: 'None',
      payload: 'null'
    };

    if (!fullBackups.length) {
      return [emptyItem];
    }

    if (fullBackups.length) {
      dropdownItems = _.filter(_.sortBy(fullBackups, 'instance'), { status: 'success' })
        .map((backup) => {
          const createdAt = moment().format('Do MM YYYY, HH:mm', backup.created_at);

          return {
            payload: backup.id,
            desc: `Created at: ${createdAt}`,
            text: backup.label
          };
        });
    }

    dropdownItems.unshift(emptyItem);

    return dropdownItems;
  },

  renderContent() {
    const {
      name,
      notificationShowed,
      description,
      selectedBackup
    } = this.state;
    const styles = this.getStyles();

    return (
      <div>
        {DialogsMixin.getDialogs(this.initDialogs())}
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <Show if={this.getValidationMessages('detail').length}>
            <div
              className="vm-2-t"
              style={styles.notificationWrapper}
            >
              <Notification type="error">
                {this.getValidationMessages('detail').join(' ')}
              </Notification>
            </div>
          </Show>
        </Dialog.ContentSection>
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus={!this.hasEditMode() && true}
            fullWidth={true}
            value={name}
            onChange={this.handleNameChange}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Instance's name"
            onFocus={this.handleInstanceNameFieldFocus}
            floatingLabelText="Name"
          />
          {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
          <TextField
            ref="description"
            name="description"
            fullWidth={true}
            multiLine={true}
            value={description}
            onChange={this.handleDescriptionChange}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Instance's description"
            floatingLabelText="Description (optional)"
          />
        </Dialog.ContentSection>
        <Show if={!this.hasEditMode()}>
          <Dialog.ContentSection
            className="vp-3-t"
          >
            <SelectFieldWrapper
              name="backup"
              floatingLabelText="Restore Instance from backup"
              value={selectedBackup}
              options={this.renderDropDownItems()}
              onChange={this.handleChangeBackup}
            />
          </Dialog.ContentSection>
        </Show>
      </div>
    );
  },

  renderLoading() {
    return (
      <div>
        <div
          className="vm-3-b"
          style={{ textAlign: 'center' }}
        >
          {'We\'re restoring your backup, please wait...'}
        </div>
        <Loading show={true} />
      </div>
    );
  },

  render() {
    const {
      open,
      metadata,
      isLoading,
      canSubmit,
      isRestoring
    } = this.state;
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={!isRestoring && `${title} an Instance`}
        open={open}
        isLoading={isLoading}
        onRequestClose={this.handleCancel}
        onConfirm={this.handleFormValidation}
        showCloseButton={!isRestoring}
        actions={!isRestoring &&
          <div>
            {this.hasEditMode() &&
              <FlatButton
                style={{ float: 'left' }}
                labelStyle={{ color: Colors.red400 }}
                label="DELETE AN INSTANCE"
                onTouchTap={this.handleDeleteInstance}
              />
            }
            <Dialog.StandardButtons
              disabled={!canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}
            />
          </div>
        }
        sidebar={!isRestoring && [
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Instance gathers all the data associated with a project into a&nbsp;shared space. It can be an equivalent
              of an app or a&nbsp;piece of functionality.
            </Dialog.SidebarSection>
            <Show if={!this.hasEditMode()}>
              <Dialog.SidebarSection title="Restore from Backup">
                When adding a new instance, you can restore it from an existing backup. Use the dropdown menu to do
                a&nbsp;restore from a backup that is available within your account.
              </Dialog.SidebarSection>
              <Dialog.SidebarSection last={true}>
                <Dialog.SidebarLink to="http://docs.syncano.io/docs/restore-from-full-backup/">
                  Learn more
                </Dialog.SidebarLink>
              </Dialog.SidebarSection>
            </Show>
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
        {!isRestoring ? this.renderContent() : this.renderLoading()}
      </Dialog.FullPage>
    );
  }
});

export default InstanceDialog;
