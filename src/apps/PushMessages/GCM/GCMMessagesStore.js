import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './GCMMessagesActions';
import SessionActions from '../../Session/SessionActions';
import GCMPushNotificationsActions from '../../PushNotifications/GCM/GCMPushNotificationsActions';
import GCMDevicesActions from '../../PushDevices/GCMDevices/GCMDevicesActions';

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
    this.listenTo(GCMPushNotificationsActions.configGCMPushNotification.completed, this.refreshData);
    this.listenTo(GCMDevicesActions.createDevice.completed, this.refreshData);
  },

  refreshData() {
    console.debug('APNSMessagesStore::refreshData');
    Actions.fetchMessages();
  },

  onFetchMessagesCompleted(push) {
    console.debug('GCMMessagesStore::onFetchGCMMessagesCompleted');
    this.data.items = push.messages;
    this.data.hasMessages = push.messages.length > 0;
    this.data.hasDevices = push.devices.length > 0;
    this.data.hasConfig = !_.isEmpty(push.config.development_api_key) || !_.isEmpty(push.config.production_api_key);
    this.trigger(this.data);
  }
});
