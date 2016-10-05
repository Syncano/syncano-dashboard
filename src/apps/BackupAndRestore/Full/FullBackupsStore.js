import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../../mixins';

import Actions from './FullBackupsActions';
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

  refreshData() {
    Actions.fetchFullBackups();
  },

  onFetchFullBackupsCompleted(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onRemoveFullBackupsCompleted() {
    this.refreshData();
  }
});
