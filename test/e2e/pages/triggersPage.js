import utils from '../utils';
import instances from '../tempInstances';

export default {
  elements: {
    addTriggerConfirmButton: {
      selector: '[data-e2e="trigger-dialog-confirm-button"]'
    },
    className: {
      selector: 'input[data-e2e="class-name"]'
    },
    classUserOption: {
      selector: '[data-e2e="user_profile-user-option"]'
    },
    scriptUserOption: {
      selector: `[data-e2e=${instances.secondInstance.scriptsNames[0]}-user-option]`
    },
    addTriggerButton: {
      selector: '[data-e2e="trigger-add-button"]'
    },
    addTriggerModalLabel: {
      selector: 'input[name="label"]'
    },
    addTriggerModalSignal: {
      selector: '//div[@class="signal-dropdown"]/div/div',
      locateStrategy: 'xpath'
    },
    addTriggerModalScript: {
      selector: '[data-e2e="trigger-modal-script"]'
    },
    triggerTableRow: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]`,
      locateStrategy: 'xpath'
    },
    signalTriggerTableRow: {
      selector: `//div[@data-e2e="${utils.addSuffix('trigger')}-signal-value"]`,
      locateStrategy: 'xpath'
    },
    summaryDialogCloseButton: {
      selector: 'button[data-e2e="trigger-summary-dialog-close-button"]'
    },
    scriptSampleOption: {
      selector: `[data-e2e="${utils.getRandomSampleScriptName()}-sample-option"]`
    },
    triggerModalSummaryTitle: {
      selector: '[data-e2e="trigger-dialog-summary-title"]'
    },
    scriptDialogContent: {
      selector: '[data-e2e="script-dialog-content"]'
    },
    deleteTriggerModalTitle: {
      selector: '[data-e2e="trigger-delete-dialog-confirm"]'
    }
  }
};
