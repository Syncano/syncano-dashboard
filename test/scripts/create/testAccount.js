import Syncano from 'syncano';
import globals from '../../e2e/globals.js';
import utils from '../../e2e/utils.js';

const createTestAccount = () => {
  const baseUrl = globals.apiBaseUrl;
  const connection = Syncano({ baseUrl });
  let tempAccount;

  const createAccount = () => {
    return connection
      .Account
      .register({
        email: tempAccount.email,
        password: tempAccount.password
      })
      .then((user) => {
        tempAccount.accountKey = user.account_key;

        connection.setAccountKey(user.account_key);
        return;
      })
      .catch((error) => console.error('createAccount', error));
  };

  const setup = () => {
    const { emailName, emailDomain } = utils.splitTestBaseEmail();
    const accountPassword = Date.now();

    tempAccount = {
      password: accountPassword,
      email: `${emailName}+${accountPassword}@${emailDomain}`
    };

    return createAccount()
      .then(() => {
        tempAccount.connection = connection;

        return tempAccount;
      });
  };

  return setup();
};

export default createTestAccount;
