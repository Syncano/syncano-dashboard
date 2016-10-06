import instances from '../../tempInstances.js';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['backup', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Create Backup': (client) => {
    const backupPage = client.page.backupPage();
    const label = utils.addSuffix();
    const description = utils.addSuffix('description');
    const { instanceName } = instances.firstInstance;

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
