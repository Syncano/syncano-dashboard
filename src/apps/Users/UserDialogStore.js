import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import UsersActions from './UsersActions';

export default Reflux.createStore({
  listenables: UsersActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      username: null,
      password: null,
      groups: null,
      isLoading: false
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateUserCompleted() {
    console.debug('UserDialogStore::onCreateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  },

  onUpdateUserCompleted() {
    console.debug('UserDialogStore::onUpdateUserCompleted');
    this.dismissDialog();
    UsersActions.fetchUsers();
  }
});
