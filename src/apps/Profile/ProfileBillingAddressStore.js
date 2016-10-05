import Reflux from 'reflux';

import { StoreFormMixin, SnackbarNotificationMixin } from '../../mixins';

import Actions from './ProfileActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    SnackbarNotificationMixin
  ],

  init() {
    this.listenToForms();
  },

  onFetchBillingProfileCompleted(payload) {
    this.trigger(payload);
  },

  onUpdateBillingProfileCompleted() {
    this.setSnackbarNotification({
      message: 'Billing address changed successfully'
    });
  }
});
