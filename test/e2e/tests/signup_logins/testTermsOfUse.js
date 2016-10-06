import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['terms', 'newTool'],
  after: (client) => client.end(),
  'User Goes to terms of use page': (client) => {
    const signupPage = client.page.signupPage();
    const termsPage = client.page.termsPage();

    signupPage
      .navigate()
      .setResolution(client)
      .clickTermsOfUseLink()
      .changeWindow(1, 2);

    termsPage
      .waitForElementVisible('@termsOfUseContainer')
      .assert.containsText('@termsOfUseContainer', 'Terms and Legal');
  }
});
