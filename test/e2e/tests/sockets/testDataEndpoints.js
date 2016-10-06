import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataEndpoints', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Select/Deselect multiple Data Endpoints': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItemDataEndpoint = listsPage.elements.selectedItemDataEndpoint.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const { instanceName } = instances.secondInstance;

    client
      .goToUrl(instanceName, 'data-endpoints')
      .multipleItems('Select', 2, optionsMenu, selectedItemDataEndpoint)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItemDataEndpoint);
  },
  'Test Delete multiple Data Endpoints': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItemDataEndpoint = listsPage.elements.selectedItemDataEndpoint.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .pause(2000)
      .multipleItems('Select', 2, optionsMenu, selectedItemDataEndpoint)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@zeroStateAddButton');
  }
});
