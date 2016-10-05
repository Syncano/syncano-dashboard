import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['demoApp'],

  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },

  after: (client, done) => client.end(done),

  'Admin install Demo Application': (client) => {
    const demoAppPage = client.page.demoAppPage();

    demoAppPage
      .navigate()
      .clickElement('@showDemoAppDetailsButton')
      .clickElement('@installDemoAppButton')
      .clickElement('@confirmInstallDemoAppButton')
      .waitForElementPresent('@currentInstanceName');
  }
});
