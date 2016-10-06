import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestScripts from '../create/scripts';
import createTestScriptEndpoints from '../create/scriptEndpoint';
import createTestUsers from '../create/user';
import createTestApiKey from '../create/apiKey';
import createTestClasses from '../create/classes';

const thirdInstance = () => {
  const thirdInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      console.log('thirdInstance::instanceName', instanceName);
      thirdInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestScripts(1);
    })
    .then((scriptsNames) => {
      console.log('thirdInstance::scriptsNames', scriptsNames);
      thirdInstanceStructure.scriptsNames = scriptsNames;

      return createTestScriptEndpoints(2);
    })
    .then((scriptEndpointsNames) => {
      console.log('thirdInstance::scriptEndpointsNames', scriptEndpointsNames);
      thirdInstanceStructure.scriptEndpointsNames = scriptEndpointsNames;

      return createTestUsers(1);
    })
    .then((usersNames) => {
      console.log('thirdInstance::usersNames', usersNames);
      thirdInstanceStructure.usersNames = usersNames;

      return createTestApiKey(1);
    })
    .then((apiKeyNames) => {
      console.log('thirdInstance::apiKeyNames', apiKeyNames);
      thirdInstanceStructure.apiKeyNames = apiKeyNames;

      return createTestClasses(1);
    })
    .then((classNames) => {
      console.log('thirdInstance::classNames', classNames);
      thirdInstanceStructure.classNames = classNames;

      return thirdInstanceStructure;
    });
};

export default thirdInstance;
