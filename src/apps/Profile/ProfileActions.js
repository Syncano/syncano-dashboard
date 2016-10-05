import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  updateSettings: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Profile.updateSettings'
  },
  changePassword: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Profile.changePassword'
  },
  setPassword: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Profile.setPassword'
  },
  fetchBillingProfile: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.getProfile'
  },
  updateBillingProfile: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.updateProfile'
  },
  resetKey: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Profile.resetKey'
  },
  fetchBillingCard: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.getCard'
  },
  addBillingCard: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.addCard'
  },
  updateBillingCard: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.updateCard'
  },
  deleteBillingCard: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.removeCard'
  },
  fetchInvoices: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.listInvoices'
  },
  retryPayment: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.retryPayment'
  }
});
