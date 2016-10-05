import Reflux from 'reflux';

import { DialogStoreMixin, StoreFormMixin } from '../../mixins';

import Actions from './SendChannelMessageDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    DialogStoreMixin,
    StoreFormMixin
  ],

  stepsCount: 2,

  getInitialState() {
    return {
      messagesHistory: [],
      stepIndex: 0,
      isFinished: false,
      message: '',
      JSONMessage: null,
      isJSONMessage: false,
      room: null,
      sentMessage: null,
      isLoading: false
    };
  },

  init() {
    this.messagesHistory = [];
    this.listenToForms();
  },

  onChangeStep(stepIndex) {
    this.trigger({ stepIndex, isFinished: stepIndex >= (this.stepsCount - 1) });
  },

  onClearMessagesHistory() {
    this.messagesHistory = [];
    this.trigger({ messagesHistory: this.messagesHistory });
  },

  stopPolling() {
    if (this.poll) {
      this.poll.timeout = 200;
      this.poll.events = {};
      this.poll.stop();
      this.trigger({ messagesHistory: this.messagesHistory });
    }
  },

  onSendChannelMessage() {
    this.trigger({ isLoading: true });
  },

  onSendChannelMessageCompleted(message) {
    const triggerObj = {
      isLoading: false,
      sentMessage: message
    };

    this.trigger(triggerObj);
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'publish',
      instance: message.instanceName,
      socketId: message.name,
      socket: 'channel'
    });
  },

  onSendChannelMessageFailure() {
    this.trigger({ isLoading: false });
  },

  onPollForChannelCompleted(poll, message) {
    this.poll = poll;
    if (message) {
      this.messagesHistory = [message, ...this.messagesHistory];
      this.trigger({ messagesHistory: this.messagesHistory });
    }
  }
});
