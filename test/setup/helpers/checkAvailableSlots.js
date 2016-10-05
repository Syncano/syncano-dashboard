import connection from '../create/connection';
import checkAccountLimits from './checkAccountLimits';

import _ from 'lodash';

const checkAvailableSlots = () => {
  const accountInfo = {};

  return connection.get().Instance
    .please()
    .list()
    .then((response) => {
      const existingInstances = [];

      _.forEach(response, (instance) => {
        existingInstances.push(instance.name);
      });

      accountInfo.existingInstancesCount = existingInstances.length;
      console.log('checkAvailableSlots::existingInstancesCount', accountInfo.existingInstancesCount);

      return checkAccountLimits();
    })
    .then((response) => {
      const maximumInstancesCount = response;
      const availableInstanceSlots = maximumInstancesCount - accountInfo.existingInstancesCount;

      console.log('checkAvailableSlots::countAfterCreating', availableInstanceSlots);

      if (availableInstanceSlots < 3) {
        throw new Error(`You have ${availableInstanceSlots} slot(s) for instances.
        Tests require 3 to use.
        Please delete unused test instances, old instances or upgrade your plan to start your tests.`);
      }
    });
};

export default checkAvailableSlots;
