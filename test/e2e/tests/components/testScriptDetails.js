import Syncano from 'syncano';
import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['scripts'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User goes to Script edit view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = instances.firstInstance;

    listsPage
      .goToUrl(instanceName, 'scripts')
      .clickElement('@firstItemRowName');

    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const listsPage = client.page.listsPage();
    const scriptEditPage = client.page.scriptEditPage();
    const { instanceName } = instances.firstInstance;
    const baseUrl = client.globals.apiBaseUrl;
    const { account_key: accountKey } = instances.account;
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
