import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { WaitForStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './RuntimesActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [WaitForStoreMixin],

  getInitialState() {
    return {
      runtimes: [],
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
    console.debug('RuntimesStore::refreshData');
    Actions.fetchScriptRuntimes();
  },

  getScriptRuntimes() {
    return this.data.runtimes;
  },

  getRuntimeByKey(runtimeKey) {
    return _.find(this.data.runtimes, { key: runtimeKey });
  },

  getRuntimeByName(runtimeName) {
    if (!runtimeName) {
      return null;
    }

    return _.find(this.data.runtimes, runtime => (
      runtime.key.toLowerCase() === runtimeName.toLowerCase()) && !runtime.deprecated
    );
  },

  getDividedRuntimes() {
    const { runtimes } = this.data;
    const deprecated = _.filter(runtimes, (runtime) => runtime.deprecated);
    const latest = _.filter(runtimes, (runtime) => !runtime.deprecated);

    return { latest, deprecated };
  },

  getEditorMode(runtimeName) {
    const runtimeDict = this.getRuntimeByKey(runtimeName);
    const runtimeDictName = runtimeDict.name;
    const name = runtimeDictName.toLowerCase().split(' ')[0];
    const editorMode = name === 'nodejs' ? 'javascript' : name;

    return editorMode;
  },

  buildRuntimesIconsInfo(runtime, key) {
    const runtimeName = runtime.name.toLowerCase().split(' ')[0];
    const runtimeIcon = `language-${runtimeName}`;
    const runtimeColor = {
      golang: '#95DCF4',
      nodejs: '#80BD01',
      php: '#6C7EB7',
      python: '#FFC107',
      ruby: '#ED4545',
      swift: '#FC8737'
    }[runtimeName];

    return { ...runtime, key, icon: runtimeIcon, color: runtimeColor };
  },

  onFetchScriptRuntimes() {
    console.debug('RuntimesStore::onFetchScriptRuntimes');
    this.trigger({ isLoading: true });
  },

  onFetchScriptRuntimesCompleted(runtimes) {
    console.debug('RuntimesStore::onFetchScriptRuntimesCompleted');
    const runtimesDict = _.map(runtimes, this.buildRuntimesIconsInfo);

    this.data.runtimes = runtimesDict;
    this.trigger({ runtimes: runtimesDict, isLoading: false });
  },

  onFetchScriptRuntimesFailure() {
    this.trigger({ isLoading: false });
  }
});
