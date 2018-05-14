import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';

const firstInstance = () => {
  const firstInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      firstInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestClasses(3);
    })
    .then((classNames) => {
      firstInstanceStructure.scriptsNames = classNames;

      return firstInstanceStructure;
    });
};

export default firstInstance;
