import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['terms'],
  after: (client) => client.end(),
  'User Goes to terms of use page': (client) => {
    const signupPage = client.page.signupPage();
    const termsPage = client.page.termsPage();

    signupPage
      .navigate()
      .setResolution(client)
      .clickTermsOfUseLink();

    client
      .pause(1000)
      .changeWindow(1, 2);

    termsPage.expect.element('@termsOfUseContainer').to.be.present.after(10000);
    termsPage.expect.element('@termsOfUseContainer').to.contain.text('Terms and Legal');
  }
});
