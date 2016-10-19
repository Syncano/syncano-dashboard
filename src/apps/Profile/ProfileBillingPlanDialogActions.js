import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    selectPricingPlan: {},
    setInstances: {},
    sliderChange: {},
    submitPlan: {},
    getBillingPlans: {},
    updateBillingProfile: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Billing.updateProfile'
    },
    subscribePlan: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Billing.subscribePlan'
    },
    fetchBillingCard: {
      asyncResult: true,
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
    },
    addCard: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Billing.addCard'
    },
    updateCard: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Billing.updateCard'
    }
  },
  {
    withDialog: true
  }
);
