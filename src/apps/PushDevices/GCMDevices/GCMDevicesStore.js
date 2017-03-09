import Reflux from 'reflux';
import _ from 'lodash';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../../mixins';

import Actions from './GCMDevicesActions';
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
    this.data.hasConfig = !_.isEmpty(config.development_api_key) || !_.isEmpty(config.production_api_key);
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
      deviceType: 'gcm',
      instance: payload[0].instanceName,
      registrationId: payload[0].registrationId
    });
  },

  onFetchGCMConfigCompleted(config) {
    this.data.hasConfig = !_.isEmpty(config.development_api_key) || !_.isEmpty(config.production_api_key);
    this.trigger(this.data);
  }
});
