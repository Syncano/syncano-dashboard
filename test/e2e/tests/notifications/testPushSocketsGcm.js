import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushSocketsGcm'],
  before: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Adds GCM Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const gcmDevKey = utils.randomString(39);
    const { instanceName } = accounts.navigationUser;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config')
      .clickElement('@addPushNotificationButton')
      .clickElement('@addGcmSocket')
      .fillInput('@inputGcmDevKey', gcmDevKey)
      .clickElement('@pushNotificationsSubmit')
      .clickElement('@gcmPushNotifciationsCloseDialog');
  },
  'Test Admin Edits GCM Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const gcmDevKey = utils.randomString(39);
    const gcmProdKey = utils.randomString(39);

    client.pause(500);

    socketsPage
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
      .fillInput('@inputGcmDevKey', gcmDevKey)
      .fillInput('@inputGcmProdKey', gcmProdKey)
      .clickElement('@pushNotificationsSubmit')
      .clickElement('@gcmPushNotifciationsCloseDialog')
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
      .verify.valueContains('@inputGcmDevKey', gcmDevKey)
      .verify.valueContains('@inputGcmProdKey', gcmProdKey)
      .clickElement('@pushNotificationsSubmit')
      .clickElement('@gcmPushNotifciationsCloseDialog');
  },
  'Test Admin Goes to GCM Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();
    const { instanceName } = accounts.navigationUser;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config')
      .clickElement('@gcmPushSocketDevicesLinkIcon');
    pushDevicesPage.waitForElementVisible('@GCMDevicesEmptyListItem');
  }
});
