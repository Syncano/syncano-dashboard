import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin } from '../../mixins';

// Stores and Actions
import Store from './SocketsDialogStore';

// Components
import { Dialog } from '../../common/';
import EmptyView from './EmptyView';

export default React.createClass({
  displayName: 'SocketsDialog',

  mixins: [
    DialogMixin,
    Reflux.connect(Store)
  ],

  getStyles() {
    return {
      titleContainer: {
        paddingBottom: 50
      },
      title: {
        textAlign: 'center',
        fontSize: 25,
        lineHeight: '34px',
        fontWeight: 500,
        color: '#4a4a4a',
        marginBottom: 10
      },
      subtitle: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: '25px',
        color: '#4a4a4a'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        style={{ zIndex: 1499 }}
        onRequestClose={this.handleCancel}
        open={open}
      >
        <div style={styles.titleContainer}>
          <div style={styles.title}>
            Start building your app here
          </div>
          <div style={styles.subtitle}>
            Pick the functionality you need and start building your API
          </div>
        </div>
        <EmptyView />
      </Dialog.FullPage>
    );
  }
});
