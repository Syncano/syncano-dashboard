import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, StoreFormMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './AdminsInvitationsActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStoreMixin,
    StoreFormMixin,
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
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('AdminsInvitationsStore::refreshData');
    Actions.fetchInvitations();
  },

  selectAll() {
    this.getPendingInvitations().forEach((item) => (item.checked = true));
    this.trigger(this.data);
  },

  setInvitations(items) {
    console.debug('AdminsInvitationsStore::setInvitations');
    this.data.items = items;
    this.trigger(this.data);
  },

  getPendingInvitations() {
    console.debug('AdminsInvitationsStore::getPendingInvitations');

    const isInvitationPending = (element) => element.state === 'new';
    const pendingInvitations = this.data.items.filter(isInvitationPending);

    return pendingInvitations;
  },

  onFetchInvitationsCompleted(items) {
    console.debug('AdminsInvitationsStore::onFetchInvitationsCompleted');
    Actions.setInvitations(items);
  },

  onRemoveInvitationCompleted() {
    this.refreshData();
  },

  onResendInvitationCompleted() {
    this.trigger(this.data);
    Actions.uncheckAll();
  }
});
