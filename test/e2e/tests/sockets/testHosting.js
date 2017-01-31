import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['hosting'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator edits a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const dropdownOption = hostingPage.elements.hostingListItemDropdownEditOption.selector;
    const domain = `${utils.randomString(10)}editedDomain`;
    const { instanceName } = instances.secondInstance;

    hostingPage
      .goToUrl(instanceName, 'hosting')
      .clickDropdown('@hostingDropdownIcon', dropdownOption)
      .fillInput('@descriptionInput', utils.addSuffix('edited'))
      .fillInput('@cnameInput', domain)
      .clickElement('@addHostingConfirmButton')
      .waitForElementPresent('@hostingList')
      .assert.containsText('@hostingListItemDescription', utils.addSuffix('edited'));
  }
});
