import Reflux from 'reflux';
import _ from 'lodash';

import { StoreFormMixin, DialogStoreMixin } from '../../mixins';
import Actions from './CustomSocketsRegistryActions';
import CustomSocketsActions from '../CustomSockets/CustomSocketsActions';

import InstancesStore from '../Instances/InstancesStore';
import InstancesActions from '../Instances/InstancesActions';

export default Reflux.createStore({
  listenables: [
    Actions,
    CustomSocketsActions
  ],
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendCustomSocketRegistryAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'custom socket registry'
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      instance: '',
      name: ''
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(InstancesActions.setInstances, this.getInstancesDropdown);
  },

  getInstancesDropdown() {
    const allUserInstances = InstancesStore.getAllInstances();
    const instancesWithPermission = _.filter(allUserInstances, (userInstance) => userInstance.role !== 'read');

    this.trigger({ userInstances: instancesWithPermission });
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 1 });
  },

  onInstallCustomSocketRegistry() {
    this.trigger({ isLoading: true });
  },

  onInstallCustomSocketRegistryCompleted(payload, instanceName) {
    console.debug('CustomSocketsRegistryDialogStore::onInstallCustomSocketRegistryCompleted');
    Actions.getCustomSocketRegistry(payload.name, instanceName, 'add');
  },

  onInstallCustomSocketRegistryFailure() {
    console.debug('CustomSocketRegistryDialogStore::onInstallCustomSocketRegistryFailure');
    this.trigger({ isLoading: false });
  },

  onGetCustomSocketRegistryCompleted(createdCustomSocketRegistry, instanceName, action) {
    const getCustomSocketRegistry = _.debounce(Actions.getCustomSocketRegistry, 500, { leading: true });
    const actions = {
      processing: () => getCustomSocketRegistry(createdCustomSocketRegistry.name, instanceName),
      checking: () => getCustomSocketRegistry(createdCustomSocketRegistry.name, instanceName),
      ok: () => {
        Actions.changeStep(1);
        this.trigger({ createdCustomSocketRegistry, isLoading: false });
        this.sendCustomSocketRegistryAnalytics(action, createdCustomSocketRegistry);
      },
      error: () => this.trigger({ feedback: createdCustomSocketRegistry.status_info, isLoading: false })
    };

    actions[createdCustomSocketRegistry.status]();
  },

  onUpdateCustomSocket() {
    this.trigger({ isLoading: true });
  },

  onUpdateCustomSocketCompleted(payload, instanceName) {
    Actions.getCustomSocketRegistry(payload.name, instanceName, 'edit');
    CustomSocketsActions.fetchCustomSockets();
  },

  onUpdateCustomSocketFailure() {
    this.trigger({ isLoading: false });
  }
});
