import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['groups'],
  before(client) {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Group': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');
    const { instanceName } = accounts.instanceUser;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupList')
      .waitForElementVisible('@userList')
      .clickElement('@addGroupButton')
      .waitForElementPresent('@addGroupModalTitle')
      .fillInput('@groupName', suffix)
      .clickElement('@groupDialogConfirmButton')
      .waitForElementPresent('@addGroupModalSummaryTitle')
      .clickElement('@groupSummaryDialogCloseButton')
      .waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group': (client) => {
    const usersPage = client.page.usersPage();

    usersPage
      .waitForElementVisible('@groupList')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@groupTableRowDropdown', 'Delete')
      .waitForElementPresent('@deleteGroupModalTitle')
      .clickElement('@groupDialogDeleteButton')
      .waitForElementVisible('@groupList')
      .waitForElementNotPresent('@groupTableRowDropdown');
  }
});
