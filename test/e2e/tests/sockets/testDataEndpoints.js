import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['dataEndpoints'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Select/Deselect multiple Data Endpoints': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItemDataEndpoint = listsPage.elements.selectedItemDataEndpoint.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const { instanceName } = accounts.alternativeUser;

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
