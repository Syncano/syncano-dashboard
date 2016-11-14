import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { JSONUtil } from '../../utils';
import { DialogMixin, FormMixin } from '../../mixins';

import { TextField, Toggle, RaisedButton, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Editor, Loading, Notification, Show, Stepper } from '../../common/';
import { DialogBindShortcutsHOC } from '../../common/Dialog';
import APNSDeviceSummary from './APNSDevices/APNSDeviceSummary';
import GCMDeviceSummary from './GCMDevices/GCMDeviceSummary';

export default (type, Store, Actions, sidebar) => {
  const DeviceDialog = React.createClass({
    displayName: `${type}Dialog`,

    mixins: [
      Reflux.connect(Store),
      DialogMixin,
      FormMixin
    ],

    validatorConstraints() {
      return {
        label: {
          presence: true,
          length: {
            maximum: 64
          }
        },
        registration_id: {
          presence: true
        },
        metadata: (value) => {
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
    },

    getStyles() {
      return {
        fontIcon: {
          fontSize: 32,
          padding: '4px 8px 0 8px'
        },
        toggleWrapper: {
          width: 100
        }
      };
    },

    getInitialState() {
      return {
        is_active: true
      };
    },

    getParsedMetadataParam(metadata) {
      if (!metadata) {
        return {};
      }

      if (_.isObject(metadata)) {
        return metadata;
      }

      return JSON.parse(metadata);
    },

    getParams() {
      const { label, registration_id, user, device_id, is_active, metadata } = this.state;
      const params = {
        label,
        registration_id,
        user,
        device_id,
        is_active,
        metadata: this.getParsedMetadataParam(metadata)
      };

      return this.removeEmptyKeys(params);
    },

    handleAddSubmit() {
      if (_.isFunction(Actions.createDevice)) {
        Actions.createDevice(this.getParams());
      }
    },

    handleEditSubmit() {
      if (_.isFunction(Actions.updateDevice)) {
        const { registration_id } = this.state;

        Actions.updateDevice(registration_id, this.getParams());
      }
    },

    handleToggleSwitch(event, value) {
      return this.setState({ is_active: value });
    },

    handleChangeLabel(event, value) {
      return this.setState({ label: value });
    },

    handleChangeRegistrationId(event, value) {
      return this.setState({ registration_id: value });
    },

    handleChangeUser(event, value) {
      return this.setState({ user: value });
    },

    handleChangeDeviceId(event, value) {
      return this.setState({ device_id: value });
    },

    handleMetadataChange(value) {
      return this.setState({ metadata: value });
    },

    removeEmptyKeys(params) {
      return _.omit(params, _.isEmpty);
    },

    renderToggle() {
      const { is_active } = this.state;
      const styles = this.getStyles();

      return (
        <div style={styles.toggleWrapper}>
          <Toggle
            ref="is_active"
            key="is_active"
            defaultToggled={is_active}
            onToggle={this.handleToggleSwitch}
            label="Active"
          />
        </div>
      );
    },

    renderStepContent() {
      const { enableBindShortcuts, disableBindShortcuts } = this.context;
      const { createdDevice, stepIndex, metadata, isLoading, label, registration_id, device_id } = this.state;
      const content = {
        step0: (
          <div>
            <div className="vm-2-t">
              {this.renderToggle()}
            </div>
            <TextField
              ref="label"
              name="label"
              autoFocus={true}
              value={label}
              onChange={this.handleChangeLabel}
              fullWidth={true}
              errorText={this.getValidationMessages('label').join(' ')}
              floatingLabelText="Label of the Device"
            />
            <TextField
              ref="registration_id"
              name="registration_id"
              disabled={this.hasEditMode()}
              value={registration_id}
              onChange={this.handleChangeRegistrationId}
              fullWidth={true}
              errorText={this.getValidationMessages('registration_id').join(' ')}
              floatingLabelText="Device's registration ID"
            />
            <TextField
              ref="user"
              name="user"
              value={this.state.user}
              onChange={this.handleChangeUser}
              fullWidth={true}
              errorText={this.getValidationMessages('user').join(' ')}
              floatingLabelText="User ID"
            />
            <TextField
              className="vm-4-b"
              ref="device_id"
              name="device_id"
              value={device_id}
              onChange={this.handleChangeDeviceId}
              fullWidth={true}
              errorText={this.getValidationMessages('device_id').join(' ')}
              floatingLabelText="Device ID"
            />
            <Dialog.ContentSection
              title="Metadata"
              last={true}
            >
              <div className="col-flex-1 vm-2-t">
                <Editor
                  mode="json"
                  height="200px"
                  onChange={this.handleMetadataChange}
                  onFocus={disableBindShortcuts}
                  onBlur={enableBindShortcuts}
                  value={JSON.stringify(metadata, null, '\t')}
                />
                <Show if={this.getValidationMessages('metadata').length}>
                  <div className="vm-2-t">
                    <Notification type="error">
                      {this.getValidationMessages('metadata').join(' ')}
                    </Notification>
                  </div>
                </Show>
              </div>
            </Dialog.ContentSection>
          </div>
        ),
        step1: (
          <Loading show={isLoading || !createdDevice}>
            {type === 'APNS' ?
              <APNSDeviceSummary
                hasEditMode={this.hasEditMode()}
                item={createdDevice}
              /> :
              <GCMDeviceSummary
                hasEditMode={this.hasEditMode()}
                item={createdDevice}
              />
            }
          </Loading>
        )
      }[`step${stepIndex}`];

      return content;
    },

    renderStepTitle(stepIndex) {
      const actionText = this.hasEditMode() ? 'edited' : 'created';
      const styles = this.getStyles();
      const stepTitle = {
        step0: this.hasEditMode() ? `Edit a ${type} Device` : `Add a ${type} Device`,
        step1: (
          <div className="row align-middle">
            <FontIcon
              style={styles.fontIcon}
              color={Colors.blue500}
              className={`synicon-${type === 'APNS' ? 'apple' : 'android'}`}
            />
            <div>
              {`You've just ${actionText} a ${type} Device!`}
            </div>
          </div>
        )
      }[`step${stepIndex}`];

      return stepTitle;
    },

    renderDialogTitle() {
      const { stepIndex, isFinished } = this.state;
      const title = this.hasEditMode() ? 'Edit' : 'Add';

      return (
        <div data-e2e={isFinished ? `${_.toLower(type)}-dialog-summary-title` : `${_.toLower(type)}-dialog-title`}>
          <Stepper activeStep={stepIndex}>
            <span>{title} a {type} Device</span>
            <span>Summary</span>
          </Stepper>
          <div className="vm-3-t">
            {this.renderStepTitle(stepIndex)}
          </div>
        </div>
      );
    },

    renderActionButtons() {
      const { canSubmit, isFinished } = this.state;

      if (isFinished) {
        return (
          <RaisedButton
            label="Close"
            primary={true}
            onTouchTap={this.handleCancel}
            data-e2e={`${_.toLower(type)}-summary-dialog-close-button`}
          />
        );
      }

      return (
        <Dialog.StandardButtons
          disabled={!canSubmit}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleFormValidation}
          data-e2e-submit={`${_.toLower(type)}-dialog-confirm-button`}
        />
      );
    },

    render() {
      const { hasBindShortcutsEnabled } = this.context;
      const { open, isLoading, stepIndex, isFinished } = this.state;

      return (
        <Dialog.FullPage
          key="dialog"
          ref="dialog"
          bindShortcuts={hasBindShortcutsEnabled}
          title={this.renderDialogTitle()}
          onRequestClose={this.handleCancel}
          open={open}
          isLoading={isLoading}
          actions={this.renderActionButtons()}
          sidebar={!isFinished && sidebar}
        >
          {this.renderFormNotifications()}
          {this.renderStepContent(stepIndex)}
        </Dialog.FullPage>
      );
    }
  });

  DeviceDialog.contextTypes = {
    hasBindShortcutsEnabled: PropTypes.bool,
    enableBindShortcuts: PropTypes.func,
    disableBindShortcuts: PropTypes.func
  };

  return DialogBindShortcutsHOC(DeviceDialog);
};
