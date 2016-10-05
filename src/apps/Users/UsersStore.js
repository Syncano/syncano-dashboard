import Reflux from 'reflux';
import URI from 'urijs';
import _ from 'lodash';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './UsersActions';
import SessionActions from '../Session/SessionActions';
import GroupsActions from '../Groups/GroupsActions';

export default Reflux.createStore({
  listenables: [Actions],

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  sendUserAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Users API', {
      type,
      instance: payload.instanceName,
      userId: payload.id,
      username: payload.username
    });
  },

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
    this.listenTo(GroupsActions.setGroups, this.refreshData);
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchUsers();
  },

  getItems() {
    return this.data.items;
  },

  getUserById(userId) {
    return _.find(this.data.items, ['id', userId]);
  },

  setUsers(items, rawData) {
    this.data.hasNextPage = items.hasNext();
    this.data.items = _.uniqBy(this.data.items.concat(items), 'id');
    this.data.nextParams = new URI(rawData.next || '').search(true);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchUsersCompleted(payload, rawData) {
    this.data.items = [];
    Actions.setUsers(payload, rawData);
  },

  onSubFetchUsersCompleted(payload, rawData) {
    Actions.setUsers(payload, rawData);
  },

  onRemoveUsersCompleted(payload) {
    this.data.hideDialogs = true;
    this.refreshData();
    this.sendUserAnalytics('delete', payload);
  },

  onCreateUserCompleted(payload) {
    this.refreshData();
    this.sendUserAnalytics('add', payload);
  },

  onUpdateUserCompleted(payload) {
    this.refreshData();
    this.sendUserAnalytics('edit', payload);
  }
});
