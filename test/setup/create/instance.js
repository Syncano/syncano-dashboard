import connection from './connection';

const createInstance = () => {
  const instance = {
    name: `testInstance-${Date.now()}`,
    metadata: {
      testInstance: true
    }
  };

  return connection.get().Instance
    .please()
    .create(instance)
    .then((response) => response.name)
    .catch((error) => console.error('Instance error:\n', error.message));
};

export default createInstance;
