import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';
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
    console.debug('GCMDevicesStore::getDevices');
    return this.data.items;
  },

  setDevices(response) {
    console.debug('GCMDevicesStore::setGCMDevices');
    const { config, devices } = response;

    this.data.items = devices;
    this.data.hasItems = devices.length > 0;
    this.data.hasConfig = !_.isEmpty(config.development_api_key) || !_.isEmpty(config.production_api_key);
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('GCMDevicesStore::refreshData');
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(response) {
    console.debug('GCMDevicesStore::onFetchDevicesCompleted');
    Actions.setDevices(response);
  },

  onRemoveDevicesCompleted(payload) {
    console.debug('GCMDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
    window.analytics.track('Used Dashboard Push Devices API', {
      type: 'delete',
      deviceType: 'gcm',
      instance: payload[0].instanceName,
      registrationId: payload[0].registrationId
    });
  },

  onFetchGCMConfigCompleted(config) {
    console.debug('GCMDevicesStore::onFetchGCMConfigCompleted');
    this.data.hasConfig = !_.isEmpty(config.development_api_key) || !_.isEmpty(config.production_api_key);
    this.trigger(this.data);
  }
});
