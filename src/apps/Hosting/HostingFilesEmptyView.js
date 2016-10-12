import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import { LinearProgress } from 'material-ui';
import { EmptyView } from '../../common';
import UploadFilesButton from './UploadFilesButton';

const HostingFilesEmptyView = ({
  currentInstanceName,
  hasFiles,
  filesCount,
  isUploading,
  lastFileIndex,
  currentFileIndex,
  ...other
}) => {
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

  const defaultDescription = 'Choose your website files from your disk.';
  const uploadingFilesDescription = `Uploading ${uploadingFilesCount} files...`;
  const descriptionWithFiles = isUploading ? uploadingFilesDescription : `${filesCount} files ready for upload.`;
  const bashSnippets = [
    { description: 'Install Syncano CLI:', snippet: 'pip install syncano-cli' },
    { description: 'Login to your Syncano account:', snippet: `syncano login --instance-name ${currentInstanceName}` },
    { description: 'Deploy your application:', snippet: 'syncano hosting publish ./your/project/path' }
  ];

  return (
    <EmptyView.CLI
      iconClassName={hasFiles || isUploading ? 'synicon-cloud-upload' : 'synicon-hosting-files-types'}
      iconColor={hasFiles || isUploading ? Colors.blue500 : Colors.grey600}
      mainTitle="Hosting Socket Files"
      showDocsUrl={false}
      urlLabel="Hosting Socket"
      description={hasFiles || isUploading ? descriptionWithFiles : defaultDescription}
      docsUrl="http://docs.syncano.io/docs/"
      actionButton={isUploading ? progressBar : actionButton}
      CLITitle="Use Syncano CLI"
      CLIDescription="The best way to manage your hosting files is with "
      bashSnippets={bashSnippets}
      hostingDocsUrl="http://docs.syncano.io/docs/hosting"
      hostingDocsButtonLabel="View Hosting Docs"
    />
  );
};

export default HostingFilesEmptyView;
