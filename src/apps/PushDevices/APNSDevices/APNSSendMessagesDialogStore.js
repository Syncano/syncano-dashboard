import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin, SnackbarNotificationMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSSendMessagesActions';
import APNSMessagesActions from './../../PushMessages/APNS/APNSMessagesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin,
    SnackbarNotificationMixin
  ],

  config: {
    type: 'APNS',
    icon: 'synicon-apple',
    device: 'iOS'
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

  onSendMessagesToAPNSCompleted() {
    console.debug('APNSDeviceDialogStore::onSendMessageToAPNSCompleted');
    APNSMessagesActions.fetchMessages();
    this.setSnackbarNotification({ message: 'Your iOS Message was sent' });
    this.trigger(this.data);
    this.dismissDialog();
    window.analytics.track('Used Dashboard Push Messages API', {
      type: 'send',
      deviceType: 'apns'
    });
  }
});
