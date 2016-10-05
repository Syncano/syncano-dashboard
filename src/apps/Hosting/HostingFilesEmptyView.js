import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import { LinearProgress } from 'material-ui';
import { EmptyView } from '../../common';
import UploadFilesButton from './UploadFilesButton';

const HostingFilesEmptyView = ({ hasFiles, filesCount, isUploading, lastFileIndex, currentFileIndex, ...other }) => {
  const progressBarStyles = {
    width: '100%'
  };
  const uploadingFilesCount = lastFileIndex + 1;
  const progressBar = (
    <div style={progressBarStyles}>
      <LinearProgress
        color={Colors.blue500}
        mode="determinate"
        min={0}
        max={uploadingFilesCount}
        value={currentFileIndex}
      />
      <div className="vm-2-t">
        Uploading file {currentFileIndex} / {uploadingFilesCount}
      </div>
    </div>
  );
  const actionButton = (
    <UploadFilesButton
      {...other}
      hasFiles={hasFiles}
      data-e2e="add-files-button"
    />
  );

  const defaultDescription = 'Choose folder with your website files from your disk.';
  const uploadingFilesDescription = `Uploading ${uploadingFilesCount} files...`;
  const descriptionWithFiles = isUploading ? uploadingFilesDescription : `${filesCount} files ready for upload.`;

  return (
    <EmptyView
      iconClassName={hasFiles || isUploading ? 'synicon-cloud-upload' : 'synicon-hosting-files-types'}
      iconColor={hasFiles || isUploading ? Colors.blue500 : Colors.grey600}
      title="Hosting Socket Files"
      showDocsUrl={!hasFiles}
      urlLabel="Hosting Socket"
      description={hasFiles || isUploading ? descriptionWithFiles : defaultDescription}
      docsUrl="http://docs.syncano.io/docs/"
      actionButton={isUploading ? progressBar : actionButton}
    />
  );
};

export default HostingFilesEmptyView;
