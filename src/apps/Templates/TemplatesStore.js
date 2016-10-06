import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './TemplatesActions';

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
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  setTemplates(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  getTemplates(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchTemplates();
  },

  onFetchTemplatesCompleted(items) {
    console.debug('TemplatesStore::onFetchTemplatesCompleted');
    Actions.setTemplates(items);
  },

  onRemoveTemplatesCompleted() {
    this.refreshData();
  }
});
