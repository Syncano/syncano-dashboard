import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushMessageAPNS', 'apns', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Sends iOS Push Notification': (client) => {
    const pushMessagesPage = client.page.pushMessagesPage();
    const { instanceName } = instances.secondInstance;

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
  },
  'Test User views APNS Push Notification history': (client) => {
    const pushMessagesPage = client.page.pushMessagesPage();
    const { instanceName } = instances.secondInstance;
    const messageListSelector = pushMessagesPage.elements.messageListItem.selector;

    pushMessagesPage
      .goToUrl(instanceName, 'push-notifications/messages/apns/')
      .assertSelectedCount('css selector', messageListSelector, 1);
  }
});
