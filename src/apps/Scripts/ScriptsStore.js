import Reflux from 'reflux';
import _ from 'lodash';

import { StoreHelpersMixin, CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './ScriptsActions';
import ScriptEndpointActions from '../ScriptEndpoints/ScriptEndpointsActions';
import TriggersActions from '../Triggers/TriggersActions';
import SchedulesActions from '../Schedules/SchedulesActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreHelpersMixin,
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
      triggers: [],
      schedules: [],

      currentScriptId: null,

      AddDialogVisible: true,
      availableRuntimes: null,
      label: '',
      payload: '{"112":111}',
      description: '',
      selectedRuntimeIndex: 0,
      traces: [],
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
    this.listenTo(Actions.setCurrentScriptId, this.fetchTraces);
    this.listenTo(ScriptEndpointActions.createScriptEndpointWithScript.completed, this.refreshData);
    this.listenTo(ScriptEndpointActions.updateScriptEndpointWithScript.completed, this.refreshData);
    this.listenTo(SchedulesActions.createSchedule.completed, this.refreshData);
    this.listenTo(TriggersActions.createTrigger.completed, this.refreshData);
  },

  fetchTraces() {
    console.debug('ScriptsStore::fetchTraces');
    if (this.data.currentScriptId === null) {
      return;
    }
    Actions.fetchScriptTraces(this.data.currentScriptId);
  },

  getItems() {
    return this.data.items;
  },

  getScriptsDropdown() {
    const { items } = this.data;

    return _.map(items, (item) => ({
      payload: item.id,
      text: item.label,
      runtime_name: item.runtime_name
    }));
  },

  getScriptById(id) {
    const { items } = this.data;

    return _.find(items, ['id', id]);
  },

  getScriptByName(label) {
    const { items } = this.data;

    return _.find(items, ['label', label]);
  },

  getScriptIndex(id) {
    let scriptIndex = null;

    this.data.items.some((item, index) => {
      if (item.id.toString() === id.toString()) {
        scriptIndex = index;
        return true;
      }

      return false;
    });

    return scriptIndex;
  },

  refreshData() {
    console.debug('ScriptsStore::refreshData');
    Actions.fetchScripts();
  },

  setScripts(itemsObject) {
    this.data.items = itemsObject.scripts;
    this.data.triggers = itemsObject.triggers;
    this.data.schedules = itemsObject.schedules;
    this.trigger(this.data);
  },

  setScriptTraces(items) {
    this.data.traces = Object.keys(items).sort().map((key) => items[key]);
    this.trigger(this.data);
  },

  onSetCurrentScriptId(scriptId) {
    console.debug('ScriptsStore::onSetCurrentScriptId', scriptId);
    this.data.currentScriptId = scriptId;
    this.trigger(this.data);
  },

  onRemoveScriptsCompleted() {
    console.debug('ScriptsStore::onRemoveScriptsCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
    window.analytics.track('Used Dashboard Scripts API', {
      type: 'delete'
    });
  },

  onFetchScriptsCompleted(scripts) {
    console.debug('ScriptsStore::onFetchScriptsCompleted');
    Actions.setScripts(scripts);
  },

  onRunScript() {
    console.debug('ScriptsStore::onRunScript');
    this.trigger(this.data);
  },

  onRunScriptCompleted(trace) {
    console.debug('ScriptsStore::onRunScriptCompleted');
    this.data.lastTrace = trace;
    Actions.fetchScriptTrace(this.data.currentScriptId, trace.id);
  },

  onFetchScriptTraceCompleted(trace) {
    console.debug('ScriptsStore::onFetchScriptTrace');
    if (trace.status === 'pending') {
      const { currentScriptId } = this.data;

      setTimeout(() => {
        Actions.fetchScriptTrace(currentScriptId, trace.id);
      }, 300);
    } else {
      this.data.lastTraceResult = trace.result;
    }
    this.trigger(this.data);
  },

  onFetchScriptTracesCompleted(items) {
    console.debug('ScriptsStore::onFetchScriptTraces');
    Actions.setScriptTraces(items);
  }
});
