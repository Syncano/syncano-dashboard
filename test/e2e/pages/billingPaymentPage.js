import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/payment-methods/`,
  elements: {
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
    addPaymentButton: {
      selector: '[data-e2e="payment-add-button"]'
    },
    updatePaymentButton: {
      selector: '[data-e2e="payment-update-button"]'
    },
    filledOutCard: {
      selector: '[data-e2e="filled-out-card"]'
    },
    visibleCardNumber: {
      selector: '[data-e2e="payment-card-visible-digits"]'
    },
    removePaymentButton: {
      selector: '[data-e2e="payment-remove-button"]'
    },
    confirmRemoveButton: {
      selector: '[data-e2e="payment-delete-dialog-confirm"]'
    }
  }
};
