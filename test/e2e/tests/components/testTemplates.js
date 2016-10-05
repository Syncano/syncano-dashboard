import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['templates'],
  after: (client) => client.end(),
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Select/Deselect multiple Templates': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const { instanceName } = accounts.instanceUser;

    client
      .goToUrl(instanceName, 'templates')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple Templates': (client) => {
    const listsPage = client.page.listsPage();
    const templatesPage = client.page.templatesPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .pause(2000)
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton');

    templatesPage
      .waitForElementVisible('@emptyListItem');
  }
});
