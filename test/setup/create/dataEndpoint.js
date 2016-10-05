import connection from './connection';
import _ from 'lodash';

const createTestDataEndpoints = (className, endpointsAmount) => {
  const dataEndpoints = _.times(endpointsAmount, (index) => {
    const name = `dataEndpoint_${Date.now()}${index}`;

    return connection.get().DataEndpoint({
      name,
      class: className
    });
  });

  return connection.get().DataEndpoint
    .please()
    .bulkCreate(dataEndpoints)
    .then((response) => {
      const dataEndpointsNames = response.map((createdDataEndpoint) => createdDataEndpoint.name);

      return dataEndpointsNames;
    })
    .catch((error) => console.log(error));
};

export default createTestDataEndpoints;
