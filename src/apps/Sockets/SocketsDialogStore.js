import Reflux from 'reflux';
import _ from 'lodash';

import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin } from '../../mixins';
import Actions from './SocketsActions';

import InstancesStore from '../Instances/InstancesStore';
import InstancesActions from '../Instances/InstancesActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  sendSocketAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: ' socket '
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

  onInstallSocketCompleted(payload, instanceName) {
    Actions.getSocket(payload.name, instanceName, 'add');
  },

  onInstallSocketFailure() {
    this.trigger({ isLoading: false });
  },

  onGetSocketCompleted(createdSocket, instanceName, action) {
    const getSocket = _.debounce(Actions.getSocket, 500, { leading: true });
    const actions = {
      processing: () => getSocket(createdSocket.name, instanceName),
      checking: () => getSocket(createdSocket.name, instanceName),
      ok: () => {
        Actions.changeStep(1);
        this.sendSocketAnalytics(action, createdSocket);
        this.trigger({ createdSocket, isLoading: false });
      },
      error: () => this.trigger({ feedback: createdSocket.status_info, isLoading: false })
    };

    actions[createdSocket.status]();
  },

  onUpdateSocketCompleted(payload, instanceName) {
    Actions.getSocket(payload.name, instanceName, 'edit');
  },

  onUpdateSocketFailure() {
    this.trigger({ isLoading: false });
  }
});
