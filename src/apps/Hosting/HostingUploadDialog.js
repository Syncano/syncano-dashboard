import React from 'react';
import Reflux from 'reflux';

import { DialogMixin } from '../../mixins';

import HostingUploadDialogStore from './HostingUploadDialogStore';

import { Dialog } from '../../common';
import HostingFilesEmptyView from './HostingFilesEmptyView';

const HostingUploadDialog = React.createClass({
  mixins: [
    Reflux.connect(HostingUploadDialogStore),
    DialogMixin
  ],

  render() {
    const {
      currentFileIndex,
      currentInstanceName,
      errorResponses,
      filesCount,
      handleCancelUploading,
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
        bindShortcuts={!isUploading}
        onRequestClose={this.handleCancel}
        open={open}
      >
        <HostingFilesEmptyView
          currentFileIndex={currentFileIndex}
          currentInstanceName={currentInstanceName}
          filesCount={filesCount}
          errorResponses={errorResponses}
          handleCancelUploading={handleCancelUploading}
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
