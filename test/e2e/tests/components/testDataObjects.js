import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataObjects'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator adds a Data Object': (client) => {
    const dataObjectsPage = client.page.dataObjectsPage();
    const string = utils.addSuffix('string');
    const { instanceName } = instances.secondInstance;
    const tempClassName = instances.secondInstance.classNames[0];

    dataObjectsPage
      .goToUrl(instanceName, `classes/${tempClassName}/objects`)
      .clickElement('@addDataObjectButton')
      .fillInput('@stringField', string)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator edits a Data Object': (client) => {
    const dataObjectsPage = client.page.dataObjectsPage();
    const edited = utils.addSuffix('edited');

    dataObjectsPage
      .clickElement('@stringFieldTableRow')
      .fillInput('@stringField', edited)
      .clickElement('@confirm')
      .waitForElementVisible('@stringFieldTableRow');
  },
  'Administrator deletes a Data Object': (client) => {
    const dataObjectsPage = client.page.dataObjectsPage();

    dataObjectsPage
      .clickElement('@deleteDataObjectButton')
      .clickElement('@confirmDeleteDialog')
      .waitForElementNotPresent('@selectDataObjectTableRow');
  }
});
