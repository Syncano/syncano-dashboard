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
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();
    const classTableRows = classesPage.elements.classTableRows.selector;
    const userProfileClassName = classesPage.elements.userProfileClassName.selector;
    const { instanceName } = instances.firstInstance;

    classesPage
      .goToUrl(instanceName, 'classes')
      .clickListItemDropdown('@classesListMenu', 'Select')
      .clickElement('@selectUserClass')
      .clickListItemDropdown('@classesListMenu', 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementVisible('@classTableRows')
      .assertSelectedCount('xpath', classTableRows, 1, 'There is one class left')
      .assertSelectedCount('css selector', userProfileClassName, 1, 'user_profile class was not deleted');
  }
});
