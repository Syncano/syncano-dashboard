import _ from 'lodash';
import BillingPlans from '../constants/BillingPlans.json';

const PricingPlansUtil = {
  getPricingParams(planName) {
    const pricingParams = {
      Founder: {
        api: {
          minPrice: 6,
          maxPrice: 6
        },
        cbx: {
          minPrice: 3,
          maxPrice: 3
        }
      },
      Developer: {
        api: {
          minPrice: 20,
          maxPrice: 40
        },
        cbx: {
          minPrice: 5,
          maxPrice: 10
        }
      },
      Business: {
        api: {
          minPrice: 80,
          maxPrice: 1500
        },
        cbx: {
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

    return firstPlan.api.minPrice + firstPlan.cbx.minPrice;
  },

  // getLegendItems(type) {
  //   console.log('type', type);
  //   return ['$4', '$40', '$400', '$4000', '$40000', '$400000'];
  // },

  isPlanHidden(planName, currentApiPrice, currentCbxPrice) {
    const pricingParams = this.getPricingParams(planName);
    const pricingParamsMaxTotal = pricingParams.api.maxPrice + pricingParams.cbx.maxPrice;
    const currentTotal = currentApiPrice + currentCbxPrice;

    return currentTotal >= pricingParamsMaxTotal;
  },

  isDowngradePlanHidden(planName, currentApiPrice, currentCbxPrice) {
    const pricingParams = this.getPricingParams(planName);
    const pricingParamsMinTotal = pricingParams.api.minPrice + pricingParams.cbx.minPrice;
    const currentTotal = currentApiPrice + currentCbxPrice;

    return currentTotal <= pricingParamsMinTotal;
  },

  getOptions(field, minPrice, maxPrice) {
    // console.log('getOptions', field, minPrice, maxPrice);
    // console.log('BillingPlans.options', BillingPlans.options);
    const options = _.filter(BillingPlans.options[field], (value) => (
      _.inRange(value, minPrice - 1, maxPrice + 1)
    ));

    return _.map(options, (option) => (
      _.merge({}, { price: parseInt(option, 10) }, BillingPlans.pricing[field][option])
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

  getPlans(currentApiPrice, currentCbxPrice, isDowngrade) {
    if (isDowngrade) {
      return this.getDowngradePlans(currentApiPrice, currentCbxPrice);
    }

    return {
      Starter: {
        isCurrent: true,
        isHidden: currentApiPrice > 0,
        title: 'Starter',
        apiOptions: [{
          price: 0,
          included: 100000
        }],
        cbxOptions: [{
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
      Founder: {
        isHidden: true,
        title: 'Founder',
        apiOptions: this.getPlanOptions('api', 'Founder', currentApiPrice),
        cbxOptions: this.getPlanOptions('cbx', 'Founder', currentCbxPrice),
        features: [
          'Full access to all features',
          '60 requests per second',
          'Unlimited storage',
          '16 Instances (apps)',
          '8 concurrent Scripts',
          'Unlimited users'
        ]
      },
      Developer: {
        isHidden: this.isPlanHidden('Developer', currentApiPrice, currentCbxPrice),
        title: 'Developer',
        apiOptions: this.getPlanOptions('api', 'Developer', currentApiPrice),
        cbxOptions: this.getPlanOptions('cbx', 'Developer', currentCbxPrice),
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
        isHidden: this.isPlanHidden('Business', currentApiPrice, currentCbxPrice),
        title: 'Business',
        apiOptions: this.getPlanOptions('api', 'Business', currentApiPrice),
        cbxOptions: this.getPlanOptions('cbx', 'Business', currentCbxPrice),
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

  getDowngradePlans(currentApiPrice, currentCbxPrice) {
    const plans = this.getPlans();
    const downgradePlansDiffs = {
      Starter: {
        isHidden: true
      },
      Developer: {
        isHidden: this.isDowngradePlanHidden('Developer', currentApiPrice, currentCbxPrice),
        apiOptions: this.getPlanOptions('api', 'Developer', currentApiPrice, true),
        cbxOptions: this.getPlanOptions('cbx', 'Developer', currentCbxPrice, true)
      },
      Business: {
        isHidden: this.isDowngradePlanHidden('Business', currentApiPrice, currentCbxPrice),
        apiOptions: this.getPlanOptions('api', 'Business', currentApiPrice, true),
        cbxOptions: this.getPlanOptions('cbx', 'Business', currentCbxPrice, true)
      }
    };
    const downgradePlans = {
      Starter: _.defaults(downgradePlansDiffs.Starter, plans.Starter),
      Developer: _.defaults(downgradePlansDiffs.Developer, plans.Developer),
      Business: _.defaults(downgradePlansDiffs.Business, plans.Business)
    };

    return downgradePlans;
  }

  // getStoreBillingPlans() {
  //   const plans = BillingPlans;
  //
  //   // console.log('BillingPlans', BillingPlans);
  //
  //   plans.options.api = _.tail(plans.options.api);
  //   plans.options.cbx = _.tail(plans.options.cbx);
  //   plans.pricing.api = _.tail(plans.pricing.api);
  //   plans.pricing.cbx = _.tail(plans.pricing.cbx);
  //
  //   console.log('plans', plans);
  //
  //   return plans;
  // }
};

export default PricingPlansUtil;
