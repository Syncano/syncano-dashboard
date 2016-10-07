import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['profile'],
  after: (client) => client.end(),
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Administrator changes his name and surname': (client) => {
    const profilePage = client.page.profilePage();
    const firstName = utils.addSuffix('name');
    const lastName = utils.addSuffix('surname');

    profilePage
      .navigate()
      .waitForElementPresent('@innerToolbar')
      .fillInput('@firstName', firstName)
      .fillInput('@lastName', lastName)
      .clickElement('@updateButton')
      .waitForElementPresent('@notificationBar')
      .verify.containsText('@notificationBar', 'Profile saved successfully.')
      .verify.value('@firstName', firstName)
      .verify.value('@lastName', lastName);
  }
});
