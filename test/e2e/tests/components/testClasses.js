import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['classes'],
  after: (client) => client.end(),
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Classes on the list': (client) => {
    const classesPage = client.page.classesPage();
    const classTableRows = classesPage.elements.classTableRows.selector;
    const { instanceName } = instances.firstInstance;

    classesPage
      .goToUrl(instanceName, 'classes')
      .waitForElementVisible('@classTableRows')
      .assertSelectedCount('xpath', classTableRows, 3, 'There are 3 classes');
  }
});
