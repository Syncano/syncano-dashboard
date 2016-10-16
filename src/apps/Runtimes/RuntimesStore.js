import Reflux from 'reflux';
import _ from 'lodash';

import { WaitForStoreMixin } from '../../mixins';

import Actions from './RuntimesActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [WaitForStoreMixin],

  getInitialState() {
    return {
      runtimes: {},
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    Actions.fetchScriptRuntimes();
  },

  getScriptRuntimes() {
    return this.data.runtimes;
  },

  getRuntimeByKey(runtimeKey) {
    return this.data.runtimes[runtimeKey];
  },

  getRuntimeByName(runtimeName) {
    if (!runtimeName) {
      return null;
    }

    return _.find(this.data.runtimes, (runtime) => (
      runtime.key.toLowerCase() === runtimeName.toLowerCase()) && !runtime.deprecated
    );
  },

  getDividedRuntimes() {
    const { runtimes } = this.data;
    const deprecated = _.pickBy(runtimes, { deprecated: true });
    const latest = _.pickBy(runtimes, { deprecated: false });

    return { latest, deprecated };
  },

  getEditorMode(runtimeKey) {
    const runtimeDict = this.getRuntimeByKey(runtimeKey);
    const runtimeDictName = runtimeDict.name;
    const name = runtimeDictName.toLowerCase().split(' ')[0];
    const editorMode = name === 'nodejs' ? 'javascript' : name;

    return editorMode;
  },

  getRuntimeIconInfo(runtime) {
    const runtimeName = runtime.name.toLowerCase().split(' ')[0];

    runtime.icon = `language-${runtimeName}`;
    runtime.color = {
      golang: '#95DCF4',
      nodejs: '#80BD01',
      php: '#6C7EB7',
      python: '#FFC107',
      ruby: '#ED4545',
      swift: '#FC8737'
    }[runtimeName];

    return runtime;
  },

  onFetchScriptRuntimes() {
    this.trigger({ isLoading: true });
  },

  onFetchScriptRuntimesCompleted(runtimes) {
    const runtimesDict = _.forEach(runtimes, this.getRuntimeIconInfo);

    this.data.runtimes = runtimesDict;
    this.trigger({ runtimes: runtimesDict, isLoading: false });
  },

  onFetchScriptRuntimesFailure() {
    this.trigger({ isLoading: false });
  }
});
