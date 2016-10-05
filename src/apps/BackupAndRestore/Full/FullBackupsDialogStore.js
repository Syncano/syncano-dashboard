import Reflux from 'reflux';

import { StoreLoadingMixin, StoreFormMixin, DialogStoreMixin } from '../../../mixins';

import Actions from './FullBackupsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreLoadingMixin,
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  onCreateFullBackupCompleted() {
    console.debug('FullBackupsDialogStore::onCreateFullBackupCompleted');
    Actions.fetchFullBackups();
    this.dismissDialog();
  }
});
