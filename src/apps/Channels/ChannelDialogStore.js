import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import ChannelsActions from './ChannelsActions';

export default Reflux.createStore({
  listenables: ChannelsActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendChannelsAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'channel'
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      name: null,
      type: 'default',
      custom_publish: false,
      group: null,
      group_permissions: 'none',
      other_permissions: 'none'
    };
  },

  init() {
    this.listenToForms();
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 1 });
  },

  onCreateChannel() {
    this.trigger({ isLoading: true });
  },

  onCreateChannelCompleted(payload) {
    console.debug('ChannelsStore::onCreateChannelCompleted');
    this.trigger({ createdChannel: payload, isLoading: false });
    ChannelsActions.fetch();
    ChannelsActions.changeStep(1);
    this.sendChannelsAnalytics('add', payload);
  },

  onCreateChannelFailure() {
    console.debug('ChannelDialogStore::onCreateChannelFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateChannel() {
    this.trigger({ isLoading: true });
  },

  onUpdateChannelCompleted(payload) {
    console.debug('ChannelDialogStore::onUpdateChannelCompleted');
    this.trigger({ createdChannel: payload, isLoading: false });
    ChannelsActions.fetchChannels();
    ChannelsActions.changeStep(1);
    this.sendChannelsAnalytics('edit', payload);
  },

  onUpdateChannelFailure() {
    console.debug('ChannelDialogStore::onUpdateChannelFailure');
    this.trigger({ isLoading: false });
  },

  onFetchChannelRuntimesCompleted(runtimes) {
    console.debug('ChannelDialogStore::onFetchChannelRuntimesCompleted');
    ChannelsActions.setChannelRuntimes(runtimes);
  }

});
