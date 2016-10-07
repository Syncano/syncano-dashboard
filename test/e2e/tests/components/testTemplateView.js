import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['templateView'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Test Admin Edits and Saves Template Code': (client) => {
    const templateViewPage = client.page.templateViewPage();
    const controlTimestamp = utils.addSuffix('template');
    const { instanceName } = instances.secondInstance;

    templateViewPage
      .goToUrl(instanceName, 'templates')
      .clickElement('@htmlTestTemplateRow')
      .waitForElementPresent('@codeEditor')
      .clearInput('@codeEditorContent')
      .setValue('@codeEditor', utils.jinjaTemplate())
      .clearInput('@contextEditorContent')
      .setValue('@contextEditor', `{"timestamp": "${controlTimestamp}"}`)
      .waitForElementVisible('@snackBarNotification');
  },
  'Test Admin Renders Template Using Data Url and Context': (client) => {
    const { instanceName } = instances.secondInstance;
    const templateViewPage = client.page.templateViewPage();
    const controlTimestamp = utils.addSuffix('template');
    const dataSourceUrl = utils.templateDataSourceUrl(instanceName);
    const expectedPreviewResult = `${controlTimestamp},user_profile`;

    templateViewPage
      .goToUrl(instanceName, 'templates')
      .clickElement('@htmlTestTemplateRow')
      .fillInput('@inputDataSourceUrl', dataSourceUrl)
      .clickElement('@renderButton')
      .verify.containsText('@previewEditorContent', expectedPreviewResult);
  },
  'Test Admin Renders Template in Tab': (client) => {
    const { instanceName } = instances.secondInstance;
    const templateViewPage = client.page.templateViewPage();
    const dataSourceUrl = utils.templateDataSourceUrl(instanceName);
    const controlTimestamp = utils.addSuffix('template');
    const expectedTabResult = `${controlTimestamp},user_profile`;

    templateViewPage
      .goToUrl(instanceName, 'templates')
      .clickElement('@htmlTestTemplateRow')
      .fillInput('@inputDataSourceUrl', dataSourceUrl)
      .clickElement('@saveButton')
      .clickElement('@renderInTabButton');

    client
      .changeWindow(1, 2)
      .waitForElementPresent('body')
      .verify.containsText('body', expectedTabResult);
  }
});
