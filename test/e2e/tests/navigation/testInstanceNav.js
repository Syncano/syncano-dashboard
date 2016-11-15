import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instanceNav'],
  before: (client) => {
    const instancesPage = client.page.instancesPage();
    const { account_key: accountKey } = instances.account;

    instancesPage
      .loginUsingLocalStorage(accountKey)
      .setResolution(client)
      .navigate()
      .waitForElementVisible('@instancesListRowName')
      .clickElement('@instancesListRowButton');

    client.pause(500);
  },
  after: (client) => client.end(),
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
    const { instanceName } = instances.thirdInstance;
    const scriptEndpointName = instances.thirdInstance.scriptEndpointsNames[0];

    scriptEndpointTracesPage
      .goToUrl(instanceName, `script-endpoints/${scriptEndpointName}/traces`)
      .waitForElementPresent('@scriptEndpointTracesEmptyView');
  }
});
