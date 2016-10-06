import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../../mixins';

// Stores & Actions
import SessionActions from '../../Session/SessionActions';
import Actions from './FullBackupsActions';

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

  refreshData() {
    console.debug('FullBackupsStore::refreshData');
    Actions.fetchFullBackups();
  },

  onFetchFullBackupsCompleted(items) {
    console.debug('FullBackupsStore::onFetchFullBackupsCompleted');
    this.data.items = items;
    this.trigger(this.data);
  },

  onRemoveFullBackupsCompleted() {
    console.debug('FullBackupsStore::onRemoveFullBackupsCompleted');
    this.refreshData();
  }
});
