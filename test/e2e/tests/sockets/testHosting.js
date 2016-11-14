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
  'Administrator adds a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const hosting = utils.addSuffix('hosting');
    const domain = `${utils.randomString(10)}domain`;
    const { instanceName } = instances.secondInstance;

    hostingPage
      .goToUrl(instanceName, 'hosting')
      .clickElement('@addHostingButton')
      .fillInput('@nameInput', 'name')
      .fillInput('@descriptionInput', hosting)
      .fillInput('@cnameInput', domain)
      .clickElement('@addHostingConfirmButton')
      .waitForElementVisible('@hostingList');
  },
  'Administrator edits a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const dropdownOption = hostingPage.elements.hostingListItemDropdownEditOption.selector;
    const domain = `${utils.randomString(10)}editedDomain`;

    hostingPage
      .clickDropdown('@hostingDropdownIcon', dropdownOption)
      .fillInput('@descriptionInput', utils.addSuffix('edited'))
      .fillInput('@cnameInput', domain)
      .clickElement('@addHostingConfirmButton')
      .waitForElementPresent('@hostingList')
      .assert.containsText('@hostingListItemDescription', utils.addSuffix('edited'));
  },
  'Administrator sends file(s) to Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const testFileLocation = utils.getTestFileLocation();

    hostingPage
      .clickElement('@hostingListItemFilesLink')
      .waitForElementPresent('@hostingUploadFilesInput')
      .setValue('@hostingUploadFilesInput', testFileLocation)
      .clickElement('@hostingSendFilesButton')
      .waitForElementVisible('@hostingFilesListItem')
      .assert.elementNotPresent('@hostingFilesAlertIcon')
      .clickElement('@innerToolbarBackButton');
  },
  'Administrator deletes a Hosting Socket': (client) => {
    const hostingPage = client.page.hostingPage();
    const dropdownOption = hostingPage.elements.hostingListItemDropdownDeleteOption.selector;

    hostingPage
      .clickDropdown('@hostingDropdownIcon', dropdownOption)
      .clickElement('@deleteHostingConfirmButton');
  }
});
