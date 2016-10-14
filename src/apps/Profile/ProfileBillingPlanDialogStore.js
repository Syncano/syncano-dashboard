import Reflux from 'reflux';
import _ from 'lodash';

import { DialogStoreMixin, SnackbarNotificationMixin, StoreFormMixin, WaitForStoreMixin } from '../../mixins';
// import PricingPlansUtil from '../../utils/PricingPlansUtil';

import ProfileBillingPlanDialogActions from './ProfileBillingPlanDialogActions';
import ProfileBillingPlanReceiptDialogActions from './ProfileBillingPlanReceiptDialogActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: ProfileBillingPlanDialogActions,

  mixins: [
    DialogStoreMixin,
    SnackbarNotificationMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  init() {
    this.data = {};
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    ProfileBillingPlanDialogActions.fetchBillingPlans();
    ProfileBillingPlanDialogActions.fetchBillingSubscriptions();
  },

  getInfo(type) {
    let info = {
      included: 0,
      overage: 0,
      total: 0
    };

    if (!this.data.plan) {
      return info;
    }

    if (this.isSelectedPricingPlan()) {
      info = this.data.selectedPricingPlan[type];
      info.total = this.data.selectedPricingPlan[type].price;

      return info;
    }

    // const storeBillingPlans = PricingPlansUtil.getStoreBillingPlans();

    const pricing = this.data.plan.pricing[type];
    const options = this.data.plan.options[type];
    // const pricing = storeBillingPlans.pricing[type];
    // const options = storeBillingPlans.options[type];
    const sliderValue = this.data[`${type}Selected`];

    if (sliderValue) {
      const value = String(parseFloat(sliderValue));

      info = pricing[options[value]];
      info.total = options[value];

      return info;
    }

    info = pricing[Object.keys(pricing)[0]];
    info.total = Object.keys(pricing)[0];
    // info.total = 123;

    return info;
  },

  getTotalPlanValue() {
    return parseInt(this.getInfo('api').total, 10) + parseInt(this.getInfo('cbx').total, 10);
  },

  getSelectedPricingPlanName() {
    let apiLimit = this.getInfo('api').included;

    if (this.isSelectedPricingPlan()) {
      apiLimit = this.data.selectedPricingPlan.api.included;
    }

    let selectedPricingPlanName = 'Starter';

    if (_.inRange(apiLimit, 999999, 2000001)) {
      selectedPricingPlanName = 'Developer';
    }

    if (_.inRange(apiLimit, 4499999, 100000001)) {
      selectedPricingPlanName = 'Business';
    }

    return selectedPricingPlanName;
  },

  resetSelectedPricingPlan() {
    this.data.selectedPricingPlan = null;
  },

  getFeatures() {
    if (!this.isSelectedPricingPlan()) {
      return null;
    }

    return this.data.selectedPricingPlan.features;
  },

  setPlans(plans) {
    console.log('setPlans::plans', plans);
    this.data.plan = plans[Object.keys(plans)[0]];
    this.trigger(this.data);
  },

  onSelectPricingPlan(api, cbx, features) {
    this.data.selectedPricingPlan = { api, cbx, features };
    this.trigger(this.data);
  },

  onSliderChange(type, event, value) {
    this.data[`${type}Selected`] = value;
    this.trigger(this.data);
  },

  onSliderLabelsClick(value, type) {
    this.data[`${type}Selected`] = value;
    this.trigger(this.data);
  },

  setLimits() {
    ProfileBillingPlanDialogActions.updateBillingProfile({
      hard_limit: parseInt(this.data.total * 3, 10),
      soft_limit: parseInt(this.data.total * 1.5, 10)
    });
  },

  subscribe() {
    ProfileBillingPlanDialogActions.subscribePlan(this.data.plan.name, JSON.stringify({
      api: String(this.data.apiTotal),
      cbx: String(this.data.cbxTotal)
    }));
  },

  isSelectedPricingPlan() {
    return this.data.selectedPricingPlan && true;
  },

  onSubmitPlan(cardInfo) {
    this.data.apiTotal = this.getInfo('api').total;
    this.data.cbxTotal = this.getInfo('cbx').total;
    this.data.total = parseInt(this.data.apiTotal, 10) + parseInt(this.data.cbxTotal, 10);

    if (this.data.card) {
      this.subscribe();
    } else {
      ProfileBillingPlanDialogActions.addCard(cardInfo);
    }
  },

  onFetchBillingPlansCompleted(payload) {
    // const plans = PricingPlansUtil.getStoreData(payload);

    console.log('payload', payload);

    this.isLoading = false;
    this.setPlans(payload);
  },

  onFetchBillingCardCompleted(payload) {
    this.data.card = payload;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchBillingCardFailure() {
    this.data.isLoading = false;
    this.data.card = null;
    this.trigger(this.data);
  },

  onSubscribePlan() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onSubscribePlanCompleted() {
    this.setLimits();
    ProfileBillingPlanReceiptDialogActions.showDialog();
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onSubscribePlanFailure(payload) {
    this.data.isLoading = false;
    this.trigger(this.data);
    this.setSnackbarNotification({
      message: payload.message
    });
  },

  onUpdateCard() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onUpdateCardCompleted() {
    this.subscribe();
  },

  onUpdateCardFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onAddCardCompleted() {
    this.subscribe();
  },

  onAddCardFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUpdateBillingProfileFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
