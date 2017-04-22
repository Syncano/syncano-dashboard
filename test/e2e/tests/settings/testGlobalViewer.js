import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['globalViewer'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator views global config': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const globalsViewerPage = client.page.globalsViewerPage();
    const { instanceName } = instances.firstInstance;

    leftMenuPage
      .goToUrl(instanceName, 'sockets')
      .clickElement('@globalConfig');

    globalsViewerPage
      .waitForElementPresent('@globalConfigViewer')
      .clickElement('@globalConfigCloseButton')
      .waitForElementNotPresent('@globalConfigViewer');
  }
});
