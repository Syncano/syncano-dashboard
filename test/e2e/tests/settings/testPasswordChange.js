import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['passwordSettings', 'newTool'],
  after: (client) => client.end(),
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Administrator resets his password': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const { password: currentPassword } = instances.account;
    const newPassword = utils.addSuffix('pass');

    authenticationPage
      .navigate()
      .fillInput('@currentPassword', currentPassword)
      .fillInput('@newPassword', newPassword)
      .fillInput('@confirmNewPassword', newPassword)
      .clickElement('@updateButton')
      .waitForElementPresent('@snackBarNotification');
  },
  'Administrator logs in with a new password': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const loginPage = client.page.loginPage();
    const { email } = instances.account;
    const newPassword = utils.addSuffix('pass');

    topNavigationPage
      .clickElement('@menuAccount')
      .clickElement('@logoutDropdown');

    loginPage
      .navigate()
      .login(email, newPassword);

    instances.account.password = newPassword;
  }
});
