import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';
import Actions from './AdminsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    Reflux.connect(AdminsInvitationsStore),
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
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('AdminsStore::refreshData');
    Actions.fetchAdmins();
    AdminsInvitationsActions.fetchInvitations();
  },

  setAdmins(items) {
    console.debug('AdminsStore::setAdmins');
    this.data.items = items;
    this.trigger(this.data);
  },

  onSelectAll() {
    console.debug('AdminsStore::onSelectAllAdmins');
    this.data.items.forEach((item) => {
      const instanceOwnerId = SessionStore.getInstance().owner.id;

      if (item.id !== instanceOwnerId) {
        item.checked = true;
      }
      this.trigger(this.data);
    });
  },

  onFetchAdminsCompleted(items) {
    console.debug('AdminsStore::onFetchAdminsCompleted');
    Actions.setAdmins(items);
  },

  onRemoveAdminsCompleted() {
    console.debug('AdminsStore::onRemoveAdminsCompleted');
    this.refreshData();
  }
});
