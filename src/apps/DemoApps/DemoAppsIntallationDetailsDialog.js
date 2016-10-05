import React from 'react';
import Reflux from 'reflux';

import Store from './DemoAppsIntallationDetailsDialogStore';

import { DialogMixin } from '../../mixins';
import { Dialog } from '../../common/';

export default React.createClass({
  displayName: 'DemoAppsIntallationDetailsDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  render() {
    const { open, isLoading, metadata } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={metadata && metadata.install_desc ? metadata.install_desc.title : 'Installation info'}
        onRequestClose={this.handleCancel}
        loading={isLoading}
        open={open}
      >
        <div>
          {metadata && metadata.install_desc ? metadata.install_desc.description : null}
        </div>
      </Dialog.FullPage>
    );
  }
});
