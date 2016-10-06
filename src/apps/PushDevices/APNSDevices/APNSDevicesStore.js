import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSDevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      hasItems: false,
      hasConfig: false,
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
  },

  isConfigured() {
    return this.data.hasConfig;
  },

  getDevices() {
    console.debug('APNSDevicesStore::getDevices');
    return this.data.items;
  },

  setDevices(response) {
    console.debug('APNSDevicesStore::setDevices');
    const { config, devices } = response;

    this.data.items = devices;
    this.data.hasItems = devices.length > 0;
    this.data.hasConfig = config.development_certificate || config.production_certificate;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('APNSDevicesStore::refreshData');
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(response) {
    console.debug('APNSDevicesStore::onFetchDevicesCompleted');
    Actions.setDevices(response);
  },

  onRemoveDevicesCompleted(payload) {
    console.debug('APNSDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
    window.analytics.track('Used Dashboard Push Devices API', {
      type: 'delete',
      deviceType: 'apns',
      instance: payload[0].instanceName,
      registrationId: payload[0].registrationId
    });
  },

  onFetchAPNSConfigCompleted(config) {
    console.debug('APNSDevicesStore::onFetchAPNSConfigCompleted');
    this.data.hasConfig = config.development_certificate || config.production_certificate;
    this.trigger(this.data);
  }
});
