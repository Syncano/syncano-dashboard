import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['backup'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Create Backup': (client) => {
    const backupPage = client.page.backupPage();
    const label = utils.addSuffix();
    const description = utils.addSuffix('description');
    const { instanceName } = accounts.instanceUser;

    backupPage
      .goToUrl(instanceName, 'backup-and-restore/full')
      .clickElement('@createBackupButton')
      .fillInput('@createModalLabelInput', label)
      .fillInput('@createModalDescriptionInput', description)
      .clickElement('@confirmBackupButton')
      .waitForElementVisible('@backupTableRow');
  },
  'Test Delete Backup': (client) => {
    const backupPage = client.page.backupPage();
    const description = utils.addSuffix();

    backupPage
      .clickListItemDropdown(description, 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementVisible('@fullBackupsEmptyListItem');
  }
});
