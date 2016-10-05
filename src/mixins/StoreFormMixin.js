import _ from 'lodash';

export default {

  getInitialFormState() {
    return {
      errors: {},
      feedback: null,
      canSubmit: true
    };
  },

  listenToForms() {
    if (this.listenables) {
      const arr = [].concat(this.listenables);

      _.forEach(arr, this.listenToForm);
    }
  },

  listenToForm(listenable) {
    _.forEach(listenable, (action) => {
      if (action.asyncResult === true && action.asyncForm === true) {
        this.listenTo(action, this.handleForm);
        this.listenTo(action.completed, this.handleFormCompleted);
        this.listenTo(action.failure, this.handleFormFailure);
      }
    });
  },

  handleForm() {
    console.debug('StoreFormMixin::handleForm');
    this.trigger({ canSubmit: false });
  },

  handleFormCompleted() {
    console.debug('StoreFormMixin::handleFormCompleted');
    this.trigger(this.getInitialFormState());
  },

  handleFormFailure(payload) {
    console.debug('StoreFormMixin::handleFormFailure');
    const state = this.getInitialFormState();

    if (typeof payload === 'string') {
      state.errors.feedback = payload;
    } else {
      if (_.isEmpty(payload.errors)) {
        if (typeof payload.non_field_errors !== 'undefined') {
          state.errors.feedback = payload.non_field_errors.join(' ');
        }

        if (typeof payload.__all__ !== 'undefined') {
          state.errors.feedback = payload.__all__.join(' ');
        }

        if (typeof payload.message !== 'undefined') {
          state.errors.feedback = payload.message;
        }
      }

      const errorsObject = payload.errors || payload;

      _.forEach(errorsObject, (errors, field) => {
        state.errors[field] = [].concat(errors);
      });
    }

    this.trigger(state);
  }
};
