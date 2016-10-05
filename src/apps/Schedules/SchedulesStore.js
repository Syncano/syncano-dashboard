import Reflux from 'reflux';

// Utils & Mixins
import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import Actions from './SchedulesActions';

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
      ScriptsActions.fetchScripts.completed,
      this.refreshData
    );
    this.setLoadingStates();
  },

  getSchedules(empty) {
    return this.data.items || empty || null;
  },

  setSchedules(items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = items;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('SchedulesStore::refreshData');
    Actions.fetchSchedules();
  },

  onFetchSchedulesCompleted(items) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    Actions.setSchedules(items);
  },

  onRemoveSchedulesCompleted(payload) {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.id,
      socket: 'schedule',
      script: payload.script
    });
  }
});
