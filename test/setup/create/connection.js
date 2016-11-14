import Syncano from 'syncano';
import globals from '../../e2e/globals';

import generateCiCredentials from '../helpers/generateCiCredentials';

const baseUrl = globals.apiBaseUrl;
const credentials = {
  email: process.env.E2E_EMAIL,
  password: process.env.E2E_PASSWORD
};
let account = {};
let connection = new Syncano({ baseUrl });

const Account = {
  get() {
    return connection;
  },

  getAccount() {
    return account;
  },

  set(_connection) {
    connection = _connection;
  },

  setInstance(name) {
    connection.setInstanceName(name);
  },

  login(authentication = credentials) {
    return connection.Account
      .login(authentication)
      .then((response) => {
        connection.setAccountKey(response.account_key);
        account = response;
        ({ password: response.password } = authentication);

        return response;
      });
  },

  register() {
    const ciCredentials = generateCiCredentials();

    return connection.Account
      .register(ciCredentials)
      .then(() => ciCredentials);
  },

  init() {
    if (process.env.CI) {
      return Account.register().then((authentication) => Account.login(authentication));
    }
    return Account.login();
  },

  reset() {
    connection.setAccountKey(null);
  }
};

export default Account;
