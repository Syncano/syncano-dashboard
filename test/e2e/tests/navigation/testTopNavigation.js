import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['topNavigation', 'newTool'],
  before: (client) => {
    const accountKey = instances.account.account_key;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Admin Goes to Docs page': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.clickElement('@gettingStarted');
    topNavigationPage.clickElement('@docs');
    client.changeWindow(1, 2);
    docsPage.waitForElementVisible('@syncanoLogo');

    client
      .window('delete')
      .changeWindow(0, 1)
      .pause(500);
  },
  'Admin can view notification dropdown': (client) => {
    const topNavigationPage = client.page.topNavigationPage();

    topNavigationPage
      .navigate()
      .clickElement('@menuNotifications')
      .waitForElementVisible('@notificationsDropdown');
  }
});
