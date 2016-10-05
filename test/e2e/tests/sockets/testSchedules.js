import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['schedules'],
  before(client) {
    const { accountKey } = accounts.alternativeUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');
    const { instanceName } = accounts.alternativeUser;
    const scriptName = accounts.alternativeUser.tempScriptNames[0];

    schedulesPage
      .goToUrl(instanceName, 'schedules')
      .clickElement('@addScheduleButton')
      .fillInput('@addScheduleModalLabel', schedule)
      .fillInput('@addScheduleModalScript', scriptName)
      .fillInput('@addScheduleModalCrontab', '0 0 1 1 *')
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scriptDialogContent')
      .fillInput('@scriptDialogDescription', scriptName)
      .fillInput('@scriptRuntimeInput', 'Node')
      .clickElement('@scriptNodeJSOption')
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scheduleModalSummaryTitle')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementPresent('@scheduleTableRow');
  },
  'User adds a Schedule Socket from Sample Script': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .clickElement('@addScheduleButton')
      .fillInput('@addScheduleModalLabel', schedule)
      .clickElement('@addScheduleModalScript')
      .clickElement('@scriptSampleOption')
      .fillInput('@addScheduleModalCrontab', '0 0 1 1 *')
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scriptDialogContent')
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scheduleModalSummaryTitle')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Socket Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');
    const scriptName = accounts.alternativeUser.tempScriptNames[0];

    schedulesPage
      .clickListItemDropdown(schedule, 'Edit')
      .clearInput('@addScheduleModalScript')
      .fillInput('@addScheduleModalScript', scriptName)
      .clickElement('@scriptUserOption')
      .fillInput('@addScheduleModalCrontab', '0 0 * * *')
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scheduleModalSummaryTitle')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@cronTabScheduleTableRow')
      .assert.containsText('@cronTabScheduleTableRow', '0 0 * * *');
  },
  'Administrator deletes a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .clickListItemDropdown(schedule, 'Delete')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickElement('@addScheduleButton');
  }
});
