import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['scriptSockets'],
  before: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Select/Deselect multiple Script Sockets': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItemDataEndpoint = listsPage.elements.selectedItemDataEndpoint.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const { instanceName } = accounts.navigationUser;

    client
      .goToUrl(instanceName, 'script-endpoints')
      .multipleItems('Select', 2, optionsMenu, selectedItemDataEndpoint)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItemDataEndpoint);
  },
  'Test Delete multiple Script Sockets': (client) => {
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
