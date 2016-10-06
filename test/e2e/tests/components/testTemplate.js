import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['template', 'newTool'],
  after: (client) => client.end(),
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Add Template': (client) => {
    const listsPage = client.page.listsPage();
    const templateViewPage = client.page.templateViewPage();
    const templateName = utils.addSuffix('template');
    const { instanceName } = instances.firstInstance;

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
    const { instanceName } = instances.firstInstance;
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
    const { instanceName } = instances.firstInstance;

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
