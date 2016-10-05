import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin, SnackbarNotificationMixin } from '../../../mixins';

// Stores & Actions
import Actions from './GCMSendMessagesActions';
import GCMMessagesActions from './../../PushMessages/GCM/GCMMessagesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin,
    SnackbarNotificationMixin
  ],

  config: {
    type: 'GCM',
    icon: 'synicon-android',
    device: 'Android'
  },

  getInitialState() {
    return {
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  getConfig() {
    return this.config;
  },

  onSendMessagesToGCMCompleted() {
    console.debug('GCMDeviceDialogStore::onSendMessageToGCMCompleted');
    GCMMessagesActions.fetchMessages();
    this.setSnackbarNotification({ message: 'Your Android Message was sent' });
    this.trigger(this.data);
    this.dismissDialog();
    window.analytics.track('Used Dashboard Push Messages API', {
      type: 'send',
      deviceType: 'gcm'
    });
  }
});
