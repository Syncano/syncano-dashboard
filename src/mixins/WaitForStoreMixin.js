import _ from 'lodash';

export default {

  init() {
    this._shouldFetch = false;
    this._fetchCallback = null;
  },

  fetch() {
    console.debug('WaitForStoreMixin::fetch', this._shouldFetch);

    if (this._shouldFetch === false) {
      this._shouldFetch = true;
      return this._shouldFetch;
    }

    if (this._fetchCallback !== null) {
      this._fetchCallback();
    }

    return this._fetchCallback;
  },

  waitFor() {
    console.debug('WaitForStoreMixin::waitFor');

    if (arguments.length < 2) {
      throw Error('At least two arguments are required: Action, Callback.');
    }

    const args = [].splice.call(arguments, 0);
    const callback = args.pop();
    const listenMethod = (args.length > 1) ? this.joinTrailing : this.listenTo;

    if (this.listenables) {
      const listenables = [].concat(this.listenables);

      _.forEach(listenables, (listenable) => {
        if (!_.isUndefined(listenable.fetch)) {
          args.push(listenable.fetch);
        }
      });
    }

    this._fetchCallback = callback;
    args.push(this.fetch);
    listenMethod.apply(this, args);
  }
};
