import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['channels'],
  before(client) {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after(client) {
    client.end();
  },
  'User adds a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const { instanceName } = accounts.instanceUser;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsEmptyItem')
      .clickElement('@addChannelButton')
      .waitForElementVisible('@channelModalTitle')
      .fillInput('@modalNameInput', utils.addSuffix('channel'))
      .clickElement('@channelDialogConfirmButton')
      .waitForElementPresent('@addChannelModalSummaryTitle')
      .clickElement('@channelSummaryDialogCloseButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User edits a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();

    channelsPage
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(utils.addSuffix('channel'), 'Edit')
      .waitForElementVisible('@channelModalTitle')
      .fillInput('@channelModalDescriptionInput', utils.addSuffix('edit'))
      .clickElement('@channelModalCustomPublishToggle')
      .clickElement('@channelDialogConfirmButton')
      .clickElement('@channelSummaryDialogCloseButton')
      .waitForElementVisible('@channelTableRow')
      .waitForElementVisible('@channelTableRowDescription');

    channelsPage.verify.containsText('@channelTableRowDescription', utils.addSuffix('edit'));
  },
  'User sends a Channel Message': (client) => {
    const channelsPage = client.page.channelsPage();
    const messageText = 'text_message';

    channelsPage
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(utils.addSuffix('channel'), 'Send Message')
      .waitForElementVisible('@sendChannelMessageModalTitle')
      .fillInput('@sendChannelMessageModalContentInput', messageText)
      .clickElement('@sendChannelMessageButton')
      .verify.containsText('@sendChannelMessageMessagesPreview', messageText)
      .clickElement('@sendChannelMessageModalFinishButton')
      .waitForElementPresent('@sendChannelMessageSummaryTitle')
      .clickElement('@sendChannelMessageSummaryCloseButton')
      .waitForElementVisible('@channelTableRow');
  },
  'User deletes a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();

    channelsPage
      .waitForElementVisible('@channelSocketsListTitle')
      .clickListItemDropdown(utils.addSuffix('channel'), 'Delete')
      .waitForElementVisible('@deleteChannelModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectChannelTableRow');
  }
});
