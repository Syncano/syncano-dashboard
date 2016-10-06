import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSMessagesActions';
import SessionActions from '../../Session/SessionActions';
import APNSPushNotificationsActions from '../../PushNotifications/APNS/APNSPushNotificationsActions';
import APNSDevicesActions from '../../PushDevices/APNSDevices/APNSDevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
    this.listenTo(APNSPushNotificationsActions.configAPNSPushNotification.completed, this.refreshData);
    this.listenTo(APNSDevicesActions.createDevice.completed, this.refreshData);
  },

  refreshData() {
    console.debug('APNSMessagesStore::refreshData');
    Actions.fetchMessages();
  },

  onFetchMessagesCompleted(push) {
    console.debug('APNSMessagesStore::onFetchAPNSMessagesCompleted');
    this.data.items = push.messages;
    this.data.hasMessages = push.messages.length > 0;
    this.data.hasDevices = push.devices.length > 0;
    this.data.hasConfig = push.config.development_certificate || push.config.production_certificate;
    this.trigger(this.data);
  }
});
