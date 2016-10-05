import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instances'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Instances Dropdown': (client) => {
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const socketsPage = client.page.socketsPage();

    const instanceNames = [];

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTableName');
    const instanceName = instancesPage.elements.instancesTableName;

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

    socketsPage.waitForElementPresent('@emptySocketsHeading');
    const dropdown = leftMenuPage.elements.instancesDropdownName.selector;

    client.getText('xpath', dropdown, (text) => {
      client.assert.equal(text.value, instanceNames[0]);
    });
  },
  'Test Admin See Instance as Mainview': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const socketsPage = client.page.socketsPage();
    const baseUrl = utils.testBaseUrl();

    leftMenuPage
        .clickElement('@instancesDropdown')
        .clickElement('@userInstanceName');
    socketsPage.waitForElementPresent('@emptySocketsHeading');

    client.url(baseUrl);

    leftMenuPage.waitForElementPresent('@currentIinstanceName');
  }
});
