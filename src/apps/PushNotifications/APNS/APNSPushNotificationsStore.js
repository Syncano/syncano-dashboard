import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin, StoreHelpersMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSPushNotificationsActions';
import DevicesActions from '../../PushDevices/APNSDevices/APNSDevicesActions';
import DevicesStore from '../../PushDevices/APNSDevices/APNSDevicesStore';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    WaitForStoreMixin,
    StoreLoadingMixin,
    StoreHelpersMixin
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
      DevicesActions.fetchDevices.completed,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchAPNSPushNotificationConfig();
  },

  hasConfig(items = this.data.items) {
    if (items.length > 0) {
      return items[0].development_certificate || items[0].production_certificate;
    }

    return false;
  },

  onFetchAPNSPushNotificationConfigCompleted(items) {
    console.debug('APNSPushNotificationsStore::onFetchAPNSPushNotificationConfigCompleted');
    this.data.items = [items].map((item) => {
      item.name = 'APNS';
      item.hasConfig = this.hasConfig([items]);
      item.devicesCount = DevicesStore.getDevices().length;

      return item;
    });
    this.trigger(this.data);
  },

  onRemoveCertificateCompleted() {
    console.debug('APNSPushNotificationsStore::onRemoveCertificateCompleted');
    this.refreshData();
  }
});
