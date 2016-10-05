import Syncano from 'syncano';
import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['scripts'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User goes to Script edit view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = accounts.instanceUser;

    listsPage
      .goToUrl(instanceName, 'scripts')
      .clickElement('@firstItemRowName');

    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = accounts.instanceUser;
    const baseUrl = client.globals.apiBaseUrl;
    const { accountKey } = accounts.instanceUser;
    const connection = Syncano({
      baseUrl,
      accountKey,
      defaults: {
        instanceName
      }
    });

    listsPage
      .goToUrl(instanceName, 'scripts')
      .clickElement('@firstItemRowName');

    scriptEditPage
      .clickElement('@traces')
      .waitForElementPresent('@tracesEmpty')
      .runScriptAndClickReloadButton(scriptEditPage, connection, { id: 3 });
  }
});
