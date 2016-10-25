import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import { LinearProgress } from 'material-ui';
import { EmptyView } from '../../common';
import UploadFilesButton from './UploadFilesButton';

const HostingFilesEmptyView = ({
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
}) => {
  const progressBarStyles = {
    width: '100%'
  };
  const action = (() => {
    if (isUploading) {
      return 'Uploading';
    }
    if (isDeleting) {
      return 'Deleting';
    }
    return '';
  })();
  const isActionInProgress = isDeleting || isUploading;
  const uploadingFilesCount = lastFileIndex + 1;
  const uploadingProgressCount = currentFileIndex + 1;
  const isUploadFinished = currentFileIndex === lastFileIndex;
  const progressBar = (
    <div style={progressBarStyles}>
      <LinearProgress
        color={Colors.blue500}
        mode="determinate"
        min={0}
        max={uploadingFilesCount}
        value={uploadingProgressCount}
      />
      <div className="vm-2-t">
        {`${action} file ${uploadingProgressCount} / ${uploadingFilesCount}`}
      </div>
    </div>
  );
  const actionButton = isActionInProgress ? progressBar : (
    <UploadFilesButton
      {...other}
      hasFiles={hasFiles}
      data-e2e="add-files-button"
    />
  );

  const defaultDescription = 'Choose your website files from your disk.';
  const uploadingFilesDescription = `${action} ${uploadingFilesCount} files...`;
  const descriptionWithFiles = isActionInProgress ? uploadingFilesDescription : `${filesCount} files ready for upload.`;
  const description = hasFiles || isActionInProgress ? descriptionWithFiles : defaultDescription;
  const isFilesQueue = hasFiles || isUploading;
  const iconClassName = isFilesQueue ? 'synicon-cloud-upload' : 'synicon-hosting-files-types';
  const iconColor = isFilesQueue ? Colors.blue500 : Colors.grey600;
  const bashSnippets = [
    { description: 'Install Syncano CLI:', snippet: 'pip install syncano-cli' },
    { description: 'Login to your Syncano account:', snippet: `syncano login --instance-name ${currentInstanceName}` },
    { description: 'Deploy your application:', snippet: 'syncano hosting publish ./your/project/path' }
  ];

  return (
    <EmptyView.CLI
      actionButton={actionButton}
      bashSnippets={bashSnippets}
      CLITitle="Use Syncano CLI"
      CLIDescription="The best way to manage your hosting files is with "
      description={description}
      docsUrl="http://docs.syncano.io/docs/"
      errorResponses={errorResponses}
      handleErrorsButtonClick={handleErrorsButtonClick}
      hostingDocsUrl="http://docs.syncano.io/docs/hosting"
      hostingDocsButtonLabel="View Hosting Docs"
      isUploadFinished={isUploadFinished}
      iconClassName={iconClassName}
      iconColor={iconColor}
      mainTitle="Hosting Socket Files"
      showDocsUrl={false}
      urlLabel="Hosting Socket"
    />
  );
};

export default HostingFilesEmptyView;
