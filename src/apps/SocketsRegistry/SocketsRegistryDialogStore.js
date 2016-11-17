import Reflux from 'reflux';
import _ from 'lodash';

import { StoreFormMixin, DialogStoreMixin } from '../../mixins';
import Actions from './SocketsRegistryActions';
import SocketsActions from '../Sockets/SocketsActions';

import InstancesStore from '../Instances/InstancesStore';
import InstancesActions from '../Instances/InstancesActions';

export default Reflux.createStore({
  listenables: [
    Actions,
    SocketsActions
  ],
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendSocketRegistryAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'socket registry'
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      instance: '',
      name: '',
      metadata: {}
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

  onInstallSocketRegistry() {
    this.trigger({ isLoading: true });
  },

  onInstallSocketRegistryCompleted(payload, instanceName) {
    console.debug('SocketsRegistryDialogStore::onInstallSocketRegistryCompleted');
    Actions.getSocketRegistry(payload.name, instanceName, 'add');
  },

  onInstallSocketRegistryFailure() {
    console.debug('SocketRegistryDialogStore::onInstallSocketRegistryFailure');
    this.trigger({ isLoading: false });
  },

  onGetSocketRegistryCompleted(createdSocketRegistry, instanceName, action) {
    const getSocketRegistry = _.debounce(Actions.getSocketRegistry, 500, { leading: true });
    const actions = {
      processing: () => getSocketRegistry(createdSocketRegistry.name, instanceName),
      checking: () => getSocketRegistry(createdSocketRegistry.name, instanceName),
      ok: () => {
        this.trigger({ createdSocketRegistry, isLoading: false });
        Actions.changeStep(1);
        this.sendSocketRegistryAnalytics(action, createdSocketRegistry);
      },
      error: () => this.trigger({ feedback: createdSocketRegistry.status_info, isLoading: false })
    };

    actions[createdSocketRegistry.status]();
  },

  onUpdateSocket() {
    this.trigger({ isLoading: true });
  },

  onUpdateSocketCompleted(payload, instanceName) {
    Actions.getSocketRegistry(payload.name, instanceName, 'edit');
    SocketsActions.fetchSockets();
  },

  onUpdateSocketFailure() {
    this.trigger({ isLoading: false });
  }
});
