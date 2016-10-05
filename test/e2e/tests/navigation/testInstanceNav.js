import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instanceNav'],
  before: (client) => {
    const instancesPage = client.page.instancesPage();
    const { accountKey } = accounts.navigationUser;

    instancesPage
      .loginUsingLocalStorage(accountKey)
      .setResolution(client)
      .navigate()
      .clickElement('@instancesTableName');

    client.pause(500);
  },
  after: (client) => client.end(),
  'User goes to Script traces view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const scriptsPage = client.page.scriptsPage();
    const scriptEditPage = client.page.scriptEditPage();

    leftMenuPage.clickElement('@snippets');
    // Workaround for endless loadings
    client.pause(1500);
    scriptsPage.clickElement('@scriptListItem');
    scriptEditPage
      .clickElement('@traces')
      .waitForElementPresent('@tracesEmpty')
      .clickElement('@tracesClose');
  },
  'User goes to Data Objects View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();
    const dataObjectsPage = client.page.dataObjectsPage();

    leftMenuPage.clickElement('@classes');
    classesPage.clickElement('@userClassListItem');
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Script Endpoint Traces View': (client) => {
    const scriptEndpointTracesPage = client.page.scriptEndpointTracesPage();
    const { instanceName } = accounts.navigationUser;
    const tempScriptEndpointsNames = accounts.navigationUser.tempScriptEndpointsNames[0];

    scriptEndpointTracesPage
      .goToUrl(instanceName, `script-endpoints/${tempScriptEndpointsNames}/traces`)
      .waitForElementPresent('@scriptEndpointTracesEmptyView');
  }
});
