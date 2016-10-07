import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['administrators'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => {
    client.end();
  },
  'User invites an Administrator': (client) => {
    const { emailDomain } = utils.splitTestBaseEmail();
    const email = `${utils.addSuffix('admin')}@${emailDomain}`;
    const adminsPage = client.page.adminsPage();
    const { instanceName } = instances.firstInstance;

    adminsPage
      .goToUrl(instanceName, 'admins')
      .waitForElementVisible('@adminsListItem')
      .clickElement('@addAdminButton')
      .waitForElementVisible('@addAdminModalTitle')
      .fillInput('@addAdminModalEmailInput', email)
      .selectDropdownValue('@addAdminModalRoleDropdown', 'read')
      .clickElement('@confirmButton')
      .waitForElementVisible('@adminEmailTableRow');
  },
  'User deletes an Administrator invitation': (client) => {
    const adminsPage = client.page.adminsPage();
    const listsPage = client.page.listsPage();
    const { instanceName } = instances.firstInstance;

    adminsPage
      .goToUrl(instanceName, 'admins')
      .clickElement('@selectAdminTableRow')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteAdminModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@adminEmailTableRow');

    listsPage
      .waitForElementVisible('@emptyListItem');
  }
});
