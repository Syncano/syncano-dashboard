import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['template'],
  after(client) {
    client.end();
  },
  before(client) {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Add Template': (client) => {
    const listsPage = client.page.listsPage();
    const templateViewPage = client.page.templateViewPage();
    const templateName = utils.addSuffix('template');
    const { instanceName } = accounts.instanceUser;

    listsPage
      .goToUrl(instanceName, 'templates')
      .clickElement('@addButton');

    templateViewPage
      .waitForElementVisible('@addStepTitle')
      .fillInput('@templateName', templateName)
      .fillInput('@templateContentType', utils.getRandomTemplateContentType())
      .clickElement('@templateSubmitButton');

    templateViewPage
      .waitForElementVisible('@templateDialogSummaryTitle')
      .clickElement('@templateCloseButtonSummary')
      .waitForElementVisible('@renderButton');
  },
  'Test Edit Template': (client) => {
    const listsPage = client.page.listsPage();
    const { instanceName } = accounts.instanceUser;
    const templateViewPage = client.page.templateViewPage();

    listsPage
      .goToUrl(instanceName, 'templates')
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit');

    templateViewPage
      .waitForElementVisible('@editStepTitle')
      .fillInput('@templateContentType', 'text/css')
      .clickElement('@templateTextCssType')
      .clickElement('@templateSubmitButton');

    templateViewPage
      .clickElement('@templateCloseButtonSummary')
      .waitForElementVisible('@renderButton');
  },
  'Test Delete Template': (client) => {
    const listsPage = client.page.listsPage();
    const { instanceName } = accounts.instanceUser;

    listsPage
      .goToUrl(instanceName, 'templates')
      .verify.containsText('@firstItemRowDescription', 'text/css')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading')
      .verify.containsText('@firstItemRowName', 'objects_csv');
  },
  'Test Admin Selects/Deselects Template': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client
      .singleItemSelectUnselect('synicon-arrow-up-bold', optionsMenu, selectedItem);
  }
});
