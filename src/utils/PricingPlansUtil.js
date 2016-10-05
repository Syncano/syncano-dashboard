import _ from 'lodash';
import BillingPlans from '../constants/BillingPlans';

const PricingPlansUtil = {
  getKeyName() {
    return {
      apiCalls: 'api',
      scripts: 'cbx'
    };
  },

  getPricingParams(planName) {
    const pricingParams = {
      Developer: {
        apiCalls: {
          minPrice: 20,
          maxPrice: 40
        },
        scripts: {
          minPrice: 5,
          maxPrice: 10
        }
      },
      Business: {
        apiCalls: {
          minPrice: 80,
          maxPrice: 1500
        },
        scripts: {
          minPrice: 5,
          maxPrice: 1500
        }
      }
    };

    if (!planName) {
      return pricingParams;
    }

    return pricingParams[planName];
  },

  getLowestPrice() {
    const pricingParams = this.getPricingParams();
    const firstPlan = pricingParams[Object.keys(pricingParams)[0]];

    return firstPlan.apiCalls.minPrice + firstPlan.scripts.minPrice;
  },

  isPlanHidden(planName, currentAPIPrice, currentScriptsPrice) {
    const pricingParams = this.getPricingParams(planName);
    const pricingParamsMaxTotal = pricingParams.apiCalls.maxPrice + pricingParams.scripts.maxPrice;
    const currentTotal = currentAPIPrice + currentScriptsPrice;

    return currentTotal >= pricingParamsMaxTotal;
  },

  isDowngradePlanHidden(planName, currentAPIPrice, currentScriptsPrice) {
    const pricingParams = this.getPricingParams(planName);
    const pricingParamsMinTotal = pricingParams.apiCalls.minPrice + pricingParams.scripts.minPrice;
    const currentTotal = currentAPIPrice + currentScriptsPrice;

    return currentTotal <= pricingParamsMinTotal;
  },

  getOptions(field, minPrice, maxPrice) {
    const keyName = this.getKeyName();
    const options = _.filter(BillingPlans.objects[0].options[keyName[field]], (value) => (
      _.inRange(value, minPrice - 1, maxPrice + 1)
    ));

    return _.map(options, (option) => (
      _.merge({}, { price: parseInt(option, 10) }, BillingPlans.objects[0].pricing[keyName[field]][option])
    ));
  },

  getPlanOptions(field, pricingPlanName, currentPrice, isDowngrade) {
    const pricingParams = this.getPricingParams();
    let minPrice = pricingParams[pricingPlanName][field].minPrice;
    let maxPrice = pricingParams[pricingPlanName][field].maxPrice;

    if (isDowngrade && maxPrice > currentPrice) {
      maxPrice = currentPrice;
    }

    if (!isDowngrade && minPrice < currentPrice) {
      minPrice = currentPrice;
    }

    if (minPrice > maxPrice) {
      maxPrice = minPrice;
    }

    return this.getOptions(field, minPrice, maxPrice);
  },

  getPlans(currentAPIPrice, currentScriptsPrice, isDowngrade) {
    if (isDowngrade) {
      return this.getDowngradePlans(currentAPIPrice, currentScriptsPrice);
    }

    return {
      Starter: {
        isCurrent: true,
        isHidden: currentAPIPrice > 0,
        title: 'Starter',
        apiCallsOptions: [{
          price: 0,
          included: 100000
        }],
        scriptsOptions: [{
          price: 0,
          included: 10000
        }],
        features: [
          'Full access to all features',
          '60 requests per second',
          '10GB of storage',
          '4 Instances (apps)',
          '2 concurrent Scripts',
          'Unlimited users'
        ],
        price: 'Free',
        disabled: true
      },
      Developer: {
        isHidden: this.isPlanHidden('Developer', currentAPIPrice, currentScriptsPrice),
        title: 'Developer',
        apiCallsOptions: this.getPlanOptions('apiCalls', 'Developer', currentAPIPrice),
        scriptsOptions: this.getPlanOptions('scripts', 'Developer', currentScriptsPrice),
        features: [
          'Full access to all features',
          '60 requests per second',
          'Unlimited storage',
          '16 Instances (apps)',
          '8 concurrent Scripts',
          'Unlimited users'
        ]
      },
      Business: {
        isHidden: this.isPlanHidden('Business', currentAPIPrice, currentScriptsPrice),
        title: 'Business',
        apiCallsOptions: this.getPlanOptions('apiCalls', 'Business', currentAPIPrice),
        scriptsOptions: this.getPlanOptions('scripts', 'Business', currentScriptsPrice),
        features: [
          'Full access to all features',
          '60 requests per second',
          'Unlimited storage',
          '16 Instances (apps)',
          '8 concurrent Scripts',
          'Unlimited users'
        ]
      }
    };
  },

  getDowngradePlans(currentAPIPrice, currentScriptsPrice) {
    const plans = this.getPlans();
    const downgradePlansDiffs = {
      Starter: {
        isHidden: true
      },
      Developer: {
        isHidden: this.isDowngradePlanHidden('Developer', currentAPIPrice, currentScriptsPrice),
        apiCallsOptions: this.getPlanOptions('apiCalls', 'Developer', currentAPIPrice, true),
        scriptsOptions: this.getPlanOptions('scripts', 'Developer', currentScriptsPrice, true)
      },
      Business: {
        isHidden: this.isDowngradePlanHidden('Business', currentAPIPrice, currentScriptsPrice),
        apiCallsOptions: this.getPlanOptions('apiCalls', 'Business', currentAPIPrice, true),
        scriptsOptions: this.getPlanOptions('scripts', 'Business', currentScriptsPrice, true)
      }
    };
    const downgradePlans = {
      Starter: _.defaults(downgradePlansDiffs.Starter, plans.Starter),
      Developer: _.defaults(downgradePlansDiffs.Developer, plans.Developer),
      Business: _.defaults(downgradePlansDiffs.Business, plans.Business)
    };

    return downgradePlans;
  }
};

export default PricingPlansUtil;
