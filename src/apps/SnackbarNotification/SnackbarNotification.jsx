import React from 'react';
import Reflux from 'reflux';
import { Snackbar } from 'material-ui';

import Actions from './SnackbarNotificationActions';
import Store from './SnackbarNotificationStore';

export default React.createClass({
  displayName: 'SnackbarNotification',

  mixins: [
    Reflux.connect(Store)
  ],

  componentWillUpdate() {
    console.debug('SnackbarNotification::componentWillUpdate');

    if (this.state.snackbar === null) {
      return;
    }

    if (typeof this.state.snackbar.delay !== 'undefined') {
      delete this.state.snackbar.delay;
      return;
    }

    if (this.state.snackbar !== null) {
      this.refs.snackbar.setState({ open: false });
    }
  },

  componentDidUpdate() {
    console.debug('SnackbarNotification::componentDidUpdate');

    if (this.state.snackbar === null) {
      return;
    }

    if (this.refs.snackbar._wasOpen === true) {
      return;
    }

    if (this.refs.snackbar.state.open === false) {
      this.refs.snackbar._wasOpen = true;
      this.refs.snackbar.show();
    }
  },

  render() {
    const snackbar = this.state.snackbar;

    if (snackbar === null) {
      return null;
    }

    return (
      <Snackbar
        data-e2e="snackbar-notifcation"
        ref="snackbar"
        key={snackbar.key}
        message={snackbar.message}
        action={snackbar.action}
        autoHideDuration={snackbar.autoHideDuration}
        onActionTouchTap={snackbar.onActionTouchTap}
        open={snackbar.open}
        onRequestClose={Actions.dismiss}
        style={snackbar.style}
      />
    );
  }
});
