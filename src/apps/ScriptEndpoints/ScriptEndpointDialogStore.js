import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './ScriptEndpointsActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import SampleScripts from '../Scripts/SampleScripts';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendScriptEndpointAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'script endpoint',
      script: payload.script
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      label: '',
      signal: '',
      class: '',
      scriptData: {},
      scripts: [
        {
          payload: '',
          text: 'Loading...'
        }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ScriptsActions.setScripts, this.getScriptsDropdown);
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 2 });
  },

  getScriptsDropdown() {
    console.debug('DataViewDialogStore::getScriptsDropdown');
    const items = ScriptsStore.getScriptsDropdown();
    const sampleScripts = _.map(SampleScripts, (value, key) => ({
      text: key,
      description: value.description,
      runtime_name: value.runtime_name
    }));
    let scripts = { items, sampleScripts };

    if (scripts.length === 0) {
      scripts = [{ payload: '', text: 'No Scripts, add one first' }];
    }

    this.trigger({ scripts });
  },

  onCreateScriptEndpoint() {
    this.trigger({ isLoading: true });
  },

  onCreateScriptEndpointCompleted(payload) {
    console.debug('ScriptEndpointsDialogStore::onCreateScriptEndpointCompleted');
    this.trigger({ createdScriptEndpoint: payload, isLoading: false });
    Actions.fetchScriptEndpoints();
    Actions.changeStep(2);
    ScriptsActions.fetchScripts();
    this.sendScriptEndpointAnalytics('add', payload);
  },

  onCreateScriptEndpointFailure() {
    console.debug('ScriptEndpointDialogStore::onCreateScriptEndpointFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateScriptEndpoint() {
    this.trigger({ isLoading: true });
  },

  onUpdateScriptEndpointCompleted(payload) {
    console.debug('ScriptEndpointDialogStore::onUpdateScriptEndpointCompleted');
    this.trigger({ createdScriptEndpoint: payload, isLoading: false });
    Actions.fetchScriptEndpoints();
    Actions.changeStep(2);
    ScriptsActions.fetchScripts();
    this.sendScriptEndpointAnalytics('edit', payload);
  },

  onCreateScriptEndpointWithScript() {
    this.trigger({ isLoading: true });
  },

  onCreateScriptEndpointWithScriptCompleted(payload) {
    console.debug('ScriptEndpointsDialogStore::onCreateScriptEndpointWithScriptCompleted');
    this.trigger({ createdScriptEndpoint: payload, isLoading: false });
    Actions.fetchScriptEndpoints();
    Actions.changeStep(2);
    ScriptsActions.fetchScripts();
    this.sendScriptEndpointAnalytics('add', payload);
  },

  onCreateScriptEndpointWithScriptFailure() {
    console.debug('ScriptEndpointDialogStore::onCreateScriptEndpointWithScriptFailure');
    this.trigger({ isLoading: false });
  },

  onUpdateScriptEndpointWithScript() {
    this.trigger({ isLoading: true });
  },

  onUpdateScriptEndpointWithScriptCompleted(payload) {
    console.debug('ScriptEndpointsDialogStore::onUpdateScriptEndpointWithScriptCompleted');
    this.trigger({ createdScriptEndpoint: payload, isLoading: false });
    Actions.fetchScriptEndpoints();
    Actions.changeStep(2);
    ScriptsActions.fetchScripts();
    this.sendScriptEndpointAnalytics('edit', payload);
  },

  onUpdateScriptEndpointWithScriptFailure() {
    console.debug('ScriptEndpointDialogStore::onUpdateScriptEndpointWithScriptFailure');
    this.trigger({ isLoading: false });
  }
});
