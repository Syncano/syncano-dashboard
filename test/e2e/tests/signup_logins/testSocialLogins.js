import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['socialLogins'],
  beforeEach(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client);
  },
  afterEach(client, done) {
    client.end(done);
  },
  'Admin Logs in with Facebook': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickElement('@loginButtonFacebook');

    client
      .pause(1000)
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputFacebook', process.env.FACEBOOK_EMAIL)
      .fillInput('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonFacebook');

    client
      .pause(1000)
      .changeWindow(0, 1);
    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTable');
  },
  'Admin Logs in with Google': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickElement('@loginButtonGoogle');

    client
      .pause(1000)
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL)
      .clickElement('@nextButtonGoogle')
      .fillInput('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonGoogle');

    client.pause(2000);
    loginPage.clickElement('@approveAccessButtonGoogle');
    client
      .pause(1000)
      .changeWindow(0, 1);

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTable');
  },
  'Admin Logs in with Github': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage.clickElement('@loginButtonGithub');

    client
      .pause(1000)
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputGithub', process.env.NIGHTWATCH_EMAIL)
      .fillInput('@passInputGithub', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonGithub');

    client
      .pause(3000)
      .changeWindow(0, 1)
      .pause(3000);

    instancesPage.navigate();
    client.pause(3000);
    instancesPage
      .waitForElementPresent('@instancesTable');
  }
});
