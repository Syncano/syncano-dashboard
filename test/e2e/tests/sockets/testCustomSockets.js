import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['customSocket'],
  before: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds a Custom Socket': (client) => {
    const customSocketsPage = client.page.customSocketsPage();
    const { instanceName } = accounts.navigationUser;

    customSocketsPage
      .goToUrl(instanceName, 'custom-sockets')
      .waitForElementVisible('@addButtonZeroState');
  }
});
