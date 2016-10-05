import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['script'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Admin Adds a Script': (client) => {
    const scriptsPage = client.page.scriptsPage();
    const { instanceName } = accounts.alternativeUser;
    const scriptName = utils.addSuffix('script');

    scriptsPage
      .goToUrl(instanceName, 'scripts')
      .clickElement('@scriptAddButton')
      .fillInput('@scriptlNameInput', scriptName)
      .fillInput('@scriptRuntimeInput', 'Node')
      .clickElement('@scriptNodeJSOption')
      .clickElement('@scriptSubmitButton')
      .clickElement('@scriptCloseSummaryButton')
      .waitForElementVisible('@scriptRunButton')
      // check if script has sample code set
      .waitForElementVisible('@scriptEditorNodeJSFirstLine');
  },
  'Admin edits a Script': (client) => {
    const listsPage = client.page.listsPage();
    const scriptsPage = client.page.scriptsPage();
    const { instanceName } = accounts.alternativeUser;
    const scriptName = utils.addSuffix('script');
    const scriptDescription = utils.addSuffix('description');

    listsPage
      .goToUrl(instanceName, 'scripts')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit');

    scriptsPage
      .fillInput('@scriptlNameInput', scriptName)
      .fillInput('@scriptDescriptionInput', scriptDescription)
      .fillInput('@scriptRuntimeInput', 'Ruby')
      .clickElement('@scriptRubyOption')
      .clickElement('@scriptSubmitButton');

    listsPage
      .waitForElementVisible('@scriptRubyCheckIcon')
      .verify.containsText('@firstItemRowName', scriptName)
      .verify.containsText('@firstItemRowDescription', scriptDescription);
  },
  'Test Admin Selects/Deselects Script': (client) => {
    const listsPage = client.page.listsPage();
    const { instanceName } = accounts.alternativeUser;
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client
      .goToUrl(instanceName, 'scripts')
      .singleItemSelectUnselect('synicon-language-ruby', optionsMenu, selectedItem);
  },
  'Admin deletes a Script': (client) => {
    const listsPage = client.page.listsPage();
    const { instanceName } = accounts.alternativeUser;

    listsPage
      .goToUrl(instanceName, 'scripts')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@scriptRubyCheckIcon');
  }
});
