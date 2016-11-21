import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { DialogsMixin, FormMixin, SnackbarNotificationMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
import SessionStore from '../Session/SessionStore';
import HostingPublishDialogActions from './HostingPublishDialogActions';
import HostingUploadDialogActions from './HostingUploadDialogActions';
import HostingFilesFolderForm from './HostingFilesFolderForm';

import { FontIcon, RaisedButton } from 'material-ui';
import { InnerToolbar, Container, Show, ToolbarTitle } from '../../common';
import HostingFilesList from './HostingFilesList';
import HostingDialog from './HostingDialog';
import HostingPublishDialog from './HostingPublishDialog';

const HostingFilesView = React.createClass({
  mixins: [
    Reflux.connect(HostingFilesStore),
    DialogsMixin,
    FormMixin,
    SnackbarNotificationMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      format: {
        pattern: '[a-zA-Z0-9-_]+$',
        message: 'can contain only a-z, 0-9'
      },
      length: {
        maximum: 64
      }
    }
  },

  componentDidMount() {
    const { hostingId } = this.props.params;

    HostingFilesActions.setHostingId(hostingId);
    HostingFilesActions.fetch();
  },

  getStyles() {
    const { errors } = this.state;
    const hasErrors = errors.name && errors.name.length;

    return {
      buttonsWrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      newFolderNameInput: {
        width: 10,
        marginRight: 10,
        marginBottom: hasErrors && 22
      },
      newFolderButton: {
        marginRight: 10
      },
      actionButtons: {
        display: 'flex',
        alignItems: 'center'
      }
    };
  },

  getHostingUrl() {
    const { hostingDetails } = this.state;
    const { instanceName } = this.props.params;
    const defaultHostingUrl = `https://${instanceName}.syncano.site/`;
    const hasDomains = hostingDetails && hostingDetails.domains.length > 0;
    const customDomainUrl = hasDomains ? `https://${hostingDetails.domains[0]}--${instanceName}.syncano.site/` : null;
    const hostingUrl = this.isDefaultHosting() ? defaultHostingUrl : customDomainUrl;

    return hostingUrl;
  },

  isDefaultHosting() {
    const { hostingDetails } = this.state;

    if (hostingDetails) {
      return _.includes(hostingDetails.domains, 'default');
    }

    return false;
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/hosting/`);
  },

  handleUploadFiles(currentPath, event) {
    event.stopPropagation();
    const { files } = event.target;

    if (files && files.length) {
      const filesToUpload = _.map(files, (file) => this.extendFilePath(file, currentPath));

      HostingFilesActions.setFilesToUpload(filesToUpload);
    }
  },

  handleNewFolderButtonClick() {
    this.setState({ showNewFolderForm: true });
  },

  handleCreateFolder(event) {
    event && event.preventDefault();
    const validateFolderName = this.handleValidation('name', (isValid) => {
      const { name } = this.state;

      if (isValid) {
        HostingFilesActions.createFolder(name);
      }
    });

    this.clearValidations(validateFolderName);
  },

  handleClearFiles() {
    HostingFilesActions.clearFilesToUpload();
  },

  handleShowPublishDialog() {
    const { hostingId, instanceName } = this.props.params;

    HostingPublishDialogActions.showDialog({ id: hostingId, instanceName });
  },

  handleShowUploadDialog() {
    HostingUploadDialogActions.showDialog();
  },

  handleSendFiles() {
    const { filesToUpload } = this.state;
    const { hostingId } = this.props.params;

    HostingFilesActions.uploadFiles(hostingId, filesToUpload);
  },

  handleGoToWebsite(url) {
    const hasHostingUrl = !_.isEmpty(url);

    return !hasHostingUrl && this.showMissingDomainsSnackbar;
  },

  handleNewFolderNameChange(event, name) {
    this.setState({ name });
  },

  showMissingDomainsSnackbar() {
    this.setSnackbarNotification({
      message: "You don't have any domains yet. Please add some or set Hosting as default."
    });
  },

  extendFilePath(file, currentPath) {
    if (file.webkitRelativePath) {
      const firstSlashIndex = file.webkitRelativePath.indexOf('/');

      file.path = currentPath ? `${currentPath}/` : '';
      file.path += file.webkitRelativePath.substring(firstSlashIndex + 1);

      return file;
    }

    file.path = currentPath ? `${currentPath}/${file.name}` : file.name;

    return file;
  },

  renderActionButtons() {
    const { errors, name, showNewFolderForm } = this.state;
    const styles = this.getStyles();

    return (
      <div style={styles.actionButtons}>
        <HostingFilesFolderForm
          errors={errors}
          name={name}
          showNewFolderForm={showNewFolderForm}
          handleNewFolderNameChange={this.handleNewFolderNameChange}
          handleCreateFolder={this.handleCreateFolder}
          handleNewFolderButtonClick={this.handleNewFolderButtonClick}
        />
        <RaisedButton
          label="Upload files"
          primary={true}
          icon={<FontIcon className="synicon-cloud-upload" />}
          style={{ marginRight: 10 }}
          onTouchTap={this.handleShowUploadDialog}
        />
      </div>
    );
  },

  render() {
    const {
      currentFileIndex,
      currentFolderName,
      errorResponses,
      filesToUpload,
      hideDialogs,
      hostingDetails,
      isUploading,
      isCanceled,
      isDeleting,
      isLoading,
      items,
      lastFileIndex,
      directoryDepth,
      previousFolders
    } = this.state;
    const styles = this.getStyles();
    const hasFilesToUpload = filesToUpload.length > 0;
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const hostingUrl = this.getHostingUrl();

    if (!hostingDetails) {
      return null;
    }

    return (
      <div>
        <Helmet title={hostingDetails.name} />
        <HostingDialog />
        <HostingPublishDialog />

        <InnerToolbar
          backButton={true}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go Back to Hosting"
        >
          <ToolbarTitle
            id={hostingDetails.id}
            title={`Hosting: ${hostingDetails.name}`}
          />
          <div style={styles.buttonsWrapper}>
            <Show if={items.length && !isLoading}>
              {this.renderActionButtons()}
            </Show>
            <RaisedButton
              label="Go to site"
              primary={true}
              icon={<FontIcon className="synicon-open-in-new" />}
              onTouchTap={() => this.handleOnTouchTap(hostingUrl)}
              target="_blank"
            />
          </div>
        </InnerToolbar>

        <Container>
          <HostingFilesList
            currentFileIndex={currentFileIndex}
            currentFolderName={currentFolderName}
            currentInstanceName={currentInstanceName}
            directoryDepth={directoryDepth}
            errorResponses={errorResponses}
            isCanceled={isCanceled}
            isDeleting={isDeleting}
            isUploading={isUploading}
            isLoading={isLoading}
            items={items}
            filesCount={filesToUpload.length}
            handleClearFiles={this.handleClearFiles}
            handleCancelUploading={HostingFilesActions.cancelUploading}
            handleErrorsButtonClick={HostingFilesActions.finishUploading}
            handleUploadFiles={this.handleUploadFiles}
            handleSendFiles={this.handleSendFiles}
            hasFiles={hasFilesToUpload}
            hideDialogs={hideDialogs}
            lastFileIndex={lastFileIndex}
            moveDirectoryDown={HostingFilesActions.moveDirectoryDown}
            moveDirectoryUp={HostingFilesActions.moveDirectoryUp}
            previousFolders={previousFolders}
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(HostingFilesView);
