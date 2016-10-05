import createConnection from './create/connection';
import deleteInstance from './delete/instance';
import tempInstances from '../e2e/tempInstances';

createConnection.init()
  .then(() => deleteInstance(tempInstances))
  .catch((error) => console.error('Cleanup error:\n', error.message));
