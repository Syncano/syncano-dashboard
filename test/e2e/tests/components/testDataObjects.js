import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataObjects'],
  before(client) {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Data Object': function (client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');
    const { instanceName } = accounts.alternativeUser;
    const tempClassName = accounts.alternativeUser.tempClassNames[0];

    dataObjectsPage
      .goToUrl(instanceName, `classes/${tempClassName}/objects`)
      .clickElement('@addDataObjectButton')
      .fillInput('@stringField', string)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object': function (client) {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = utils.addSuffix('edited');

    dataObjectsPage
      .clickElement('@stringFieldTableRow')
      .fillInput('@stringField', edited)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator deletes a Data Object': function (client) {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage
      .clickElement('@deleteDataObjectButton')
      .clickElement('@confirmDeleteDialog')
      .waitForElementNotPresent('@selectDataObjectTableRow');
  }
});
