import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['globalConfig'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator adds global Variables': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const globalConfigPage = client.page.globalConfigPage();
    const { instanceName } = accounts.alternativeUser;

    leftMenuPage
      .goToUrl(instanceName, 'sockets')
      .clickElement('@globalConfig');

    globalConfigPage
      .waitForElementPresent('@globalConfigEditor')
      .clearInput('@globalConfigEditor')
      .setValue('@globalConfigTextarea', '{\n"value1": "test1",\n"value2": "test2"')
      .clickElement('@globalConfigConfirmButton')
      .waitForElementNotPresent('@globalConfigEditor');

    leftMenuPage
      .clickElement('@globalConfig');

    globalConfigPage
      .waitForElementPresent('@globalConfigEditor')
      .verify.containsText('@globalConfigEditorContent', '{\n  "value1": "test1",\n  "value2": "test2"\n}');
  }
});
