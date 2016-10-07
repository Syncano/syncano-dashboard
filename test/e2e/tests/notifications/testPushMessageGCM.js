import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushMessageGCM'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Sends Android Push Notification': (client) => {
    const pushMessagesPage = client.page.pushMessagesPage();
    const { instanceName } = instances.secondInstance;

    pushMessagesPage
      .goToUrl(instanceName, 'push-notifications/messages/gcm/')
      .clickElement('@sendMessageButton')
      .fillInput('@appNameInput', 'Test App')
      .fillInput('@contentInput', 'Sample message')
      .clickElement('@submitButton')
      .clickElement('@gcmDeviceRow')
      .clickElement('@submitButton')
      .fillInput('@deviceNumberInput', '1')
      .clickElement('@submitButton')
      .waitForElementVisible('@snackBarNotification')
      .assert.containsText('@snackBarNotification', 'Your Android Message was sent');
  },
  'Test User views GCM Push Notification history': (client) => {
    const pushMessagesPage = client.page.pushMessagesPage();
    const { instanceName } = instances.secondInstance;
    const messageListSelector = pushMessagesPage.elements.messageListItem.selector;

    pushMessagesPage
      .goToUrl(instanceName, 'push-notifications/messages/gcm/')
      .assertSelectedCount('css selector', messageListSelector, 1);
  }
});
