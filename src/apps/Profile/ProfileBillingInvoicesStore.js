import Reflux from 'reflux';
import _ from 'lodash';

import ProfileActions from './ProfileActions';

import { SnackbarNotificationMixin, StoreHelpersMixin } from '../../mixins';

export default Reflux.createStore({
  listenables: ProfileActions,

  mixins: [
    SnackbarNotificationMixin,
    StoreHelpersMixin
  ],

  getInitialState() {
    return {
      isLoading: true,
      invoices: []
    };
  },

  init() {
    this.data = this.getInitialState();
  },

  onFetchInvoicesCompleted(invoices) {
    this.data.isLoading = false;
    this.data.invoices = invoices;
    this.trigger(this.data);
  },

  onFetchInvoicesFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRetryPayment(invoice) {
    this.data.invoices = _.map(this.data.invoices, (_invoice) => {
      _invoice.actionDisabled = _invoice.id === invoice.id;
      return _invoice;
    });

    this.trigger(this.data);
  },

  onRetryPaymentCompleted() {
    ProfileActions.fetchInvoices();
  },

  onRetryPaymentFailure(message) {
    this.data.invoices = _.map(this.data.invoices, (invoice) => {
      invoice.actionDisabled = false;
      return invoice;
    });

    this.setSnackbarNotification({ message: message.detail || message });
    this.trigger(this.data);
  }
});
