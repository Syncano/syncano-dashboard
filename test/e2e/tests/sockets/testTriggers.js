import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['triggers', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator adds a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();
    const suffix = utils.addSuffix('trigger');
    const { instanceName } = instances.secondInstance;

    triggersPage
      .goToUrl(instanceName, 'triggers')
      .clickElement('@addTriggerButton')
      .fillInput('@addTriggerModalLabel', suffix)
      .selectDropdownValue('@addTriggerModalSignal', 'create')
      .fillInput('@className', 'user_profile')
      .clickElement('@classUserOption')
      .fillInput('@addTriggerModalScript', instances.secondInstance.scriptsNames[0])
      .clickElement('@scriptUserOption')
      .clickElement('@addTriggerConfirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@triggerTableRow');
  },
  'Administrator adds a Trigger with Sample Script': (client) => {
    const triggersPage = client.page.triggersPage();
    const suffix = utils.addSuffix('trigger');

    triggersPage
      .clickElement('@addTriggerButton')
      .fillInput('@addTriggerModalLabel', suffix)
      .selectDropdownValue('@addTriggerModalSignal', 'create')
      .fillInput('@className', 'user_profile')
      .clickElement('@classUserOption')
      .clickElement('@addTriggerModalScript')
      .clickElement('@scriptSampleOption')
      .clickElement('@addTriggerConfirmButton')
      .waitForElementPresent('@scriptDialogContent')
      .clickElement('@addTriggerConfirmButton')
      .waitForElementPresent('@triggerModalSummaryTitle')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();
    const trigger = utils.addSuffix('trigger');

    triggersPage
      .clickListItemDropdown(trigger, 'Edit')
      .selectDropdownValue('@addTriggerModalSignal', 'update')
      .clickElement('@addTriggerConfirmButton')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@signalTriggerTableRow')
      .assert.containsText('@signalTriggerTableRow', 'update');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();
    const trigger = utils.addSuffix('trigger');

    triggersPage
      .clickListItemDropdown(trigger, 'Delete')
      .clickElement('@deleteTriggerModalTitle');
  }
});
