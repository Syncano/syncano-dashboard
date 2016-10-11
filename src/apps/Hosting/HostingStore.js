import Reflux from 'reflux';
import shortid from 'shortid';
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

  setHosting(data) {
    const addIdToDomain = (domain) => ({ id: shortid.generate(), value: domain });
    const setHosting = (hosting) => {
      hosting.domains = _.map(hosting.domains, addIdToDomain);
      hosting.isDefault = _.some(hosting.domains, { value: 'default' });
      return hosting;
    };
    const hostings = _.forEach(data, setHosting);

    this.data.items = hostings;
    this.trigger(this.data);
  },

  refreshData() {
    Actions.fetchHosting();
  },

  onFetchHostingCompleted(data) {
    Actions.setHosting(data);
  },

  onCreateHostingCompleted(payload) {
    this.refreshData();
    this.dismissDialog();
    this.sendHostingAnalytics('add', payload);
  },

  onUpdateHostingCompleted(payload) {
    this.refreshData();
    this.dismissDialog();
    this.sendHostingAnalytics('edit', payload);
  },

  onRemoveHostingsCompleted(payload) {
    this.refreshData();
    this.sendHostingAnalytics('delete', payload);
  }
});
