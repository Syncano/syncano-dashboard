import createTestAccount from '../create/testAccount.js';
import createTestInstances from '../create/testInstance.js';
import createTestClasses from '../create/testClasses.js';
import createTestDataEndpoints from '../create/testDataEndpoint.js';
import createTestScripts from '../create/testScripts.js';
import createAPNSSocket from '../create/apnsSocket.js';
import createGCMSocket from '../create/gcmSocket.js';
import createAPNSDevices from '../create/apnsDevices.js';
import createGCMDevices from '../create/gcmDevices.js';

const createAltInstanceUser = () => {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 1))
    .then((tempAccount) => createTestClasses(tempAccount, 1))
    .then((tempAccount) => createTestDataEndpoints(tempAccount, 2))
    .then((tempAccount) => createTestScripts(tempAccount, 1))
    .then((tempAccount) => createAPNSSocket(tempAccount))
    .then((tempAccount) => createGCMSocket(tempAccount))
    .then((tempAccount) => createAPNSDevices(tempAccount, 1))
    .then((tempAccount) => createGCMDevices(tempAccount, 1))
    .then((tempAccount) => {
      delete tempAccount.connection;
      return tempAccount;
    });
};

export default createAltInstanceUser;
