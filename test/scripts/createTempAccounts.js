import createInstanceUser from './profile/instanceUser.js';
import createAltInstanceUser from './profile/altInstanceUser.js';
import createNavigationUser from './profile/navigationUser.js';

import getCertFile from './files/getCertificate.js';
import saveAccountsToFile from './files/saveAccounts.js';


const accounts = {};

if (process.env.CI) {
  getCertFile();
}

createInstanceUser()
  .then((tempAccount) => accounts.instanceUser = tempAccount)
  .then(createAltInstanceUser)
  .then((tempAccount) => accounts.alternativeUser = tempAccount)
  .then(createNavigationUser)
  .then((tempAccount) => accounts.navigationUser = tempAccount)
  .then(() => {
    console.log('Account details for debugging:\n', accounts);
    saveAccountsToFile(accounts);
  })
  .catch((error) => console.error(error));
