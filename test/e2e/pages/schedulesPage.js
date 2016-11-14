import utils from '../utils';
import instances from '../tempInstances';

export default {
  elements: {
    addScheduleConfirmButton: {
      selector: '[data-e2e="schedule-dialog-confirm-button"]'
    },
    scheduleModalSummaryTitle: {
      selector: '[data-e2e="schedule-dialog-summary-title"]'
    },
    addScheduleButton: {
      selector: '[data-e2e="schedule-add-button"]'
    },
    scheduleModalTitle: {
      selector: '[data-e2e="schedule-dialog-title"]'
    },
    addScheduleModalLabel: {
      selector: '[data-e2e="schedule-modal-label"]'
    },
    addScheduleModalScript: {
      selector: '[data-e2e="schedule-modal-script"]'
    },
    scriptSampleOption: {
      selector: `[data-e2e="${utils.getRandomSampleScriptName()}-sample-option"]`
    },
    addScheduleModalCrontab: {
      selector: '[data-e2e="schedule-modal-crontab"]'
    },
    scriptDialogContent: {
      selector: '[data-e2e="script-dialog-content"]'
    },
    scriptDialogDescription: {
      selector: '[data-e2e="script-dialog-description"]'
    },
    scriptRuntimeInput: {
      selector: 'input[name="runtime_name"]'
    },
    scriptNodeJSOption: {
      selector: '[data-e2e="nodejs-script-runtime-option"]'
    },
    scriptUserOption: {
      selector: `[data-e2e=${instances.secondInstance.scriptsNames[0]}-user-option]`
    },
    scheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]`,
      locateStrategy: 'xpath'
    },
    cronTabScheduleTableRow: {
      selector: `//div[@data-e2e="${utils.addSuffix('schedule')}-crontab-interval-value"]`,
      locateStrategy: 'xpath'
    },
    deleteScheduleButton: {
      selector: '[data-e2e="schedule-delete-dialog-confirm"]'
    },
    summaryDialogCloseButton: {
      selector: '//span[@class="synicon-close"]',
      locateStrategy: 'xpath'
    }
  }
};
