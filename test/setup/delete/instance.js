import connection from '../create/connection';
import _ from 'lodash';

const deleteInstance = (instances) => {
  _.forEach(instances, (instance) => {
    connection.get().Instance
      .please()
      .delete({ name: instance.instanceName })
      .then(() => console.log(`deleteInstance::${instance.instanceName} was deleted.`))
      .catch((error) => console.error('Instance delete error:\n', error.message));
  });

  return instances;
};

export default deleteInstance;
