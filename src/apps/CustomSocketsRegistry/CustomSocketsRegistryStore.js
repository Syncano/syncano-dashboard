import Reflux from 'reflux';
import _ from 'lodash';
import YAML from 'js-yaml';

import { CheckListStoreMixin, StoreLoadingMixin } from '../../mixins';

import Actions from './CustomSocketsRegistryActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      filterBySyncano: 'all',
      isLoading: true,
      filter: 'all',
      currentSocket: null,
      currentSocketId: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
  },

  getCustomSocketsRegistry(empty) {
    return this.data.items || empty || null;
  },

  getCustomSocketById(id) {
    const { items } = this.data;

    return _.find(items, ['id', Number(id)]);
  },

  onSetCurrentSocketId(id) {
    this.data.currentSocketId = Number(id);
    this.trigger(this.data);
  },

  onSetFilter(filter) {
    this.data.filter = filter;
    this.trigger(this.data);
  },

  onSetSearchFilter(filterBySyncano) {
    this.data.filterBySyncano = filterBySyncano;
    this.trigger(this.data);
  },

  refreshData() {
    const { currentSocketId } = this.data;
    const currentSocket = this.getCustomSocketById(currentSocketId);

    this.data.currentSocket = currentSocket;

    Actions.fetchCustomSocketsInfo(currentSocket.url);
  },

  onFetchCustomSocketsInfoCompleted({ data, license, ymlUrl }) {
    try {
      this.data.currentSocket = YAML.safeLoad(data);
      this.data.currentSocket.license = license;
      this.data.currentSocket.ymlUrl = ymlUrl;
    } catch (e) {
      this.data.currentSocket = null;
    }
    this.trigger(this.data);
  },

  onFetchCustomSocketsRegistryCompleted(items) {
    this.data.items = items;
    this.trigger(this.data);
  }
});
