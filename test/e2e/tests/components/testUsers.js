import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['users'],
  before(client) {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a User': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('user');
    const { instanceName } = accounts.instanceUser;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupList')
      .waitForElementVisible('@userList')
      .clickElement('@addUserButton')
      .fillInput('@username', suffix)
      .fillInput('@password', suffix)
      .clickElement('@userDialogConfirmButton')
      .waitForElementPresent('@userTableRow');
  },
  'Administrator deletes a User': (client) => {
    const usersPage = client.page.usersPage();

    usersPage
      .waitForElementVisible('@groupList')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@selectUserTableRow', 'Delete')
      .waitForElementPresent('@deleteUserModalTitle')
      .clickElement('@userDialogDeleteButton')
      .waitForElementNotPresent('@userTableRow');
  }
});
