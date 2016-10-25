import connection from '../create/connection';
import _ from 'lodash';

const plansLimits = {
  builder: 4,
  'paid-commitment': 16
};

const checkAccountLimits = () => connection.get()
  .Subscription
  .please()
  .list()
  .then((response) => {
    const plans = [];

    _.forEach(response, (plan) => {
      plans.push(plan.plan);
    });
    const currentPlan = plans[0];
    const currentLimit = plansLimits[currentPlan];

    return currentLimit;
  });

export default checkAccountLimits;
