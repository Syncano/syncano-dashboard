import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './GroupsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
      activeGroup: null,
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

  setGroups(groups) {
    console.debug('GroupsStore::setGroups');
    this.data.items = groups;
    this.trigger(this.data);
  },

  getGroups(empty) {
    return this.data.items || empty || null;
  },

  getGroupsDropdown() {
    const groups = this.data.items;
    const emptyItem = {
      payload: 'none',
      text: 'none'
    };

    if (!groups.length) {
      return [emptyItem];
    }

    const groupsObjects = _.map(groups, (group) => ({
      payload: group.id,
      text: group.label,
      desc: `(ID: ${group.id})`
    }));

    groupsObjects.unshift(emptyItem);
    return groupsObjects;
  },

  refreshData() {
    Actions.fetchGroups();
  },

  onFetchGroupsCompleted(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    Actions.setGroups(items);
  },

  onRemoveGroupsCompleted() {
    this.refreshData();
  }
});
