import _ from 'lodash';
import SessionActions from '../apps/Session/SessionActions';

export default {
  setLoadingStates() {
    if (this.listenables) {
      const listenables = [].concat(this.listenables);

      _.forEach(listenables, (listenable) => {
        this.bindLoadingListeners(listenable);
        this.bindFailureListeners(listenable);
      });
    }
  },

  bindLoadingListeners(listenable) {
    _.forEach(listenable, (action, name) => {
      if (action.asyncResult === true && action.loading === true) {
        const predicate = (n) => _.isFunction(this[n]);
        const trigger = {
          action: !_.some([name, _.camelCase(`on ${name}`)], predicate),
          completed: !_.some([_.camelCase(`on ${name} completed`), _.camelCase(`${name} completed`)], predicate),
          failure: !_.some([_.camelCase(`on ${name} failure`), _.camelCase(`${name} failure`)], predicate)
        };

        this.listenTo(action, () => this.setLoading(true, trigger.action));
        this.listenTo(action.completed, () => this.setLoading(false, trigger.completed));
        this.listenTo(action.failure, () => this.setLoading(false, trigger.failure));
      }
    });
  },

  bindFailureListeners(listenable) {
    _.forEach(listenable, (action) => {
      action.redirectOnFailure && this.listenTo(action.failure, SessionActions.handleInvalidURL);
    });
  },

  setLoading(state = true, trigger = true) {
    if (this.data.isLoading === state) {
      return;
    }

    this.data.isLoading = state;

    if (trigger) {
      if (!state) {
        this.data.hideDialogs = true;
      }

      this.trigger(this.data);
    }
  }
};
