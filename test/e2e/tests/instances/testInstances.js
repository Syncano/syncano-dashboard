import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instances'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.getChromeLogs().end(),
  'Test Instances Dropdown': (client) => {
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const instanceName = instancesPage.elements.instancesTableName;
    const dropdown = leftMenuPage.elements.instancesDropdownName.selector;

    const instanceNames = [];

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTableName');

    client.elements(instanceName.locateStrategy, instanceName.selector, (result) => {
      result.value.forEach((value) => {
        client.elementIdText(value.ELEMENT, (el) => {
          instanceNames.push(el.value);
        });
      });
    });

    instancesPage
      .clickElement('@instancesTableName');
    leftMenuPage
      .clickElement('@instancesDropdown')
      .clickElement('@instancesListSecondItem');

    client.getText('xpath', dropdown, (text) => {
      client.assert.equal(text.value, instanceNames[0]);
    });
  },
  'Test Admin See Instance as Main view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const baseUrl = utils.testBaseUrl();

    leftMenuPage
        .clickElement('@instancesDropdown')
        .clickElement('@userInstanceName');

    client.url(baseUrl);

    leftMenuPage.waitForElementPresent('@currentInstanceName');
  }
});
