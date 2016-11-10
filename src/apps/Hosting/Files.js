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

import { FontIcon, RaisedButton, TextField } from 'material-ui';
import { InnerToolbar, Container, Show, Tooltip } from '../../common';
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
      customToolbarTitle: {
        fontSize: 20,
        lineHeight: '56px',
        color: 'rgba(0, 0, 0, .4)',
        padding: '0 24px 0 0'
      },
      newFolderNameInput: {
        width: 180,
        marginRight: 10,
        marginBottom: hasErrors && 22
      },
      newFolderButton: {
        marginRight: 10
      },
      newFolderForm: {
        display: 'flex',
        alignItems: 'center'
      },
      toolbarTooltip: {
        top: 30
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

  getWholeTitle() {
    const { hostingDetails, isLoading } = this.state;

    return hostingDetails && !isLoading ? `Hosting: ${hostingDetails.name} (id: ${hostingDetails.id})` : '';
  },

  getTruncatedTitle() {
    const { hostingDetails, isLoading } = this.state;

    if (hostingDetails && !isLoading) {
      const hostingName = `Hosting: ${hostingDetails.name}`;

      return `${_.truncate(hostingName, { length: 55 })} (id: ${hostingDetails.id})`;
    }

    return '';
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

  handleCreateFolder() {
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
    const { name, showNewFolderForm } = this.state;
    const styles = this.getStyles();
    const createFolderButtonLabel = showNewFolderForm ? 'Create' : 'New folder';
    const createFolderButtonAction = showNewFolderForm ? this.handleCreateFolder : this.handleNewFolderButtonClick;
    const disableNewFolderButton = showNewFolderForm && !name;

    return (
      <div style={styles.newFolderForm}>
        <Show if={showNewFolderForm}>
          <TextField
            fullWidth={true}
            name="name"
            value={name}
            onChange={this.handleNewFolderNameChange}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Type new folder name"
            style={styles.newFolderNameInput}
          />
        </Show>
        <RaisedButton
          label={createFolderButtonLabel}
          primary={true}
          style={styles.newFolderButton}
          onTouchTap={createFolderButtonAction}
          disabled={disableNewFolderButton}
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
    const wholeTitle = this.getWholeTitle();
    const truncatedTitle = this.getTruncatedTitle();

    if (!hostingDetails) {
      return null;
    }

    return (
      <div>
        <Helmet title={wholeTitle} />
        <HostingDialog />
        <HostingPublishDialog />

        <InnerToolbar
          backButton={true}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go Back to Hosting"
        >
          <Tooltip
            label={wholeTitle}
            horizontalPosition="right"
            style={styles.toolbarTooltip}
          >
            <span style={styles.customToolbarTitle}>{truncatedTitle}</span>
          </Tooltip>
          <div style={{ flex: 1 }} />
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
