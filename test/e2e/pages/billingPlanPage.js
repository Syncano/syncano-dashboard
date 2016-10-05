import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/plan/`,
  elements: {
    openPlansExplorerButton: {
      selector: '[data-e2e="open-plans-explorer-button"]'
    },
    cardNumberInput: {
      selector: '[data-e2e="card-number-input"]'
    },
    cardMonthInput: {
      selector: '[data-e2e="card-month-input"]'
    },
    cardYearInput: {
      selector: '[data-e2e="card-year-input"]'
    },
    cardCVCInput: {
      selector: '[data-e2e="card-cvc-input"]'
    },
    confirmButton: {
      selector: '[data-e2e="confirm-button"]'
    },
    goBackButton: {
      selector: '[data-e2e="go-back-button"]'
    },
    planBarLocator: {
      selector: '[data-e2e="plan-name-text"]'
    },
    cancelPlanButton: {
      selector: '[data-e2e="cancel-plan-button"]'
    },
    cancelPlanReason: {
      selector: 'input[value="Business needs have changed"]'
    },
    confirmCancelPlanButton: {
      selector: '[data-e2e="confirm-cancel-plan-button"]'
    },
    successfullCancelPlanMessage: {
      selector: '[data-e2e="successfull-cancel-plan-message"]'
    },
    cancelPlanMessageBackButton: {
      selector: '[data-e2e="cancel-plan-message-back-button"]'
    },
    expiredTextLocation: {
      selector: '[data-e2e="expire-subscription-text"]'
    },
    softLimitInput: {
      selector: 'input[name=soft_limit]'
    },
    hardLimitInput: {
      selector: 'input[name=hard_limit]'
    },
    setLimitsButton: {
      selector: '[data-e2e="set-limits-button"]'
    }
  }
};
