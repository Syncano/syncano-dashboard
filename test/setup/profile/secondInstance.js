import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';

const secondInstance = () => {
  const secondInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      secondInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestClasses(3);
    })
    .then((classNames) => {
      secondInstanceStructure.classNames = classNames;

      return secondInstanceStructure;
    });
};

export default secondInstance;
