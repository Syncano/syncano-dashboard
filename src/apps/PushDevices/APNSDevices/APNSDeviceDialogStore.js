import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../../mixins';

// Stores & Actions
import Actions from './APNSDevicesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  sendPushAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Push Devices API', {
      type,
      deviceType: 'apns',
      instance: payload.instanceName,
      registrationId: payload.registrationId,
      userId: payload.user
    });
  },

  getInitialState() {
    return {
      stepIndex: 0,
      isLoading: false
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
    console.debug('DeviceDialogStore::onCreateDeviceCompleted');
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
    console.debug('DeviceDialogStore::onUpdateDeviceCompleted');
    this.trigger({ createdDevice: payload, isLoading: false });
    Actions.changeStep(1);
    Actions.fetchDevices();
    this.sendPushAnalytics('edit', payload);
  },

  onUpdateDeviceFailure() {
    this.trigger({ isLoading: false });
  }
});
