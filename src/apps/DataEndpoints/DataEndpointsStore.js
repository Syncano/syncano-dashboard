import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './DataEndpointsActions';

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
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  getDataEndpoints(empty) {
    return this.data.items || empty || null;
  },

  setDataEndpoints(items) {
    console.debug('DataEndpointsStore::setDataEndpoints');
    this.data.items = items;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('DataEndpointsStore::refreshData');
    Actions.fetchDataEndpoints();
  },

  onFetchDataEndpointsCompleted(items) {
    console.debug('DataEndpointsStore::onFetchDataEndpointsCompleted');

    Actions.setDataEndpoints(items);
  },

  onRemoveDataEndpointsCompleted(payload) {
    console.debug('DataEndpointsStore::onRemoveDataEndpointsCompleted');
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'data endpoint'
    });
  }
});
