import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendPushAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Push Devices API', {
      type,
      deviceType: 'gcm',
      instance: payload.instanceName,
      registrationId: payload.registrationId,
      userId: payload.user
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isLoading: false,
      metadata: {}
    };
  },

  init() {
    this.listenToForms();
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 1 });
  },

  onCreateDevice() {
    this.trigger({ isLoading: true });
  },

  onCreateDeviceCompleted(payload) {
    console.debug('GCMDeviceDialogStore::onCreateDeviceCompleted');
    this.trigger({ createdDevice: payload, isLoading: false });
    Actions.changeStep(1);
    Actions.fetchDevices();
    this.sendPushAnalytics('add', payload);
  },

  onCreateDeviceFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateDevice() {
    this.trigger({ isLoading: true });
  },

  onUpdateDeviceCompleted(payload) {
    console.debug('GCMDeviceDialogStore::onUpdateDeviceCompleted');
    this.trigger({ createdDevice: payload, isLoading: false });
    Actions.changeStep(1);
    Actions.fetchDevices();
    this.sendPushAnalytics('edit', payload);
  },

  onUpdateDeviceFailure() {
    this.trigger({ isLoading: false });
  }
});
