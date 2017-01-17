import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['channels'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User adds a Channel Socket': (client) => {
    const channelsPage = client.page.channelsPage();
    const { instanceName } = instances.firstInstance;

    channelsPage
      .goToUrl(instanceName, 'channels')
      .waitForElementVisible('@channelSocketsListTitle')
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
      .waitForElementVisible('@channelTableRowDescription')
      .verify.containsText('@channelTableRowDescription', utils.addSuffix('edit'));
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
