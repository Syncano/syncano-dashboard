import createTestAccount from '../create/testAccount.js';
import createTestInstances from '../create/testInstance.js';
import createTestClasses from '../create/testClasses.js';
import createTestScripts from '../create/testScripts.js';
import createAPNSSocket from '../create/apnsSocket.js';
import createGCMSocket from '../create/gcmSocket.js';
import createAPNSDevices from '../create/apnsDevices.js';
import createGCMDevices from '../create/gcmDevices.js';

const createInstanceUser = () => {
  return createTestAccount()
    .then((tempAccount) => createTestInstances(tempAccount, 3))
    .then((tempAccount) => createTestClasses(tempAccount, 3))
    .then((tempAccount) => createTestScripts(tempAccount, 3))
    .then((tempAccount) => createAPNSSocket(tempAccount))
    .then((tempAccount) => createGCMSocket(tempAccount))
    .then((tempAccount) => createAPNSDevices(tempAccount, 2))
    .then((tempAccount) => createGCMDevices(tempAccount, 2))
    .then((tempAccount) => {
      delete tempAccount.connection;
      return tempAccount;
    });
};

export default createInstanceUser;
