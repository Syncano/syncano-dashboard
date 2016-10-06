import instances from '../../tempInstances';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['schedules', 'newTool'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'Administrator adds a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');
    const { instanceName } = instances.secondInstance;
    const scriptName = instances.secondInstance.scriptsNames[0];

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
    const scriptName = instances.secondInstance.scriptsNames[0];
    const cronTab = '0 0 * * *';

    schedulesPage
      .clickListItemDropdown(schedule, 'Edit')
      .clearInput('@addScheduleModalScript')
      .fillInput('@addScheduleModalScript', scriptName)
      .clickElement('@scriptUserOption')
      .fillInput('@addScheduleModalCrontab', cronTab)
      .clickElement('@addScheduleConfirmButton')
      .waitForElementPresent('@scheduleModalSummaryTitle')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementVisible('@cronTabScheduleTableRow')
      .assert.containsText('@cronTabScheduleTableRow', cronTab);
  },
  'Administrator deletes a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .clickListItemDropdown(schedule, 'Delete')
      .clickElement('@deleteScheduleButton');
  }
});
