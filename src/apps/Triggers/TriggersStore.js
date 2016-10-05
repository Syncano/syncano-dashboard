import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './TriggersActions';
import ScriptsActions from '../Scripts/ScriptsActions';

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
      ScriptsActions.fetchScripts.completed,
      this.refreshData
    );
    this.setLoadingStates();
  },

  setTriggers(items) {
    this.data.items = items;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  getTriggers(empty) {
    return this.data.items || empty || null;
  },

  getSignalLabel(signal) {
    const signalLabels = {
      post_create: 'create',
      post_update: 'update',
      post_delete: 'delete'
    };

    return signalLabels[signal] || signal;
  },

  refreshData() {
    console.debug('TriggersStore::refreshData');
    Actions.fetchTriggers();
  },

  onFetchTriggersCompleted(items) {
    console.debug('TriggersStore::onFetchTriggersCompleted');
    Actions.setTriggers(items);
  },

  onRemoveTriggersCompleted(payload) {
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.id,
      socket: 'trigger',
      script: payload.script
    });
  }
});
