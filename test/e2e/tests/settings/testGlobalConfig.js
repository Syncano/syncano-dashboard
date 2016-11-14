import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['globalConfig'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  // 'Administrator adds global Variables': (client) => {
  //   const leftMenuPage = client.page.leftMenuPage();
  //   const globalConfigPage = client.page.globalConfigPage();
  //   const { instanceName } = instances.firstInstance;
  //
  //   leftMenuPage
  //     .goToUrl(instanceName, 'sockets')
  //     .clickElement('@globalConfig');
  //
  //   globalConfigPage
  //     .waitForElementPresent('@globalConfigEditor')
  //     .clearInput('@globalConfigEditor')
  //     .setValue('@globalConfigTextarea', '{\n"value1": "test1",\n"value2": "test2"')
  //     .clickElement('@globalConfigConfirmButton')
  //     .waitForElementNotPresent('@globalConfigEditor');
  //
  //   leftMenuPage
  //     .clickElement('@globalConfig');
  //
  //   globalConfigPage
  //     .waitForElementPresent('@globalConfigEditor')
  //     .verify.containsText('@globalConfigEditor', '{\n  "value1": "test1",\n  "value2": "test2"\n}');
  // },
  'Administrator reads global Variables': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const globalConfigPage = client.page.globalConfigPage();
    const { instanceName } = instances.firstInstance;

    leftMenuPage
      .goToUrl(instanceName, 'sockets')
      .clickElement('@globalConfig');

    globalConfigPage
      .waitForElementPresent('@globalConfigEditor')
      .clickElement('@globalConfigCloseButton')
      .waitForElementNotPresent('@globalConfigEditor');
  }
});
