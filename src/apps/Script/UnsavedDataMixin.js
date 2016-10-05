import _ from 'lodash';

export default {

  componentDidMount() {
    if (!_.isFunction(this.isSaved)) {
      throw Error('invalid `isSaved` type. Expected type: function');
    }
    if (!_.isFunction(this.initDialogs)) {
      throw Error('invalid `initDialogs` type. Expected type: function');
    }
  },

  statics: {
    willTransitionFrom(transition, component) {
      if (component.hasOwnProperty('clearAutosaveTimer')) {
        component.clearAutosaveTimer();
      }
      if (!component.isSaved() && !component.state._ignoreUnsavedData) {
        transition.abort();
        component.showDialog('unsavedDataWarn');
        component.state._interuptedTransitionPath = transition.path;
      }
    }
  },

  getInitialState() {
    return {
      _ignoreUnsavedData: false
    };
  },

  _handleContinueTransition() {
    this.setState({
      _ignoreUnsavedData: true
    });
    this.transitionTo(this.state._interuptedTransitionPath);
    this.hideDialogs(true);
  }
};
