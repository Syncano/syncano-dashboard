import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './CustomSocketsRegistryActions';

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
      filterBySyncano: 'all',
      isLoading: true,
      filter: 'all'
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
  },

  getCustomSocketsRegistry(empty) {
    return this.data.items || empty || null;
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
    console.debug('CustomSocketsRegistryStore::refreshData');
    Actions.fetchCustomSocketsRegistry();
  },

  onFetchCustomSocketsRegistryCompleted(items) {
    console.debug('CustomSocketsRegistryStore::onFetchCustomSocketsRegistryCompleted');
    this.data.items = items;
    this.trigger(this.data);
  }
});
