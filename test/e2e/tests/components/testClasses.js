import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['classes'],
  after: (client) => client.end(),
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();
    const { instanceName } = accounts.instanceUser;

    classesPage
      .goToUrl(instanceName, 'classes')
      .clickListItemDropdown('@classesListMenu', 'Select')
      .clickElement('@selectUserClass')
      .clickListItemDropdown('@classesListMenu', 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementVisible('@classTableRows');
    const classTableRows = classesPage.elements.classTableRows.selector;
    const userProfileClassName = classesPage.elements.userProfileClassName.selector;

    client.elements('xpath', classTableRows, (result) => {
      client.assert.equal(result.value.length, 1, 'There is one class left');
    });
    client.elements('css selector', userProfileClassName, (result) => {
      client.assert.equal(result.value.length, 1, 'user_profile class was not deleted');
    });
  }
});
