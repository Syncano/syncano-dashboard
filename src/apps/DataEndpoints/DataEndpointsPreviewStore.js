import Reflux from 'reflux';
import _ from 'lodash';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './DataEndpointsPreviewActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      currentPage: 1,
      items: [],
      hasNextPage: false,
      nextLink: null,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      Actions.setDataEndpointName,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchCurrentDataEndpoint(this.data.currentName);
  },

  clearStore() {
    this.data = this.getInitialState();
  },

  setDataEndpointName(name) {
    this.data.currentName = name;
  },

  setData(items) {
    this.data.hasNextPage = _.isString(items.next);
    this.data.nextLink = items.next;
    this.data.items = [...this.data.items, ...items];
    this.trigger(this.data);
  },

  onFetchNextDataPageCompleted(items) {
    this.data.currentPage += 1;
    Actions.setData(items);
  },

  onFetchCurrentDataEndpointCompleted(dataEndpoint) {
    this.data.currentDataEndpoint = dataEndpoint;
    Actions.fetchDataEnpointClass(dataEndpoint.class);
  },

  onFetchDataEnpointClassCompleted(classObject) {
    this.data.classObject = classObject;
    Actions.fetchData(this.data.currentDataEndpoint, this.data.currentPage);
  },

  onFetchDataCompleted(items) {
    this.data.items = [];
    Actions.setData(items);
  },

  onRemoveDataObjectsCompleted() {
    this.data.hideDialogs = true;
    Actions.fetchData(this.data.currentDataEndpoint, this.data.currentPage);
  }
});
