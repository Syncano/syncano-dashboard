import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ApiKeysActions';

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
    console.debug('ApiKeysStore::refreshData');
    Actions.fetchApiKeys();
  },

  setApiKeys(items) {
    console.debug('AdminsStore::setApiKeys');
    this.data.items = items;
    this.trigger(this.data);
  },

  onFetchApiKeysCompleted(items) {
    console.debug('ApiKeysStore::onFetchApiKeysCompleted');
    Actions.setApiKeys(items);
  },

  onRemoveApiKeysCompleted() {
    this.refreshData();
  },

  onResetApiKeyCompleted() {
    this.refreshData();
  }
});
