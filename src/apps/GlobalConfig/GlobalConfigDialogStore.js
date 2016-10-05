import Reflux from 'reflux';
import sortObj from 'sort-object';

// Utils & Mixins
import { WaitForStoreMixin, StoreFormMixin, StoreLoadingMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './GlobalConfigDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    WaitForStoreMixin,
    DialogStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      isLoading: true,
      isConfigLoading: true
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

  refreshData() {
    console.debug('GlobalConfigDialogStore::refreshData');
    Actions.fetchGlobalConfig();
  },

  onFetchGlobalConfig() {
    console.debug('GlobalConfigDialogStore::onFetchGlobalConfig');
    this.data.isConfigLoading = true;
    this.trigger(this.data);
  },

  onFetchGlobalConfigCompleted(response) {
    console.debug('GlobalConfigDialogStore::onFetchGlobalConfigCompleted');
    this.data.globalConfig = JSON.stringify(sortObj(response.config), null, 2);
    this.data.isConfigLoading = false;
    this.trigger(this.data);
  },

  onUpdateGlobalConfigCompleted() {
    console.debug('GlobalConfigDialogStore::onUpdateGlobalConfigComplited');
    this.refreshData();
    this.dismissDialog();
  }
});
