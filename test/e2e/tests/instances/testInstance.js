import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instance'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Check if Instance has been created': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .waitForElementNotPresent('@setupPageContent')
      .navigate()
      .waitForElementNotPresent('@emptyListItem')
      .waitForElementVisible('@selectInstance');
  },
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();
    const newDescription = utils.addSuffix('description');

    instancesPage
      .navigate()
      .clickListItemDropdown('@instanceDropdown', 'Edit')
      .fillInput('@createModalDescriptionInput', newDescription)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@editInstanceModalTitle')
      .waitForElementVisible('@instancesTableName')
      .assert.containsText('@instancesTableRow', newDescription);
  }
});
