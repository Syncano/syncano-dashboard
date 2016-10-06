import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['customSocket', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds a Custom Socket': (client) => {
    const customSocketsPage = client.page.customSocketsPage();
    const { instanceName } = instances.thirdInstance;

    customSocketsPage
      .goToUrl(instanceName, 'custom-sockets')
      .waitForElementVisible('@addButtonZeroState');
  }
});
