import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['demoApp'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

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
