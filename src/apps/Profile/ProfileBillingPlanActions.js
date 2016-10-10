import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  fetch: {},
  setBillingPlan: {},
  setChartLegend: {},
  setOverage: {},

  cancelSubscriptionRequest: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.cancelSubscriptionRequest'
  },
  cancelSubscriptions: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.cancelSubscriptions'
  },
  fetchBillingProfile: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.getProfile'
  },
  updateBillingProfile: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.updateProfile'
  },
  fetchBillingCard: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.getCard'
  },
  fetchBillingSubscriptions: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.listSubscriptions'
  }
});
