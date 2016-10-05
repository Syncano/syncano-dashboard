import Reflux from 'reflux';

// Utils & Mixins
import SessionStore from '../Session/SessionStore';
import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin, SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import Actions from './RestoreFromFileDialogActions';

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
      isLoading: false,
      isRestoring: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  onRestoreFromFile() {
    this.data.isRestoring = true;
    this.trigger(this.data);
  },

  onRestoreFromFileCompleted(data) {
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

  onRestoreFromFileFailure() {
    this.data.isRestoring = false;
    this.trigger(this.data);
  }
});
