import Reflux from 'reflux';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './AdminsActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';

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
    Actions.fetchAdmins();
    AdminsInvitationsActions.fetchInvitations();
  },

  setAdmins(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onSelectAll() {
    this.data.items.forEach((item) => {
      const instanceOwnerId = SessionStore.getInstance().owner.id;

      if (item.id !== instanceOwnerId) {
        item.checked = true;
      }
      this.trigger(this.data);
    });
  },

  onFetchAdminsCompleted(items) {
    Actions.setAdmins(items);
  },

  onRemoveAdminsCompleted() {
    this.refreshData();
  }
});
