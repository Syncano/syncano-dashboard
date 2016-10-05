import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ScriptEndpointsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
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

  setScriptEndpoints(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  getScriptEndpoints(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchScriptEndpoints();
  },

  onFetchScriptEndpointsCompleted(items) {
    console.debug('ScriptEndpointsStore::onFetchScriptEndpointsCompleted');
    Actions.setScriptEndpoints(items);
  },

  onRemoveScriptEndpointsCompleted(payload) {
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'script endpoint',
      script: payload.script
    });
  }
});
