import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushDevicesAPNS', 'apns'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Select/Deselect multiple iOS Devices': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const { instanceName } = accounts.instanceUser;

    client
      .goToUrl(instanceName, 'push-notifications/devices/apns')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple iOS Devices': (client) => {
    const listsPage = client.page.listsPage();
    const pushDevicesPage = client.page.pushDevicesPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .pause(2000)
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton');

    pushDevicesPage
      .waitForElementVisible('@APNSDevicesEmptyListItem');
  }
});
