import Reflux from 'reflux';
import _ from 'lodash';

import { WaitForStoreMixin, StoreLoadingMixin, StoreHelpersMixin } from '../../../mixins';

import Actions from './GCMPushNotificationsActions';
import DevicesActions from '../../PushDevices/GCMDevices/GCMDevicesActions';
import DevicesStore from '../../PushDevices/GCMDevices/GCMDevicesStore';
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
    Actions.fetchGCMPushNotificationConfig();
  },

  hasConfig(items = this.data.items) {
    if (items.length > 0) {
      return !_.isEmpty(items[0].development_api_key) || !_.isEmpty(items[0].production_api_key);
    }

    return false;
  },

  onFetchGCMPushNotificationConfigCompleted(items) {
    this.data.items = [items].map((item) => {
      item.name = 'GCM';
      item.hasConfig = this.hasConfig([items]);
      item.devicesCount = DevicesStore.getDevices().length;

      return item;
    });

    this.trigger(this.data);
  }
});
