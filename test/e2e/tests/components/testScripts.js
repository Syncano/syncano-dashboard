import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['snippets'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Select/Deselect multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const selectedItems = listsPage.elements.selectedItem.selector;
    const { instanceName } = instances.firstInstance;

    client
      .goToUrl(instanceName, 'scripts')
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple Scripts': (client) => {
    const listsPage = client.page.listsPage();
    const scriptsPage = client.page.scriptsPage();
    const optionsMenu = listsPage.elements.optionsMenu.selector;
    const selectedItems = listsPage.elements.selectedItem.selector;

    client
      .pause(2000)
      .multipleItems('Select', 3, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton');

    scriptsPage
      .waitForElementVisible('@emptyListItem');
  }
});
