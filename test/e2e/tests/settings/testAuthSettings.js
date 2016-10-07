import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['authSettings'],
  after: (client) => client.end(),
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  'Test Administrator copies an Account key': (client) => {
    const authenticationPage = client.page.authenticationPage();
    const { account_key: accountKey } = instances.account;
    const stackUrl = `http://stackoverflow.com/search?q=${accountKey}`;

    authenticationPage
      .navigate()
      .clickElement('@copyButton');

// This part is a bit weird. I'm going to stackoverflow with the account key set as a query
// then i check the search fields value to check if the account key is there
// This is because there input fields in our app have empty value attributes so I can't use'm

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
    const { account_key: accountKey } = instances.account;

    authenticationPage
      .navigate()
      .waitForElementPresent('@accountKey')
      .clickElement('@resetButton');

    client
      .pause(1000)
      .element('css selector', accountKeyElement, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          const newAccountKey = text.value;

          client.assert.notEqual(newAccountKey, accountKey);
          client.perform(() => {
            instances.account.account_key = newAccountKey;
          });
        });
      });
  }
});
