import Reflux from 'reflux';
import _ from 'lodash';

import {
  StoreHelpersMixin,
  CheckListStoreMixin,
  StoreFormMixin,
  WaitForStoreMixin,
  StoreLoadingMixin
} from '../../mixins';

import InstancesActions from './InstancesActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: InstancesActions,

  mixins: [
    StoreHelpersMixin,
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      clickedItem: null,
      myInstances: [],
      sharedInstances: [],
      isLoading: true,
      currentStep: -1
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
    this.setLoadingStates();
  },

  clearStore() {
    this.data = this.getInitialState();
    this.trigger(this.data);
  },

  refreshData() {
    InstancesActions.fetchInstances();
  },

  amIOwner(item) {
    if (item) {
      return item.owner.email === SessionStore.getUser({}).email;
    }

    return false;
  },

  onSetClickedInstance(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onSelectAll(key) {
    const uncheckOthers = {
      sharedInstances: () => InstancesActions.uncheckAll('myInstances'),
      myInstances: () => InstancesActions.uncheckAll('sharedInstances')
    };

    uncheckOthers[key]();
    this.data[key].forEach((item) => (item.checked = true));
    this.trigger(this.data);
  },

  getClickedItem() {
    return this.data.clickedItem;
  },

  getInstanceById(name) {
    let instance = null;

    this.data.items.some((item) => {
      if (item.name.toString() === name.toString()) {
        instance = item;
        return true;
      }

      return false;
    });

    return instance;
  },

  // Filters
  getAllInstances() {
    return this.data.myInstances.concat(this.data.sharedInstances);
  },

  getOtherInstances() {
    return this.data.sharedInstances;
  },

  getMyInstances() {
    return this.data.myInsances;
  },

  getInstancesDropdown() {
    const { items } = this.data;

    return _.map(items, (item) => ({
      payload: item.name,
      text: item.name
    }));
  },

  fillInstanceDefaultMeta(instances) {
    return _.map(instances, (instance) => {
      if (_.isEmpty(instance.metadata)) {
        instance.metadata = { color: 'indigo', icon: 'cloud' };
      }
      return instance;
    });
  },

  setInstances(items) {
    const instances = this.fillInstanceDefaultMeta(items);

    this.data.myInstances = _.filter(instances, (instance) => this.amIOwner(instance));
    this.data.sharedInstances = _.filter(instances, (instance) => !this.amIOwner(instance));
    this.trigger(this.data);
  },

  redirectToInstancesList() {
    const router = SessionStore.getRouter();
    const routes = SessionStore.getRoutes();
    const activeRouteName = routes[routes.length - 1].name;

    if (!_.isUndefined(activeRouteName) && activeRouteName !== 'instances' || _.isUndefined(activeRouteName)) {
      router.push('/instances/');
    }
  },

  onFetchInstancesCompleted(items) {
    InstancesActions.setInstances(items);
  },

  onFetchInstancesFailure(result) {
    this.data.blocked = result;
    this.trigger(this.data);
  },

  onRemoveInstancesCompleted() {
    this.redirectToInstancesList();
    this.refreshData();
  },

  onRemoveSharedInstanceCompleted() {
    this.redirectToInstancesList();
    this.refreshData();
  },

  onUpdateInstanceCompleted() {
    this.refreshData();
  },

  getClickedItemIconColor() {
    const clickedItem = this.getClickedItem();

    if (!clickedItem) {
      return {
        color: 'indigo',
        icon: 'cloud'
      };
    }

    return {
      color: clickedItem.metadata.color ? clickedItem.metadata.color : 'indigo',
      icon: clickedItem.metadata.icon ? clickedItem.metadata.icon : 'cloud'
    };
  }
});
