import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['signup', 'newTool'],
  after: (client) => client.end(),
  'Test Login using email address': (client) => {
    const signupPage = client.page.signupPage();
    const { emailName, emailDomain } = utils.splitTestBaseEmail();
    const tempPass = Date.now();
    const tempEmail = `${emailName}+${tempPass}@${emailDomain}`;

    signupPage
      .navigate()
      .setResolution(client)
      .fillInput('@emailInput', tempEmail)
      .fillInput('@passInput', tempPass)
      .clickElement('@submitButton')
      .waitForElementNotPresent('@setupScreen')
      .waitForElementVisible('@emptySocketsHeading');
  }
});
