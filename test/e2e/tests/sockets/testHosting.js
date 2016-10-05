import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['hosting'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => {
    client.end();
  },
  'Administrator adds a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const hosting = utils.addSuffix('hosting');
    const domain = `${utils.randomString(10)}domain`;
    const { instanceName } = accounts.alternativeUser;

    hostingPage
      .goToUrl(instanceName, 'hosting')
      .clickElement('@addHostingButton')
      .fillInput('@labelInput', hosting)
      .fillInput('@descriptionInput', hosting)
      .clickElement('@domainsInput');

    client.keys(domain.split(''));

    hostingPage
      .clickElement('@enteredDomainHintOption')
      .clickElement('@addHostingConfirmButton')
      .waitForElementVisible('@hostingList');
  },
  'Administrator edits a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const dropdownOption = hostingPage.elements.hostingListItemDropdownEditOption.selector;

    hostingPage
      .clickDropdown('@hostingDropdownIcon', dropdownOption)
      .fillInput('@labelInput', utils.addSuffix('edited'))
      .fillInput('@descriptionInput', utils.addSuffix('edited'))
      .clickElement('@addHostingConfirmButton')
      .waitForElementPresent('@hostingList')
      .assert.containsText('@hostingListItemLabel', utils.addSuffix('edited'))
      .assert.containsText('@hostingListItemDescription', utils.addSuffix('edited'));
  },
  'Administrator deletes a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const dropdownOption = hostingPage.elements.hostingListItemDropdownDeleteOption.selector;

    hostingPage
      .clickDropdown('@editedHostingDropdownIcon', dropdownOption)
      .clickElement('@deleteHostingConfirmButton');
  }
});
