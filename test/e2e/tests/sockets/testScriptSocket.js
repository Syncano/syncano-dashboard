import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['scriptSocket'],
  before: (client) => {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User adds a User Script Socket from User Script': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = utils.addSuffix('script');
    const { instanceName } = accounts.alternativeUser;

    socketsPage
      .goToUrl(instanceName, 'script-endpoints')
      .clickElement('@addScriptSocketButton')
      .fillInput('@endpointNameInput', script)
      .fillInput('@scriptName', accounts.alternativeUser.tempScriptNames[0])
      .clickElement('@scriptUserOption')
      .clickElement('@scriptSocketSubmitButton')
      .clickElement('@scriptSocketCloseDialog')
      .waitForElementVisible('@scriptSocketRow');
  },
  'User adds a Script Socket from Sample Script': (client) => {
    const socketsPage = client.page.socketsPage();
    const sampleScript = utils.addSuffix('sample_script');

    socketsPage
      .clickElement('@addScriptSocketButton')
      .fillInput('@endpointNameInput', sampleScript)
      .clickElement('@scriptName')
      .clickElement('@scriptSampleOption')
      .clickElement('@scriptSocketSubmitButton')
      .fillInput('@modalDescriptionTextarea', 'Test description Sample Script')
      .clickElement('@scriptSocketSubmitButton')
      .clickElement('@scriptSocketCloseDialogButton')
      .clickElement('@scriptSocketRelatedScript')
      .expect.element('@codeEditorContent').text.to.not.equal('');
  },
  'User edits a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const edited = utils.addSuffix('edited');
    const { instanceName } = accounts.alternativeUser;

    socketsPage
      .goToUrl(instanceName, 'script-endpoints')
      .clickListItemDropdown(utils.addSuffix('script'), 'Edit')
      .fillInput('@modalDescriptionInput', edited)
      .clickElement('@scriptSocketSubmitButton')
      .clickElement('@scriptSocketCloseDialogButton')
      .waitForElementVisible('@scriptSocketRow')
      .waitForElementVisible('@scriptSocketRowDescription');

    socketsPage.verify.containsText('@scriptSocketRowDescription', edited);
  },
  'User deletes a Script Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const script = utils.addSuffix('script');

    socketsPage
      .clickListItemDropdown(script, 'Delete')
      .clickElement('@scriptSocketDeleteDialogButton')
      .waitForElementNotPresent('@scriptSocketRow');
  }
});
