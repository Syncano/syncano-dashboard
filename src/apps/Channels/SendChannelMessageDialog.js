import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import shortid from 'shortid';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import SendChannelMessageDialogStore from './SendChannelMessageDialogStore';
import SendChannelMessageDialogActions from './SendChannelMessageDialogActions';

import { FontIcon, RaisedButton, TextField, Toggle } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Editor, Notification, Show, Stepper, TraceResult } from '../../common/';
import { DialogBindShortcutsHOC } from '../../common/Dialog';
import SendChannelMessageSummary from './SendChannelMessageSummary';

const SendChannelMessageDialog = React.createClass({
  mixins: [
    Reflux.connect(SendChannelMessageDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const { isJSONMessage, type } = this.state;
    let validateObj = {
      messageText: {
        presence: true
      }
    };

    if (isJSONMessage) {
      validateObj = {
        JSONMessage: (value) => {
          try {
            JSON.parse(value);
          } catch (e) {
            return {
              inclusion: {
                within: [],
                message: '^Message is not a valid JSON'
              }
            };
          }
          return null;
        }
      };
    }

    if (type === 'separate_rooms') {
      validateObj.room = {
        presence: {
          message: '^Room field can\'t be blank for separate_rooms Channel type'
        }
      };
    }

    return validateObj;
  },

  componentWillMount() {
    this.updatePoll = _.debounce(
      (name, room) => SendChannelMessageDialogActions.pollForChannel(name, room), 500, { trailing: true }
    );
  },

  componentWillUpdate(nextProps, nextState) {
    const { name, room } = nextState;
    const isSeparateRooms = nextState.type === 'separate_rooms';
    const shouldStartPolling = !this.state._dialogVisible && nextState._dialogVisible && !isSeparateRooms;
    const shouldStopPolling = this.state._dialogVisible && !nextState._dialogVisible;
    const shouldUpdatePolling = isSeparateRooms && !_.isEmpty(nextState.room) && (this.state.room !== nextState.room);

    if (shouldStartPolling) {
      SendChannelMessageDialogActions.pollForChannel(name, room);
    }

    if (nextState._dialogVisible && shouldUpdatePolling) {
      SendChannelMessageDialogActions.stopPolling();
      this.updatePoll(name, room);
    }

    if (shouldStopPolling) {
      SendChannelMessageDialogActions.clearMessagesHistory();
      SendChannelMessageDialogActions.stopPolling();
    }
  },

  getStyles() {
    return {
      stepTitleFontIcon: {
        fontSize: 32,
        padding: '8px 8px 0 8px'
      },
      messageEditor: {
        marginTop: 24
      },
      traceResult: {
        padding: 20,
        height: 350,
        overflow: 'auto'
      },
      messagesHistoryMessage: {
        borderBottom: '1px solid rgba(255, 255, 255, .0980392)'
      }
    };
  },

  getMessage() {
    const { messageText, isJSONMessage, JSONMessage } = this.state;
    let message = { content: messageText };

    if (isJSONMessage) {
      message = JSON.parse(JSONMessage);
    }

    return message;
  },

  handleEditSubmit() {
    const { name, room } = this.state;
    const message = this.getMessage();

    SendChannelMessageDialogActions.sendChannelMessage(name, message, room);
    this.clearMessageText();
  },

  handleAdvancedEditorToggleToggle() {
    const { isJSONMessage } = this.state;

    this.setState({ isJSONMessage: !isJSONMessage });
  },

  handleRoomChange(event, value) {
    this.setState({ room: value });
  },

  handleMessageTextChange(event, value) {
    this.setState({ messageText: value });
  },

  handleJSONMessageChange(value) {
    this.setState({ JSONMessage: value });
  },

  clearMessageText() {
    this.setState({ messageText: null });
  },

  renderSidebarContent() {
    return (
      <Dialog.SidebarBox>
        <Dialog.SidebarSection>
          {`You might want to allow your Users to be able to send custom messages on a Channel. This functionality might
            come in handy when you'd like to create e.g. a chat application.`}
        </Dialog.SidebarSection>
        <Dialog.SidebarSection>
          <i>Note: Sending custom messages is only available for Channels with <string>custom publish</string>.</i>
        </Dialog.SidebarSection>
        <Dialog.SidebarSection last={true}>
          <Dialog.SidebarLink
            to="http://docs.syncano.io/docs/realtime-communication#publishing-custom-notification-messages"
          >
            Learn more
          </Dialog.SidebarLink>
        </Dialog.SidebarSection>
      </Dialog.SidebarBox>
    );
  },

  renderMessageEditor() {
    const styles = this.getStyles();
    const { enableBindShortcuts, disableBindShortcuts } = this.context;
    const { isJSONMessage, messageText, JSONMessage } = this.state;

    if (isJSONMessage) {
      return (
        <div>
          <Editor
            name="message-editor"
            mode="json"
            height="200px"
            style={styles.messageEditor}
            onChange={this.handleJSONMessageChange}
            onFocus={disableBindShortcuts}
            onBlur={enableBindShortcuts}
            value={JSONMessage || [
              '{',
              '    "content": "Your message goes here"',
              '}'
            ].join('\n')}
          />
          <Show if={this.getValidationMessages('JSONMessage').length}>
            <Notification
              type="error"
              className="vm-2-t"
            >
              {this.getValidationMessages('JSONMessage').join(' ')}
            </Notification>
          </Show>
        </div>
      );
    }

    return (
      <TextField
        label="messageText"
        autoFocus={true}
        fullWidth={true}
        value={messageText}
        onChange={this.handleMessageTextChange}
        errorText={this.getValidationMessages('messageText').join(' ')}
        hintText="Your message goes here"
        floatingLabelText="Message"
        onFocus={disableBindShortcuts}
        onBlur={enableBindShortcuts}
        data-e2e="send-channel-message-content-input"
      />
    );
  },

  renderMessagesHistory() {
    const styles = this.getStyles();
    const { messagesHistory } = this.state;

    return _.map(messagesHistory, (message) => (
      <div
        key={`message${message.id}-${shortid.generate()}`}
        className="vm-2-b vp-2-b"
        style={styles.messagesHistoryMessage}
      >
        <div>Message Id: {message.id}</div>
        <div>Author Id: {message.author.admin}</div>
        <div>Created at: {message.created_at}</div>
        {message.room && <div>Room: {message.room}</div>}
        {JSON.stringify(message.payload, null, 2)}
      </div>
    ));
  },

  renderStepContent() {
    const styles = this.getStyles();
    const { sentMessage, stepIndex, isJSONMessage, room, type, isLoading } = this.state;
    const isSeparateRooms = type === 'separate_rooms';
    const roomHint = isSeparateRooms ? 'Channel room' : 'Channel room is available for spearate rooms type only';
    const stepContent = {
      step0: (
        <div className="vm-2-t">
          <Dialog.ContentSection title="Channel Room">
            <div className="col-flex-1">
              <TextField
                label="room"
                autoFocus={true}
                fullWidth={true}
                disabled={!isSeparateRooms}
                value={room}
                onChange={this.handleRoomChange}
                errorText={this.getValidationMessages('room').join(' ')}
                hintText="Type room name here"
                floatingLabelText={roomHint}
              />
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection title="Message Content">
            <div className="col-flex-1">
              <form onSubmit={this.handleFormValidation}>
                <Toggle
                  label="Use advanced editor (JSON)"
                  className="vm-2-t"
                  labelPosition="right"
                  toggled={isJSONMessage}
                  onToggle={this.handleAdvancedEditorToggleToggle}
                />
                {this.renderMessageEditor()}
                <div className="vm-2-t text--right">
                  <RaisedButton
                    primary={true}
                    type="submit"
                    label="Send Message"
                    data-e2e="send-channel-message-dialog-send-message-button"
                  />
                </div>
              </form>
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection
            title="Message History (Real-time)"
            last={true}
          >
            <div className="col-flex-1 vm-2-t">
              <TraceResult
                result={this.renderMessagesHistory()}
                style={styles.traceResult}
                data-e2e="send-channel-message-messages-preview"
              />
            </div>
          </Dialog.ContentSection>
        </div>
      ),
      step1: (
        <SendChannelMessageSummary
          isLoading={isLoading}
          message={sentMessage}
        />
      )
    }[`step${stepIndex}`];

    return stepContent;
  },

  renderStepTitle() {
    const styles = this.getStyles();
    const { stepIndex, name } = this.state;
    const stepTitle = {
      step0: `Send message to ${name} Channel`,
      step1: (
        <div
          className="row align-middle"
          data-e2e="send-channel-message-summary-title"
        >
          <FontIcon
            style={styles.stepTitleFontIcon}
            color={Colors.blue400}
            className="synicon-comment-alert"
          />
          <div>
            {`You've just sent a message to ${name} Channel`}
          </div>
        </div>
      )
    }[`step${stepIndex}`];

    return stepTitle;
  },

  renderDialogTitle() {
    const { stepIndex, name } = this.state;

    return (
      <div data-e2e="send-channel-message-dialog-title">
        <Stepper activeStep={stepIndex}>
          <span>Send message to {name} Channel</span>
          <span>Send Message Summary</span>
        </Stepper>
        <div className="vm-3-t">
          {this.renderStepTitle()}
        </div>
      </div>
    );
  },

  renderActionButtons() {
    const { canSubmit, isFinished, sentMessage, stepIndex } = this.state;
    const handleNextStep = () => SendChannelMessageDialogActions.changeStep(stepIndex + 1);

    if (isFinished) {
      return (
        <RaisedButton
          primary={true}
          label="Close"
          onTouchTap={this.handleCancel}
          data-e2e="send-channel-message-summary-close-button"
        />
      );
    }

    return (
      <Dialog.StandardButtons
        submitLabel="Finish"
        disabled={!canSubmit}
        handleCancel={this.handleCancel}
        handleConfirm={sentMessage ? handleNextStep : this.handleCancel}
        data-e2e-submit="send-channel-message-dialog-finish-button"
      />
    );
  },

  render() {
    const { hasBindShortcutsEnabled } = this.context;
    const { isLoading, open, isFinished } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        bindShortcuts={hasBindShortcutsEnabled}
        contentSize="large"
        title={this.renderDialogTitle()}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={this.renderActionButtons()}
        sidebar={!isFinished && this.renderSidebarContent()}
      >
        {this.renderStepContent()}
        {this.renderFormNotifications()}
      </Dialog.FullPage>
    );
  }
});

SendChannelMessageDialog.contextTypes = {
  hasBindShortcutsEnabled: PropTypes.bool,
  enableBindShortcuts: PropTypes.func,
  disableBindShortcuts: PropTypes.func
};

export default DialogBindShortcutsHOC(SendChannelMessageDialog);
