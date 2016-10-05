import Reflux from 'reflux';
import _ from 'lodash';

import { SnackbarNotificationMixin, StoreFormMixin, WaitForStoreMixin } from '../../mixins';

import Actions from './ScriptActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    SnackbarNotificationMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  scriptConfigValueTypes: [
    {
      payload: 'string',
      text: 'String'
    },
    {
      payload: 'integer',
      text: 'Integer'
    }
  ],

  sendScriptAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Scripts API', {
      type,
      instance: payload.instanceName,
      scriptId: payload.id,
      sourceLength: payload.source.length,
      runtime: payload.runtimeName
    });
  },

  getInitialState() {
    return {
      currentScript: null,
      scriptConfig: [],
      traces: [],
      traceIsLoading: true,
      lastTraceResult: null,
      lastTraceStatus: null,
      lastTraceDuration: null,
      lastTraceReady: true,
      isLoading: true,
      configValueType: 'string'
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    const { scriptId } = SessionStore.getParams();

    if (scriptId) {
      Actions.fetchScript(scriptId);
      Actions.fetchScriptTraces(scriptId);
    }
  },

  mapConfig(originalConfig) {
    const config = _.map(originalConfig, (value, key) => ({
      key,
      value,
      type: _.isNumber(value) ? 'integer' : 'string'
    }));

    return _.sortBy(config, 'key');
  },

  clearCurrentScript() {
    this.data.currentScript = null;
  },

  onFetchScriptCompleted(script) {
    this.data.scriptConfig = this.mapConfig(script.config);
    this.data.currentScript = script;
    this.trigger(this.data);
  },

  getEditorMode() {
    const { currentScript } = this.data;

    return currentScript ? this.langMap[currentScript.runtime_name] : 'python';
  },

  fetchTraces() {
    if (this.data.currentScriptId === null) {
      return;
    }

    Actions.fetchScriptTraces(this.data.currentScript.id);
  },

  onFetchScriptTraces() {
    if (this.data.lastTraceReady) {
      this.data.traceIsLoading = true;
    }

    this.trigger(this.data);
  },

  onFetchScriptTracesCompleted(traces) {
    this.data.traces = traces;
    this.data.isLoading = false;
    this.getScriptLastTraceResult();
  },

  onFetchScriptTracesFailure() {
    this.data.traceIsLoading = false;
    this.trigger(this.data);
  },

  onRunScriptCompleted() {
    this.dismissSnackbarNotification();
    this.refreshData();
    this.sendScriptAnalytics('run', this.data.currentScript);
  },

  onRunScriptFailure() {
    this.dismissSnackbarNotification();
    this.sendScriptAnalytics('run_failure', this.data.currentScript);
  },

  getScriptLastTraceResult() {
    this.data.lastTraceResult = null;
    this.data.lastTraceStatus = null;
    this.data.lastTraceDuration = null;
    if (this.data.traces && this.data.traces.length) {
      const lastTrace = this.data.traces[0];

      if (lastTrace.status === 'pending' || lastTrace.status === 'processing') {
        this.data.lastTraceReady = false;
        setTimeout(() => {
          this.fetchTraces();
        }, 300);
      } else {
        this.data.lastTraceResult = lastTrace.result.stdout !== '' ? lastTrace.result.stdout : 'Success';
        if (lastTrace.result.stderr !== '') {
          this.data.lastTraceResult = lastTrace.result.stderr;
        }
        if (lastTrace.result.__error__) {
          this.data.lastTraceResult = lastTrace.result.__error__;
        }
        this.data.lastTraceStatus = lastTrace.status;
        this.data.lastTraceDuration = lastTrace.duration;
        this.data.lastTraceReady = true;
      }
    }
    this.data.traceIsLoading = false;
    this.trigger(this.data);
  },

  getScriptConfigValueTypes() {
    return this.scriptConfigValueTypes;
  },

  onUpdateScriptCompleted(script) {
    this.data.currentScript = script;
    this.dismissSnackbarNotification();
    this.refreshData();
    this.sendScriptAnalytics('edit', this.data.currentScript);
  },

  onUpdateScriptFailure() {
    this.dismissSnackbarNotification();
    this.sendScriptAnalytics('edit_failure', this.data.currentScript);
  },

  onFetchScriptTraceCompleted(trace) {
    const traceIndex = _.findIndex(this.data.traces, { id: trace.id });

    this.data.traces[traceIndex] = trace;
    this.trigger(this.data);
  }
});
