import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../../mixins';

import Actions from './APNSDevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
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
    return this.data.items;
  },

  setDevices({ config, devices }) {
    this.data.items = devices;
    this.data.hasItems = devices.length > 0;
    this.data.hasConfig = config.development_certificate || config.production_certificate;
    this.trigger(this.data);
  },

  refreshData() {
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(response) {
    Actions.setDevices(response);
  },

  onRemoveDevicesCompleted(payload) {
    this.refreshData();
    window.analytics.track('Used Dashboard Push Devices API', {
      type: 'delete',
      deviceType: 'apns',
      instance: payload[0].instanceName,
      registrationId: payload[0].registrationId
    });
  },

  onFetchAPNSConfigCompleted(config) {
    this.data.hasConfig = config.development_certificate || config.production_certificate;
    this.trigger(this.data);
  }
});
