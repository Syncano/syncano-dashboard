import Reflux from 'reflux';
import _ from 'lodash';

import { DialogStoreMixin, SnackbarNotificationMixin, StoreFormMixin, WaitForStoreMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './ProfileBillingPlanDialogActions';
import BillingPlanReceiptDialogActions from './ProfileBillingPlanReceiptDialogActions';

export default Reflux.createStore({
  listenables: Actions,

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
    console.debug('ProfileBillingPlanDialogStore::refreshData');
    Actions.fetchBillingPlans();
    Actions.fetchBillingSubscriptions();
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
    const sliderValue = this.data[`${type}Selected`];

    if (sliderValue) {
      const value = String(parseFloat(sliderValue));

      info = pricing[options[value]];
      info.total = options[value];

      return info;
    }

    info = pricing[Object.keys(pricing)[0]];
    info.total = Object.keys(pricing)[0];

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
    this.data.plan = plans[Object.keys(plans)[0]];
  },

  onSelectPricingPlan(apiCalls, scripts, features) {
    this.data.selectedPricingPlan = {
      api: apiCalls,
      cbx: scripts,
      features
    };

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
    Actions.updateBillingProfile({
      hard_limit: parseInt(this.data.total * 3, 10),
      soft_limit: parseInt(this.data.total * 1.5, 10)
    });
  },

  subscribe() {
    Actions.subscribePlan(this.data.plan.name, JSON.stringify({
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
      Actions.addCard(cardInfo);
    }
  },

  onFetchBillingPlansCompleted(payload) {
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
    BillingPlanReceiptDialogActions.showDialog();
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
