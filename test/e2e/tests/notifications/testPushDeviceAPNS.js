import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushDeviceAPNS', 'apns'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const { instanceName } = instances.firstInstance;
    const labelName = utils.addSuffix('ioslabel');
    const registrationId = utils.randomString(64);

    pushDevicesPage
      .goToUrl(instanceName, 'push-notifications/devices/apns')
      .waitForElementVisible('@iosDevicesHeading');

    listsPage
      .clickElement('@addButton')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputRegistrationId', registrationId)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Edits iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const labelName = utils.addSuffix('ioslabel');

    pushDevicesPage
      .waitForElementVisible('@iosDevicesHeading');

    listsPage
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputLabel', labelName)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Selects/Deselects iOS Device': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client.singleItemSelectUnselect('synicon-apple', optionsMenu, selectedItem);
  },
  'Test Admin Deletes iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const { apnsDevicesNames } = instances.firstInstance;
    const lastDeviceName = apnsDevicesNames[apnsDevicesNames.length - 1];

    pushDevicesPage.waitForElementVisible('@iosDevicesHeading');

    listsPage
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', lastDeviceName);
  }
});
