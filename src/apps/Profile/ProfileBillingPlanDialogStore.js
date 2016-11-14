import Reflux from 'reflux';
import _ from 'lodash';

import { PricingPlansUtil } from '../../utils';
import { DialogStoreMixin, SnackbarNotificationMixin, StoreFormMixin, WaitForStoreMixin } from '../../mixins';

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
    ProfileBillingPlanDialogActions.getBillingPlans();
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

    const pricing = this.data.plan.pricing[type];
    const options = this.data.plan.options[type];
    const sliderValue = this.data[`${type}Selected`] || 0;
    const value = String(parseFloat(sliderValue));

    info = pricing[options[value]];
    info.total = options[value];

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

    return _.upperFirst(PricingPlansUtil.getPlanKey(apiLimit));
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

  onSelectPricingPlan(api, cbx, features) {
    this.data.selectedPricingPlan = { api, cbx, features };
    this.trigger(this.data);
  },

  onSliderChange(type, value) {
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

  onGetBillingPlans() {
    this.data.plan = PricingPlansUtil.getStoreBillingPlans();
    this.isLoading = false;
    this.trigger(this.data);
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

  onAddCardCompleted() {
    this.subscribe();
  },

  onUpdateBillingProfileFailure() {
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
