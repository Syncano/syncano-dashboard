import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushHistoryAPNS', 'apns'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test User views APNS Push Notification history': (client) => {
    const pushHistoryPage = client.page.pushHistoryPage();
    const { instanceName } = accounts.alternativeUser;
    const messageListSelector = pushHistoryPage.elements.messageListItem.selector;

    pushHistoryPage
      .goToUrl(instanceName, 'push-notifications/messages/apns/')
      .assertSelectedCount('xpath', messageListSelector, 1);
  }
});
