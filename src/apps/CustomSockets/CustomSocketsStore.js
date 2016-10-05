import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './CustomSocketsActions';

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
      isLoading: true,
      scriptEndpoints: []
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

  getCustomSockets(empty) {
    return this.data.items || empty || null;
  },

  setCustomSockets(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  setScriptEndpoints(items) {
    this.data.scriptEndpoints = items;
    this.trigger(this.data);
  },

  refreshData() {
    Actions.fetchCustomSockets();
    Actions.fetchScriptEndpoints();
  },

  onFetchCustomSocketsCompleted(items) {
    Actions.setCustomSockets(items);
  },

  onFetchScriptEndpointsCompleted(items) {
    Actions.setScriptEndpoints(items);
  },

  onRemoveCustomSocketsCompleted(payload) {
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'custom socket'
    });
  }
});
