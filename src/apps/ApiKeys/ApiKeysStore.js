import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './ApiKeysActions';
import SessionActions from '../Session/SessionActions';

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
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchApiKeys();
  },

  setApiKeys(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted(items) {
    Actions.setApiKeys(items);
  },

  onRemoveApiKeysCompleted() {
    this.refreshData();
  },

  onResetApiKeyCompleted() {
    this.refreshData();
  }
});
