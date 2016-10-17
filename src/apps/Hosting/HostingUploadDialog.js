import React from 'react';
import Reflux from 'reflux';

import Store from './HostingFilesStore';

import HostingFilesEmptyView from './HostingFilesEmptyView';

import { DialogMixin } from '../../mixins';
import { Dialog } from '../../common';


const HostingUploadDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  render() {
    const { handleUploadFiles } = this.props;
    const { open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        onRequestClose={this.handleCancel}
        open={open}
      >
        <HostingFilesEmptyView
          {...this.props}
          handleUploadFiles={handleUploadFiles}
        />
      </Dialog.FullPage>
    );
  }
});

export default HostingUploadDialog;
