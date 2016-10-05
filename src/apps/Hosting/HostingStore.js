import Reflux from 'reflux';
import _ from 'lodash';

import {
  CheckListStoreMixin,
  StoreFormMixin,
  WaitForStoreMixin,
  StoreLoadingMixin,
  DialogStoreMixin
} from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './HostingActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin,
    DialogStoreMixin,
    StoreFormMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
    this.listenToForms();
  },

  sendHostingAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.label,
      socket: 'hosting'
    });
  },

  getDefaultHosting(objects) {
    const defaultHosting = _.find(objects, (hosting) => _.includes(hosting.domains, 'default'));

    return defaultHosting;
  },

  setHosting(data) {
    this.data.items = data;
    this.data.defaultHosting = this.getDefaultHosting(data);
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('HostingStore::refreshData');
    Actions.fetchHosting();
  },

  onFetchHostingCompleted(data) {
    console.debug('HostingStore::onFetchHostigCompleted');
    Actions.setHosting(data);
  },

  onCreateHostingCompleted(payload) {
    console.debug('HostingStore::onCreateHostingCompleted');
    this.refreshData();
    this.dismissDialog();
    this.sendHostingAnalytics('add', payload);
  },

  onUpdateHostingCompleted(payload) {
    console.debug('HostingStore::onUpdateHostingCompleted');
    this.refreshData();
    this.dismissDialog();
    this.sendHostingAnalytics('edit', payload);
  },

  onRemoveHostingsCompleted(payload) {
    console.debug('HostingStore::onRemoveHostingCompleted');
    this.refreshData();
    this.sendHostingAnalytics('delete', payload);
  }
});
