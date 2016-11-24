import Reflux from 'reflux';
import Syncano from 'syncano';
import _ from 'lodash';

import { DialogStoreMixin, WaitForStoreMixin, StoreFormMixin } from '../../../mixins';

import SessionActions from '../../Session/SessionActions';
import APNSPushNotificationsSummaryDialogActions from './APNSPushNotificationsSummaryDialogActions';
import Actions from './APNSPushNotificationsActions';
import APNSDevicesActions from '../../PushDevices/APNSDevices/APNSDevicesActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    DialogStoreMixin,
    WaitForStoreMixin,
    StoreFormMixin
  ],

  getInitialState() {
    return {
      certificateTypes: ['development', 'production'],
      isCertLoading: true,
      development_certificate: null,
      development_certificate_name: null,
      development_expiration_date: null,
      development_bundle_identifier: null,
      production_certificate: null,
      production_certificate_name: null,
      production_expiration_date: null,
      production_bundle_identifier: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    Actions.fetchAPNSPushNotificationConfig();
    APNSDevicesActions.fetchAPNSConfig();
  },

  onFetchAPNSPushNotificationConfig() {
    this.data.isCertLoading = true;
    this.trigger(this.data);
  },

  onFetchAPNSPushNotificationConfigCompleted(config) {
    Object.keys(config).forEach((key) => {
      if (this.data.hasOwnProperty(key)) {
        this.data[key] = config[key];
      }
    });
    this.data.isCertLoading = false;
    this.trigger(this.data);
  },

  onConfigAPNSPushNotificationCompleted(config) {
    this.dismissDialog();
    this.refreshData();

    if (config.development_certificate || config.production_certificate) {
      APNSPushNotificationsSummaryDialogActions.showDialog();
    }
  },

  onSetCertificate(type, file) {
    const certificate = _.isArray(file) ? file[0] : file;

    const params = {
      [`${type}_certificate_name`]: certificate.name,
      [`${type}_certificate`]: Syncano.file(certificate)
    };

    this.data = { ...this.data, ...params };
    this.trigger(this.data);
  },

  onRemoveCertificate(type) {
    const params = {
      [`${type}_certificate`]: false,
      [`${type}_certificate_name`]: null,
      [`${type}_bundle_identifier`]: null
    };

    this.data = { ...this.data, ...params };
    this.trigger(this.data);
  }
});
