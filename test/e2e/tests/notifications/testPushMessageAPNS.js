import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushMessageAPNS', 'apns'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Sends iOS Push Notification': (client) => {
    const pushMessagesPage = client.page.pushMessagesPage();
    const { instanceName } = accounts.alternativeUser;

    pushMessagesPage
      .goToUrl(instanceName, 'push-notifications/messages/apns/')
      .clickElement('@sendMessageButton')
      .fillInput('@appNameInput', 'Test App')
      .fillInput('@contentInput', 'Sample message')
      .clickElement('@submitButton')
      .clickElement('@apnsDeviceRow')
      .clickElement('@submitButton')
      .fillInput('@deviceNumberInput', '1')
      .clickElement('@submitButton')
      .waitForElementVisible('@snackBarNotification')
      .assert.containsText('@snackBarNotification', 'Your iOS Message was sent');
  }
});
