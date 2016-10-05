import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushDeviceAPNS', 'apns'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const { instanceName } = accounts.instanceUser;
    const labelName = utils.addSuffix('ioslabel');
    const registrationId = utils.randomString(64);

    pushDevicesPage
      .goToUrl(instanceName, 'push-notifications/devices/apns')
      .waitForElementVisible('@iosDevicesHeading');

    client.pause(500);

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

    // this pause won't be necessary when we add push devices stepper
    client.pause(1000);

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
    const { tempAPNSDevicesNames } = accounts.instanceUser;
    const lastDeviceName = tempAPNSDevicesNames[tempAPNSDevicesNames.length - 1];

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
