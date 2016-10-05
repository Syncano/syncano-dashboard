import connection from './connection';
import _ from 'lodash';

const createTestScriptEndpoints = (endpointsAmount) => {
  const scriptEndpoints = _.times(endpointsAmount, (index) => {
    const name = `scriptEndpoint_${Date.now()}${index}`;
    const script = 1;

    return connection.get().ScriptEndpoint({
      name,
      script
    });
  });

  return connection.get().ScriptEndpoint
    .please()
    .bulkCreate(scriptEndpoints)
    .then((response) => {
      const scriptEndpointsNames = response.map((createdScriptEndpoint) => createdScriptEndpoint.name);

      return scriptEndpointsNames;
    })
    .catch((error) => console.log(error));
};

export default createTestScriptEndpoints;
