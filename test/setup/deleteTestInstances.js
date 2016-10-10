import createConnection from './create/connection';
import deleteInstance from './delete/instance';
import tempInstances from '../e2e/tempInstances';

const credentials = {
  email: tempInstances.account.email,
  password: tempInstances.account.password
};

createConnection.login(credentials)
  .then(() => deleteInstance(tempInstances))
  .catch((error) => console.error('Cleanup error:\n', error.message));
