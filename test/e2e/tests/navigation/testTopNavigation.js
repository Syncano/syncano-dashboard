import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['topNavigation'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Admin Goes to Getting Started': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.clickElement('@gettingStarted');
    client.changeWindow(1, 2);
    docsPage.waitForElementVisible('@gettingStartedTarget');

    client
      .window('delete')
      .changeWindow(0, 1)
      .pause(500);
  },
  'Admin Goes to Documenation': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.clickElement('@docs');
    client.changeWindow(1, 2);
    docsPage.waitForElementVisible('@docsTarget');

    client
      .window('delete')
      .changeWindow(0, 1)
      .pause(500);
  },
  'Admin Goes to Instances list': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const docsPage = client.page.docsPage();

    topNavigationPage.clickElement('@instances');
    docsPage.waitForElementVisible('@instancesTarget');
  },
  'Admin can view notification dropdown': (client) => {
    const topNavigationPage = client.page.topNavigationPage();

    topNavigationPage
      .navigate()
      .clickElement('@menuNotifications')
      .waitForElementVisible('@notificationsDropdown');
  }
});
