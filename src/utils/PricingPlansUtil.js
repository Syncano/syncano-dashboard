import _ from 'lodash';
import BillingPlans from '../constants/BillingPlans.json';

const PricingPlansUtil = {
  getPricingParams(planName) {
    const pricingParams = {
      founder: {
        api: {
          minPrice: 6,
          maxPrice: 6
        },
        cbx: {
          minPrice: 3,
          maxPrice: 3
        }
      },
      developer: {
        api: {
          minPrice: 20,
          maxPrice: 40
        },
        cbx: {
          minPrice: 5,
          maxPrice: 10
        }
      },
      business: {
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
    const params = pricingParams.developer;

    return params.api.minPrice + params.cbx.minPrice;
  },

  isPlanHidden(planName, currentApiPrice, currentCbxPrice, mode) {
    const pricingParams = this.getPricingParams(planName);

    if (mode === 'downgrade') {
      const pricingParamsMinTotal = pricingParams.api.minPrice + pricingParams.cbx.minPrice;
      const currentTotal = currentApiPrice + currentCbxPrice;

      return currentTotal <= pricingParamsMinTotal;
    }

    const pricingParamsMaxTotal = pricingParams.api.maxPrice + pricingParams.cbx.maxPrice;
    const currentTotal = currentApiPrice + currentCbxPrice;

    return currentTotal >= pricingParamsMaxTotal;
  },

  getOptions(field, minPrice, maxPrice) {
    const options = _.filter(BillingPlans.options[field], (value) => (
      _.inRange(value, minPrice, maxPrice + 1)
    ));

    return _.map(options, (option) => (
      _.merge({}, { price: parseInt(option, 10) }, BillingPlans.pricing[field][option])
    ));
  },

  getPlanOptions(field, pricingPlanName, currentPrice, mode) {
    const pricingParams = this.getPricingParams();
    let minPrice = pricingParams[pricingPlanName][field].minPrice;
    let maxPrice = pricingParams[pricingPlanName][field].maxPrice;

    if (mode === 'downgrade' && maxPrice > currentPrice) {
      maxPrice = currentPrice;
    }

    if (mode !== 'downgrade' && minPrice < currentPrice) {
      minPrice = currentPrice;
    }

    if (minPrice > maxPrice) {
      maxPrice = minPrice;
    }

    return this.getOptions(field, minPrice, maxPrice);
  },

  getPricingPlans(mode, currentPrices) {
    switch (mode) {
      case 'downgrade':
        return this.getDowngradePlans(currentPrices);
      case 'promo-plan-nine':
        return this.getPromoPlans(currentPrices);
      default:
        return this.getPlans(currentPrices);
    }
  },

  getPlans(currentPrices) {
    const { api, cbx } = currentPrices;

    return {
      starter: {
        isCurrent: api === 0,
        isHidden: api > 0,
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
      founder: {
        isHidden: true,
        title: 'Founder',
        apiOptions: this.getPlanOptions('api', 'founder', api),
        cbxOptions: this.getPlanOptions('cbx', 'founder', cbx),
        features: [
          'Full access to all features',
          '60 requests per second',
          'Unlimited storage',
          '16 Instances (apps)',
          '8 concurrent Scripts',
          'Unlimited users'
        ]
      },
      developer: {
        isHidden: this.isPlanHidden('developer', api, cbx),
        title: 'Developer',
        apiOptions: this.getPlanOptions('api', 'developer', api),
        cbxOptions: this.getPlanOptions('cbx', 'developer', cbx),
        features: [
          'Full access to all features',
          '60 requests per second',
          'Unlimited storage',
          '16 Instances (apps)',
          '8 concurrent Scripts',
          'Unlimited users'
        ]
      },
      business: {
        isHidden: this.isPlanHidden('business', api, cbx),
        title: 'Business',
        apiOptions: this.getPlanOptions('api', 'business', api),
        cbxOptions: this.getPlanOptions('cbx', 'business', cbx),
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

  getDowngradePlans(currentPrices) {
    const { api, cbx } = currentPrices;
    const plans = this.getPlans();
    const downgradePlansDiffs = {
      starter: {
        isHidden: true
      },
      developer: {
        isHidden: this.isPlanHidden('developer', api, cbx, 'downgrade'),
        apiOptions: this.getPlanOptions('api', 'developer', api, 'downgrade'),
        cbxOptions: this.getPlanOptions('cbx', 'developer', cbx, 'downgrade')
      },
      business: {
        isHidden: this.isPlanHidden('business', api, cbx, 'downgrade'),
        apiOptions: this.getPlanOptions('api', 'business', api, 'downgrade'),
        cbxOptions: this.getPlanOptions('cbx', 'business', cbx, 'downgrade')
      }
    };
    const downgradePlans = {
      starter: _.defaults(downgradePlansDiffs.starter, plans.starter),
      developer: _.defaults(downgradePlansDiffs.developer, plans.developer),
      business: _.defaults(downgradePlansDiffs.business, plans.business)
    };

    return downgradePlans;
  },

  getPromoPlans(currentPrices) {
    const { api, cbx } = currentPrices;
    const plans = this.getPlans(currentPrices);
    const promoPlansDiffs = {
      founder: {
        isHidden: this.isPlanHidden('founder', api, cbx),
        isFeatured: true
      }
    };
    const promoPlans = {
      starter: _.defaults(promoPlansDiffs.starter, plans.starter),
      founder: _.defaults(promoPlansDiffs.founder, plans.founder),
      developer: _.defaults(promoPlansDiffs.developer, plans.developer),
      business: _.defaults(promoPlansDiffs.business, plans.business)
    };

    return promoPlans;
  },

  getStoreBillingPlans() {
    const founderParams = this.getPricingParams('founder');
    const apiOptions = _.filter(BillingPlans.options.api, (value) => value > founderParams.api.maxPrice);
    const cbxOptions = _.filter(BillingPlans.options.cbx, (value) => value > founderParams.cbx.maxPrice);
    const plans = {
      options: {
        api: apiOptions,
        cbx: cbxOptions
      },
      name: BillingPlans.name,
      links: BillingPlans.links,
      pricing: BillingPlans.pricing
    };

    return plans;
  },

  getPlanKey(apiLimit) {
    let planName = 'starter';

    if (apiLimit === 200000) {
      planName = 'founder';
    }

    if (_.inRange(apiLimit, 1000000, 2000001)) {
      planName = 'developer';
    }

    if (_.inRange(apiLimit, 4500000, 100000001)) {
      planName = 'business';
    }

    return planName;
  }
};

export default PricingPlansUtil;
