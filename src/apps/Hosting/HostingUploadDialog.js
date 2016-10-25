import React from 'react';
import Reflux from 'reflux';

import Store from './HostingUploadDialogStore';

import HostingFilesEmptyView from './HostingFilesEmptyView';

import { DialogMixin } from '../../mixins';
import { Dialog } from '../../common';

const HostingUploadDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  render() {
    const {
      currentFileIndex,
      currentInstanceName,
      errorResponses,
      filesCount,
      handleErrorsButtonClick,
      hasFiles,
      isDeleting,
      isUploading,
      lastFileIndex,
      ...other
    } = this.props;
    const { open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        showCloseButton={!isUploading}
        onRequestClose={this.handleCancel}
        open={open}
      >
        <HostingFilesEmptyView
          currentFileIndex={currentFileIndex}
          currentInstanceName={currentInstanceName}
          filesCount={filesCount}
          errorResponses={errorResponses}
          handleErrorsButtonClick={handleErrorsButtonClick}
          hasFiles={hasFiles}
          isDeleting={isDeleting}
          isUploading={isUploading}
          lastFileIndex={lastFileIndex}
          {...other}
        />
      </Dialog.FullPage>
    );
  }
});

export default HostingUploadDialog;
