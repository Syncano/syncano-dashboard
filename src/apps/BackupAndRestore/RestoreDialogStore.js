import Reflux from 'reflux';

// Utils & Mixins
import SessionStore from '../Session/SessionStore';
import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin, SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import Actions from './RestoreDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      clickedItem: null,
      isLoading: false,
      isRestoring: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
    this.listenToForms();
  },

  onSetClickedBackup(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onRestoreFromBackup() {
    this.data.isRestoring = true;
    this.trigger(this.data);
  },

  onRestoreFromBackupCompleted(data) {
    console.debug('RestoreDialogStore::onRestoreFromBackupCompleted');
    const { instanceName } = data;

    setTimeout(() => {
      this.data.isRestoring = false;
      this.trigger(this.data);
      this.dismissDialog();
      SessionStore.getRouter().push({ name: 'sockets', params: { instanceName } });
      this.setSnackbarNotification({ message: 'Your instance was successfully restored' });
    }, 10000);
  },

  onRestoreFromBackupFailure() {
    this.data.isRestoring = false;
    this.trigger(this.data);
  }
});
