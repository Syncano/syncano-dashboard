import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  fetch: {},
  fetchTotalDailyUsage: {
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Usage.listTotalDailyUsage'
  },
  fetchBillingProfile: {
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Billing.getProfile'
  }
});
