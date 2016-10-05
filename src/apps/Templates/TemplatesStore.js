import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './TemplatesActions';
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
    Actions.setTemplates(items);
  },

  onRemoveTemplatesCompleted() {
    this.refreshData();
  }
});
