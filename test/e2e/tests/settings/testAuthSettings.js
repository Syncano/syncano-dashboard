import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['authSettings'],
  after: (client) => {
    client.end();
  },
  before: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Administrator copies an Account key': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const { accountKey } = accounts.navigationUser;
    const stackUrl = `http://stackoverflow.com/search?q=${accountKey}`;

    authenticationPage
      .navigate()
      .clickElement('@copyButton');

// This part is a bit wierd. I'm going to stackoverflow with the account key set as a query
// then i check the search fields value to check if the account key is there
// This is because there input fields in our app have empty value attrs so I can't use'em

    client
      .pause(2000)
      .url(stackUrl)
      .waitForElementPresent('input.textbox')
      .element('css selector', 'input.textbox', (result) => {
        client.elementIdAttribute(result.value.ELEMENT, 'value', (attribute) => {
          client.assert.equal(attribute.value, accountKey);
        });
      });
  },
  'Test Administrator resets an Account Key': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const accountKeyElement = authenticationPage.elements.accountKey.selector;
    const { accountKey } = accounts.navigationUser;

    authenticationPage
      .navigate()
      .waitForElementPresent('@accountKey')
      .clickElement('@resetButton');

    client
      .pause(1000)
      .element('xpath', accountKeyElement, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          const newAccountKey = text.value;

          client.assert.notEqual(newAccountKey, accountKey);
          client.perform(() => {
            accounts.navigationUser.accountKey = newAccountKey;
          });
        });
      });
  }
});
