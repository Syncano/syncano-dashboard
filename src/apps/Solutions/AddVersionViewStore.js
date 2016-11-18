import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, WaitForStoreMixin, StoreHelpersMixin } from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './AddVersionViewActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    WaitForStoreMixin,
    StoreHelpersMixin
  ],

  types: [
    {
      text: 'stable',
      payload: 'stable'
    },
    {
      text: 'development',
      payload: 'devel'
    }
  ],

  getInitialState() {
    return {
      name: null,
      type: 'devel',
      description: null,
      instance: null,
      instances: null,
      instanceData: {
        dataEndpoints: [],
        classes: [],
        scriptEndpoints: [],
        scripts: [],
        triggers: [],
        schedules: [],
        channels: []

      },
      exportSpec: {
        dataEndpoints: [],
        classes: {},
        scriptEndpoints: [],
        scripts: {},
        triggers: {},
        schedules: {},
        channels: {}
      }
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.waitFor(
      SessionActions.setUser,
      Actions.fetchInstances,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('AddVersionViewStore::refreshData');
    Actions.fetchInstances();
  },

  onClearExportSpec() {
    console.debug('AddVersionViewStore::onClearExportSpec');
    this.data.exportSpec = this.getInitialState().exportSpec;
  },

  getTypes() {
    return this.types;
  },

  setInstances(instances) {
    console.debug('AddVersionViewStore::setInstances');
    this.data.instances = instances;
    this.trigger(this.data);
  },

  getInstancesDropdown() {
    const instances = this.data.instances;

    if (!instances) {
      return [{ payload: '', text: 'Loading...' }];
    }

    return _.map(instances, (instance) => {
      let instanceText = instance.name;

      if (instance.description) {
        instanceText += ` (${instance.description})`;
      }

      return {
        payload: instance.name,
        text: instanceText
      };
    });
  },

  setType(type) {
    this.data.type = type;
    this.trigger(this.data);
  },

  setInstance(instance) {
    this.data.instance = instance;
    Actions.fetchInstance(instance);
  },

  onFetchInstanceCompleted() {
    Actions.fetchInstanceData();
  },

  setInstanceData() {
    this.data.dataReady = true;
    this.trigger(this.data);
  },

  fetchInstanceData() {
    console.debug('AddVersionViewStore::fetchInstanceData');

    this.data.instanceData = this.getInitialState().instanceData;
    this.data.dataReady = 'loading';
    this.trigger(this.data);

    const join = this.joinTrailing(
      Actions.fetchClasses.completed,
      Actions.fetchDataEndpoints.completed,
      Actions.fetchScriptEndpoints.completed,
      Actions.fetchScripts.completed,
      Actions.fetchSchedules.completed,
      Actions.fetchChannels.completed,
      () => {
        join.stop();
        this.setInstanceData();
      }
    );

    Actions.fetchClasses();
    Actions.fetchDataEndpoints();
    Actions.fetchScriptEndpoints();
    Actions.fetchScripts();
    Actions.fetchSchedules();
    Actions.fetchChannels();
  },

  onFetchClassesCompleted(obj) {
    this.data.instanceData.classes = obj;
  },

  onFetchScriptEndpointsCompleted(obj) {
    this.data.instanceData.scriptEndpoints = obj;
  },

  onFetchSchedulesCompleted(obj) {
    this.data.instanceData.schedules = obj;
  },

  onFetchDataEndpointsCompleted(obj) {
    this.data.instanceData.dataEndpoints = obj;
  },

  onFetchChannelsCompleted(obj) {
    this.data.instanceData.channels = obj;
  },

  onFetchScriptsCompleted(obj) {
    this.data.instanceData.scripts = obj.scripts;
  },

  onCreateVersionCompleted() {
    console.debug('AddVersionViewStore::onCreateSolutionCompleted');
    SessionStore.getRouter().push({ name: 'solutions-edit', params: SessionStore.getParams() });
  },

  onFetchInstancesCompleted(instances) {
    console.debug('SolutionVersionDialogStore::onFetchInstancesCompleted');
    Actions.setInstances(instances);
  }
});
