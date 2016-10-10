import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushDeviceGCM'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const { instanceName } = instances.firstInstance;
    const labelName = utils.addSuffix('androidlabel');
    const registrationId = utils.randomString(64);
    const deviceId = utils.randomInt(100, 1000);

    pushDevicesPage
      .goToUrl(instanceName, 'push-notifications/devices/gcm')
      .waitForElementVisible('@androidDevicesHeading');

    listsPage
      .clickElement('@addButton')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputRegistrationId', registrationId)
      .fillInput('@inputDeviceId', deviceId)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Edits Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const labelName = utils.addSuffix('androidlabel');
    const deviceId = utils.randomInt(100, 1000);

    pushDevicesPage.waitForElementVisible('@androidDevicesHeading');

    listsPage
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputDeviceId', deviceId)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Selects/Deselects Android Device': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client.singleItemSelectUnselect('synicon-android', optionsMenu, selectedItem);
  },
  'Test Admin Deletes Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const { gcmDevicesNames } = instances.firstInstance;
    const lastDeviceName = gcmDevicesNames[gcmDevicesNames.length - 1];

    pushDevicesPage.waitForElementVisible('@androidDevicesHeading');

    listsPage
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading');

    pushDevicesPage.verify.containsText('@firstDevice', lastDeviceName);
  }
});
