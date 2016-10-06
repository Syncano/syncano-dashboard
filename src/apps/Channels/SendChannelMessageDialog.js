import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import shortid from 'shortid';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import Store from './SendChannelMessageDialogStore';
import Actions from './SendChannelMessageDialogActions';

import { FontIcon, RaisedButton, TextField, Toggle } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Dialog, Editor, Notification, Show, Stepper, Trace } from '../../common/';
import { DialogBindShortcutsHOC } from '../../common/Dialog';
import SendChannelMessageSummary from './SendChannelMessageSummary';

const SendChannelMessageDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
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
                message: '^ is not a valid JSON'
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
          message: "^Room field can't be blank for separate_rooms Channel type"
        }
      };
    }

    return validateObj;
  },

  componentWillMount() {
    this.updatePoll = _.debounce((name, room) => Actions.pollForChannel(name, room), 500, { trailing: true });
  },

  componentWillUpdate(nextProps, nextState) {
    const { name, room } = nextState;
    const isSeparateRooms = nextState.type === 'separate_rooms';
    const shouldStartPolling = !this.state._dialogVisible && nextState._dialogVisible && !isSeparateRooms;
    const shouldStopPolling = this.state._dialogVisible && !nextState._dialogVisible;
    const shouldUpdatePolling = isSeparateRooms && !_.isEmpty(nextState.room) && (this.state.room !== nextState.room);

    if (shouldStartPolling) {
      Actions.pollForChannel(name, room);
    }

    if (nextState._dialogVisible && shouldUpdatePolling) {
      Actions.stopPolling();
      this.updatePoll(name, room);
    }

    if (shouldStopPolling) {
      Actions.clearMessagesHistory();
      Actions.stopPolling();
    }
  },

  handleEditSubmit() {
    const { name, messageText, isJSONMessage, JSONMessage, room } = this.state;

    if (isJSONMessage) {
      return Actions.sendChannelMessage(name, JSON.parse(JSONMessage), room);
    }

    return Actions.sendChannelMessage(name, { content: messageText }, room);
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
    const { enableBindShortcuts, disableBindShortcuts } = this.context;
    const { isJSONMessage, messageText, JSONMessage } = this.state;

    if (isJSONMessage) {
      return (
        <div>
          <Editor
            name="message-editor"
            mode="json"
            height="200px"
            style={{ marginTop: 24 }}
            onChange={(value) => this.setState({ JSONMessage: value })}
            onFocus={disableBindShortcuts}
            onBlur={enableBindShortcuts}
            value={JSONMessage || [
              '{',
              '    "content": "Your message goes here"',
              '}'
            ].join('\n')}
          />
          <Show if={this.getValidationMessages('JSONMessage').length}>
            <div className="vm-2-t">
              <Notification type="error">
                {this.getValidationMessages('JSONMessage').join(' ')}
              </Notification>
            </div>
          </Show>
        </div>
      );
    }

    return (
      <TextField
        data-e2e="send-channel-message-content-input"
        label="messageText"
        autoFocus={true}
        fullWidth={true}
        multiLine={true}
        value={messageText}
        onChange={(event, value) => this.setState({ messageText: value })}
        errorText={this.getValidationMessages('messageText').join(' ')}
        hintText="Your message goes here"
        floatingLabelText="Message"
      />
    );
  },

  renderMessagesHistory() {
    const { messagesHistory } = this.state;

    return _.map(messagesHistory, (message) => {
      const messageStyle = {
        marginBottom: 8,
        paddingBottom: 8,
        borderBottom: '1px dashed white'
      };

      if (_.isString(message)) {
        return (
          <div
            key={`message${message.id}-${shortid.generate()}`}
            style={messageStyle}
          >
            {message}
          </div>
        );
      }

      return (
        <div
          key={`message${message.id}-${shortid.generate()}`}
          style={messageStyle}
        >
          <div>Message Id: {message.id}</div>
          <div>Author Id: {message.author.admin}</div>
          <div>Created at: {message.created_at}</div>
          {message.room && <div>Room: {message.room}</div>}
          {JSON.stringify(message.payload, null, 2)}
        </div>
      );
    });
  },

  renderStepContent() {
    const { sentMessage, stepIndex, isJSONMessage, room, type, isLoading } = this.state;
    const isSeparateRooms = type === 'separate_rooms';
    const roomHint = isSeparateRooms ? 'Channel room' : 'Channel room is available for spearate rooms type only';
    const basicViewToggleLabel = 'Toggle basic view';
    const JSONViewToggleLabel = 'Toggle JSON format view (Allows you to send more complex messages)';
    const toggleViewLabel = isJSONMessage ? basicViewToggleLabel : JSONViewToggleLabel;
    const stepContent = {
      step0: (
        <div className="vm-2-t">
          <Dialog.ContentSection
            className="vp-2-b"
            title="Channel Room"
          >
            <TextField
              label="room"
              autoFocus={true}
              fullWidth={true}
              disabled={!isSeparateRooms}
              value={room}
              onChange={(event, value) => this.setState({ room: value })}
              errorText={this.getValidationMessages('room').join(' ')}
              hintText="Type room name here"
              floatingLabelText={roomHint}
            />
          </Dialog.ContentSection>
          <Dialog.ContentSection title="Message Content">
            <div style={{ padding: '20px 0', width: '100%' }}>
              <Toggle
                className="vm-2-t"
                label={toggleViewLabel}
                labelPosition="right"
                toggled={isJSONMessage}
                onToggle={() => this.setState({ isJSONMessage: !isJSONMessage })}
              />
              {this.renderMessageEditor()}
              <div className="row align-right">
                <RaisedButton
                  data-e2e="send-channel-message-dialog-send-message-button"
                  className="vm-2-t right"
                  label="Send Message"
                  primary={true}
                  onTouchTap={this.handleFormValidation}
                />
              </div>
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection title="Message History (Real-time)">
            <div style={{ padding: '20px 0', width: '100%' }}>
              <Trace.Result
                data-e2e="send-channel-message-messages-preview"
                style={{ padding: '20px 10px', width: '100%', height: 350, overflow: 'auto' }}
                result={this.renderMessagesHistory()}
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
    const { stepIndex, name } = this.state;
    const stepTitle = {
      step0: `Send message to ${name} Channel`,
      step1: (
        <div
          data-e2e="send-channel-message-summary-title"
          className="row align-middle"
        >
          <FontIcon
            style={{ fontSize: 32, padding: '8px 8px 0 8px' }}
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
    const handleNextStep = () => Actions.changeStep(stepIndex + 1);

    if (isFinished) {
      return (
        <RaisedButton
          data-e2e="send-channel-message-summary-close-button"
          label="Close"
          primary={true}
          onTouchTap={this.handleCancel}
        />
      );
    }

    return (
      <Dialog.StandardButtons
        data-e2e-submit="send-channel-message-dialog-finish-button"
        submitLabel="Finish"
        disabled={!canSubmit}
        handleCancel={this.handleCancel}
        handleConfirm={sentMessage ? handleNextStep : this.handleCancel}
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
