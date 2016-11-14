import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestUsers from '../create/user';
import createTestApiKey from '../create/apiKey';
import createTestClasses from '../create/classes';

const thirdInstance = () => {
  const thirdInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      thirdInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestUsers(1);
    })
    .then((usersNames) => {
      thirdInstanceStructure.usersNames = usersNames;

      return createTestApiKey(1);
    })
    .then((apiKeyNames) => {
      thirdInstanceStructure.apiKeyNames = apiKeyNames;

      return createTestClasses(1);
    })
    .then((classNames) => {
      thirdInstanceStructure.classNames = classNames;

      return thirdInstanceStructure;
    });
};

export default thirdInstance;
