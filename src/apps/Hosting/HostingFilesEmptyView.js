import React from 'react';
import pluralize from 'pluralize';

import { colors as Colors } from 'material-ui/styles';
import { LinearProgress, RaisedButton } from 'material-ui';
import { EmptyView, Show } from '../../common';
import UploadFilesButton from './UploadFilesButton';

const HostingFilesEmptyView = ({
  currentFileIndex,
  currentInstanceName,
  errorResponses,
  filesCount,
  handleCancelUploading,
  handleErrorsButtonClick,
  hasFiles,
  isCanceled,
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

  const actionButtonStyle = { marginTop: 14 };
  const isActionInProgress = !isCanceled && (isDeleting || isUploading || errorResponses.length);
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
      <Show if={isUploading || (isUploadFinished && errorResponses.length)}>
        <RaisedButton
          label={isUploadFinished ? 'Close' : 'Cancel'}
          style={actionButtonStyle}
          onTouchTap={isUploadFinished ? handleErrorsButtonClick : handleCancelUploading}
          primary={true}
        />
      </Show>
    </div>
  );
  const uploadFilesButton = (
    <UploadFilesButton
      {...other}
      hasFiles={hasFiles}
      data-e2e="add-files-button"
    />
  );
  const actionButton = isActionInProgress ? progressBar : uploadFilesButton;
  const pluralizedFiles = pluralize('files', filesCount);
  const pluralizedDescription = `${filesCount} ${pluralizedFiles} ready for upload.`;
  const defaultDescription = 'Choose your files from disk:';
  const uploadingFilesDescription = `${action} ${uploadingFilesCount} ${pluralizedFiles}...`;
  const descriptionWithFiles = isActionInProgress ? uploadingFilesDescription : pluralizedDescription;
  const description = hasFiles || isActionInProgress ? descriptionWithFiles : defaultDescription;
  const isFilesQueue = hasFiles || isUploading;
  const iconClassName = isFilesQueue && 'synicon-cloud-upload';
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
      handleCancelUploading={handleCancelUploading}
      handleErrorsButtonClick={handleErrorsButtonClick}
      hostingDocsUrl="http://docs.syncano.io/docs/hosting"
      hostingDocsButtonLabel="View Hosting Docs"
      isUploadFinished={isUploadFinished}
      headerImageSrc="/img/illustrations/hosting-files-types.svg"
      iconClassName={iconClassName}
      iconColor={iconColor}
      mainTitle="Hosting Files"
      showDocsUrl={false}
      urlLabel="Hosting"
    />
  );
};

export default HostingFilesEmptyView;
