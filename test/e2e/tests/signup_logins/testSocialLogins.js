import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['socialLogins'],
  beforeEach: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client);
  },
  afterEach: (client, done) => client.end(done),
  'Admin Logs in with Facebook': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage
      .clickElement('@loginButtonFacebook')
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputFacebook', process.env.FACEBOOK_EMAIL)
      .fillInput('@passInputFacebook', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonFacebook')
      .changeWindow(0, 1);

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTable');
  },
  'Admin Logs in with Google': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage
      .clickElement('@loginButtonGoogle')
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputGoogle', process.env.NIGHTWATCH_EMAIL)
      .clickElement('@nextButtonGoogle')
      .fillInput('@passInputGoogle', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonGoogle');

    // Cool down for approve button before it is clickable
    client.pause(2000);

    loginPage
      .clickElement('@approveAccessButtonGoogle')
      .changeWindow(0, 1);

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTable');
  },
  'Admin Logs in with Github': (client) => {
    const loginPage = client.page.loginPage();
    const instancesPage = client.page.instancesPage();

    loginPage
      .clickElement('@loginButtonGithub')
      .changeWindow(1, 2);

    loginPage
      .fillInput('@emailInputGithub', process.env.NIGHTWATCH_EMAIL)
      .fillInput('@passInputGithub', process.env.NIGHTWATCH_PASSWORD)
      .clickElement('@signInButtonGithub')
      .changeWindow(0, 1);

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTable');
  }
});
