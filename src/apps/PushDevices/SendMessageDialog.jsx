import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Isvg from 'react-inlinesvg';

import { DialogMixin, FormMixin } from '../../mixins';

import { TextField, Toggle, SelectField, MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Show, Truncate, Dialog, Editor, Notification, Stepper } from '../../common/';
import DevicesTable from './DevicesTable';
import ConfirmSending from './ConfirmSending';

export default (store, props) => Radium(React.createClass({
  displayName: `${store.getConfig().type}SendMessageDialog`,

  mixins: [
    Reflux.connect(store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const { checkedDevicesIds } = this.state;
    const devicesCount = checkedDevicesIds.length.toString();

    return {
      confirmationText: {
        presence: true,
        inclusion: {
          within: [devicesCount],
          message: `^Type ${devicesCount} to confirm.`
        }
      }
    };
  },

  getInitialState() {
    return {
      confirmationText: '',
      checkedDevicesIds: [],
      isJSONMessage: false,
      JSONMessage: '',
      appName: 'App name',
      content: 'Your push message text would go here.',
      environment: 'development',
      finished: false,
      stepIndex: 0
    };
  },

  getStyles() {
    return {
      certificateMenuItem: {
        cursor: 'pointer'
      },
      sendDialogHeaderContainer: {
        borderRadius: '4px',
        borderTop: `1px solid ${Colors.grey200}`,
        borderRight: `1px solid ${Colors.grey200}`,
        borderLeft: `1px solid ${Colors.grey200}`,
        color: Colors.grey400
      },
      greyBoxContainer: {
        borderBottom: `1px solid ${Colors.grey200}`,
        backgroundColor: Colors.grey100
      },
      sendDialogHeader: {
        margin: 0,
        borderBottom: `1px solid ${Colors.grey200}`,
        padding: '8px 6px',
        fontSize: 12
      },
      sendDialogHeaderItem: {
        fontWeight: 600,
        margin: 0,
        backgroundColor: Colors.grey50,
        borderBottom: `1px solid ${Colors.grey200}`,
        padding: '8px 6px',
        fontSize: 12
      },
      sendDialogHeaderEvenItem: {
        backgroundColor: Colors.grey100
      },
      seeMoreVisible: {
        color: Colors.blue500,
        visibility: 'visible',
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      seeMoreHidden: {
        visibility: 'hidden'
      },
      phoneContainer: {
        position: 'relative',
        lineHeight: '12px'
      },
      messagePreview: {
        backgroundColor: Colors.grey50,
        color: Colors.grey400,
        border: `1px solid ${Colors.grey200}`,
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 10,
        borderRadius: '2px',
        position: 'absolute',
        top: 146,
        left: 18,
        width: 165,
        height: 50
      },
      messageTextContainer: {
        overflow: 'hidden'
      },
      messageGCMCircle: {
        minWidth: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: Colors.blueGrey200
      },
      messageAPNSCircle: {
        minWidth: 11,
        height: 11,
        borderRadius: '2px'
      },
      appNameContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 4
      },
      gcmAppName: {
        fontWeight: 700,
        WebkitLineClamp: 1,
        maxWidth: 70
      },
      apnsAppName: {
        paddingRight: 4
      },
      messageText: {
        display: 'flex',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      },
      toggle: {
        padding: '20px 0 0 0',
        width: '45%'
      },
      actionButtons: {
        borderTop: 'none',
        paddingTop: 24
      },
      titleContainer: {
        borderBottom: 'none'
      }
    };
  },

  getDefaultJSONMessage() {
    const { appName, content } = this.state;
    const type = store.getConfig().type;

    if (type === 'APNS') {
      return {
        alert: {
          title: appName,
          body: content
        },
        sound: 'default',
        badge: 0
      };
    }

    if (type === 'GCM') {
      return {
        title: appName,
        body: content
      };
    }

    return null;
  },

  handleSendMessage() {
    const { onSendMessage } = props;
    const { appName, content, environment, isJSONMessage, JSONMessage, checkedDevicesIds } = this.state;
    const type = store.getConfig().type;
    const registrationIds = checkedDevicesIds;
    let payload = {
      registration_ids: registrationIds,
      environment
    };

    if (!isJSONMessage && type === 'APNS') {
      payload.aps = {
        alert: {
          title: appName,
          body: content
        }
      };
    }

    if (!isJSONMessage && type === 'GCM') {
      payload.notification = {
        title: appName,
        body: content
      };
    }

    if (isJSONMessage && type === 'APNS') {
      payload = _.merge(payload, { aps: JSON.parse(JSONMessage) });
    }

    if (isJSONMessage && type === 'GCM') {
      payload = _.merge(payload, { notification: JSON.parse(JSONMessage) });
    }

    onSendMessage(payload);
  },

  handleToggleEnvironment(environment) {
    this.setState({ environment: environment === 'development' ? 'production' : 'development' });
  },

  handleEditSubmit() {
    this.handleSendMessage();
  },

  handleAddSubmit() {
    this.handleSendMessage();
  },

  handleNextStep() {
    const { stepIndex } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  },

  handlePreviousStep() {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  },

  handleCheckTableRow(selectedIndexes) {
    let { checkedDevicesIds } = this.state;
    const items = props.getDevices();
    const typeMap = {
      none: [],
      all: _.map(items, (item) => item.registration_id)
    };

    if (_.isArray(selectedIndexes)) {
      checkedDevicesIds = _.map(selectedIndexes, (selectedIndex) => items[selectedIndex].registration_id);
    } else {
      checkedDevicesIds = typeMap[selectedIndexes];
    }


    this.setState({ checkedDevicesIds });
  },

  renderMessageFields() {
    const { isJSONMessage, JSONMessage } = this.state;

    if (isJSONMessage) {
      return (
        <div className="vm-3-t">
          <Editor
            ref="JSONMessage"
            minLines={16}
            maxLines={16}
            onChange={(value) => this.setState({ JSONMessage: value })}
            mode="javascript"
            theme="tomorow"
            value={JSONMessage || JSON.stringify(this.getDefaultJSONMessage(), null, '\t')}
          />
        </div>
      );
    }

    return (
      <div>
        <TextField
          ref="appName"
          name="appName"
          value={this.state.appName}
          onChange={(event, value) => this.setState({ appName: value })}
          fullWidth={true}
          floatingLabelText="App name"
        />
        <TextField
          ref="content"
          name="content"
          value={this.state.content}
          onChange={(event, value) => this.setState({ content: value })}
          fullWidth={true}
          floatingLabelText="Push notification Text"
        />
      </div>
    );
  },

  renderCheckedItemsData() {
    const styles = this.getStyles();
    const { userName, label, registration_id, isHeaderExpanded } = this.state;
    const checkedItems = props.getCheckedItems();
    let itemNodes = [
      <div
        key="clickedItem"
        style={styles.sendDialogHeaderItem}
        className="row"
      >
        <div className="col-sm-3">
          1.
        </div>
        <div className="col-sm-8">
          {userName}
        </div>
        <div className="col-sm-9">
          <Truncate text={label} />
        </div>
        <div className="col-sm-15">
          <Truncate text={registration_id} />
        </div>
      </div>
    ];

    if (checkedItems.length) {
      itemNodes = checkedItems.map((item, index) => (
        <div
          key={`item${item.registration_id}`}
          style={[styles.sendDialogHeaderItem, (index + 1) % 2 === 0 && styles.sendDialogHeaderEvenItem]}
          className="row"
        >
          <div className="col-sm-3">
            {`${index + 1}.`}
          </div>
          <div className="col-sm-8">
            {item.userName}
          </div>
          <div className="col-sm-9">
            <Truncate text={item.label} />
          </div>
          <div className="col-sm-15">
            <Truncate text={item.registration_id} />
          </div>
        </div>
      ));
    }

    return isHeaderExpanded ? itemNodes : itemNodes.slice(0, 3);
  },

  renderCertificateTypeFields(type) {
    const { environment } = this.state;
    const styles = this.getStyles();

    const field = {
      GCM: (
        <SelectField
          floatingLabelText="Certificate type"
          autoWidth={true}
          fullWidth={true}
          value={environment}
          onChange={(event, index, value) => this.setState({ environment: value })}
        >
          <MenuItem
            value="development"
            primaryText="Development"
            style={styles.certificateMenuItem}
          />
          <MenuItem
            value="production"
            primaryText="Production"
            style={styles.certificateMenuItem}
          />
        </SelectField>
      ),
      APNS: (
        <div className="vm-3-t">
          <Toggle
            label="Use Sandbox"
            onToggle={() => this.handleToggleEnvironment(environment)}
            toggled={environment === 'development'}
          />
        </div>
      )
    };

    return field[type];
  },

  renderStepContent(stepIndex) {
    const {
      appName,
      content,
      isJSONMessage,
      confirmationText,
      checkedDevicesIds
    } = this.state;
    const config = store.getConfig();
    const isAPNS = config.type === 'APNS';
    const styles = this.getStyles();
    const selectedDevicesCount = checkedDevicesIds.length;
    const steps = {
      step0: (
        <div style={{ textAlign: 'left' }}>
          <div className="row hp-1-l hp-1-r vm-3-b">
            <div style={styles.phoneContainer}>
              <Isvg
                src={props.phoneIcon}
              />
              <div style={styles.messagePreview}>
                <div style={[styles.messageGCMCircle, isAPNS && styles.messageAPNSCircle]} />
                <div
                  style={styles.messageTextContainer}
                  className="col-sm-30"
                >
                  <div style={styles.appNameContainer}>
                    <div style={[styles.messageText, styles.gcmAppName, isAPNS && styles.apnsAppName]}>
                      {appName}
                    </div>
                    <div>
                      5:09 PM
                    </div>
                  </div>
                  <div style={styles.messageText}>
                    {content}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-flex-1 hm-3-l">
              <div className="row align-middle">
                <div className="col-sm-17">
                  {this.renderCertificateTypeFields(config.type)}
                </div>
                <div className="col-sm-18 vm-3-t">
                  <Toggle
                    label="JSON message"
                    onToggle={() => this.setState({ isJSONMessage: !isJSONMessage })}
                    toggled={isJSONMessage}
                  />
                </div>
              </div>
              {this.renderMessageFields()}
            </div>
          </div>
          <Show if={this.getValidationMessages('content').length}>
            <div className="vm-2-t">
              <Notification type="error">
                {this.getValidationMessages('content').join(' ')}
              </Notification>
            </div>
          </Show>
        </div>
      ),
      step1: (
        <DevicesTable
          ref="devicesTable"
          checkedDevicesIds={checkedDevicesIds}
          handleCheckTableRow={this.handleCheckTableRow}
          type={config.type}
        />
      ),
      step2: (
        <ConfirmSending
          errorText={this.getValidationMessages('confirmationText').join(' ')}
          devicesCount={selectedDevicesCount}
          deviceType={config.device}
          confirmationText={confirmationText}
          content={content}
          handleChangeConfirmationText={(event, value) => this.setState({ confirmationText: value })}
        />
      )
    };

    return steps[`step${stepIndex}`];
  },

  render() {
    const {
      open,
      isLoading,
      canSubmit,
      stepIndex,
      checkedDevicesIds
    } = this.state;
    const styles = this.getStyles();
    const config = store.getConfig();
    const isFirstStep = stepIndex === 0;
    const isSecondStep = stepIndex === 1;
    const isLastStep = stepIndex === 2;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={(
          <div>
            <Stepper activeStep={stepIndex}>
              <span>Choose environment and type message</span>
              <span>Choose devices</span>
              <span>Confirm & Send</span>
            </Stepper>
            <Dialog.TitleWithIcon
              style={{ paddingLeft: 0 }}
              iconClassName={config.icon}
            >
              Send Message To {config.device} Device
            </Dialog.TitleWithIcon>
          </div>
        )}
        autoScrollBodyContent={true}
        actionsContainerStyle={styles.actionButtons}
        titleStyle={styles.titleContainer}
        bodyStyle={isSecondStep && { paddingTop: 0 }}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={(
          <Dialog.StandardButtons
            data-e2e-submit="push-message-submit"
            data-e2e-cancel="push-message-cancel"
            submitLabel={isLastStep ? `Send to ${checkedDevicesIds.length} Devices` : 'Next'}
            cancelLabel={isFirstStep ? 'Cancel' : 'Back'}
            submitDisabled={isSecondStep && !checkedDevicesIds.length}
            handleCancel={isFirstStep ? this.handleCancel : this.handlePreviousStep}
            handleConfirm={isLastStep ? this.handleFormValidation : this.handleNextStep}
            disabled={!canSubmit}
          />
        )}
      >
        <div className="vm-2-b">
          {this.renderFormNotifications()}
        </div>
        {this.renderStepContent(stepIndex)}
      </Dialog.FullPage>
    );
  }
}));
