import Reflux from 'reflux';
import _ from 'lodash';

import { CheckListStoreMixin, HostingMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './HostingActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    HostingMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
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
  },

  sendHostingAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.label,
      socket: 'hosting'
    });
  },

  setHosting(data) {
    this.data.items = _.forEach(data, this.prepareHosting);
    this.trigger(this.data);
  },

  refreshData() {
    Actions.fetchHostings();
  },

  onFetchHostingsCompleted(data) {
    Actions.setHosting(data);
  },

  onCreateHostingCompleted(payload) {
    this.refreshData();
    this.sendHostingAnalytics('add', payload);
  },

  onUpdateHostingCompleted(payload) {
    this.refreshData();
    this.sendHostingAnalytics('edit', payload);
  },

  onRemoveHostingsCompleted(payload) {
    this.refreshData();
    this.sendHostingAnalytics('delete', payload);
  }
});
