import connection from '../create/connection';
import _ from 'lodash';

const plansLimits = {
  builder: 4,
  'paid-commitment': 16
};

const checkAccountLimits = () => {
  return connection.get().Subscription
  .please()
  .list()
  .then((response) => {
    const plans = [];

    _.forEach(response, (plan) => {
      plans.push(plan.plan);
    });
    const currentPlan = plans[0];
    const currentLimit = plansLimits[currentPlan];

    console.log('checkAccountLimits::Subscriptions', currentLimit);
    return currentLimit;
  });
};

export default checkAccountLimits;
