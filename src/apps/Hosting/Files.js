import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { FormMixin, SnackbarNotificationMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
import SessionStore from '../Session/SessionStore';
import HostingPublishDialogActions from './HostingPublishDialogActions';

import { FontIcon, RaisedButton, TextField } from 'material-ui';
import { InnerToolbar, Container, Show } from '../../common';
import HostingFilesList from './HostingFilesList';
import HostingDialog from './HostingDialog';
import HostingPublishDialog from './HostingPublishDialog';

const HostingFilesView = React.createClass({
  mixins: [
    Reflux.connect(HostingFilesStore),
    FormMixin,
    SnackbarNotificationMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      format: {
        pattern: `[a-zA-Z0-9-_]+$`,
        message: 'can containt only a-z, 0-9, no spaces '
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
        width: 230,
        marginRight: 10,
        marginBottom: hasErrors && 22
      },
      newFolderButton: {
        marginRight: 10
      },
      newFolderForm: {
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
    const customDomainUrl = hasDomains ? `https://${instanceName}--${hostingDetails.domains[0]}.syncano.site/` : null;
    const hostingUrl = this.isDefaultHosting() ? defaultHostingUrl : customDomainUrl;

    return hostingUrl;
  },

  getToolbarTitle() {
    const { hostingDetails, isLoading } = this.state;

    return hostingDetails && !isLoading ? `Website Hosting: ${hostingDetails.name} (id: ${hostingDetails.id})` : '';
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
    const redirectPath = `/instances/${params.instanceName}/hosting/`;

    router.push(redirectPath);
  },

  handleUploadFiles(currentPath, event) {
    event.stopPropagation();
    const { files } = event.target;

    if (files && files.length) {
      const filesToUpload = _.map(files, (file) => this.extendFilePath(file, currentPath));

      this.setState({ filesToUpload });
    }
  },

  handleClickNewFolderButton() {
    this.setState({ showNewFolderForm: true });
  },

  handleCreateFolder() {
    const validateFolderName = this.handleValidation('name', (isValid) => {
      const { directoryDepth, name, previousFolders } = this.state;

      if (isValid) {
        this.setState({
          currentFolderName: name,
          directoryDepth: directoryDepth + 1,
          previousFolders: [...previousFolders, name],
          showNewFolderForm: false,
          name: ''
        });
      }
    });

    this.clearValidations(validateFolderName);
  },

  handleClearFiles() {
    this.setState({
      filesToUpload: []
    });
  },

  handleShowPublishDialog() {
    const { hostingId, instanceName } = this.props.params;

    HostingPublishDialogActions.showDialog({ id: hostingId, instanceName });
  },

  handleSendFiles() {
    const { filesToUpload } = this.state;
    const { hostingId } = this.props.params;

    HostingFilesActions.uploadFiles(hostingId, filesToUpload);
  },

  handleOnTouchTap(url) {
    const hasHostingUrl = !_.isEmpty(url);

    return !hasHostingUrl && this.showMissingDomainsSnackbar;
  },

  handleNewFolderNameChange(event, name) {
    this.setState({ name });
  },

  moveDirectoryUp(depth) {
    const { previousFolders, directoryDepth } = this.state;
    const depthLevel = _.isFinite(depth) ? depth : 1;

    this.setState({
      directoryDepth: directoryDepth - depthLevel,
      currentFolderName: previousFolders[directoryDepth - 1 - depthLevel] || '',
      previousFolders: _.dropRight(previousFolders, depthLevel)
    });
  },

  moveDirectoryDown(nextFolderName) {
    const { directoryDepth, previousFolders } = this.state;

    this.setState({
      directoryDepth: directoryDepth + 1,
      currentFolderName: nextFolderName,
      previousFolders: [...previousFolders, nextFolderName]
    });
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

  renderNewFolderButtons() {
    const { name, showNewFolderForm } = this.state;
    const styles = this.getStyles();
    const createFolderButtonLabel = showNewFolderForm ? 'Create' : 'Create new folder';
    const createFolderButtonAction = showNewFolderForm ? this.handleCreateFolder : this.handleClickNewFolderButton;
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
            style={{ ...styles.newFolderNameInput }}
          />
        </Show>
        <RaisedButton
          label={createFolderButtonLabel}
          primary={true}
          style={styles.newFolderButton}
          onTouchTap={createFolderButtonAction}
          disabled={disableNewFolderButton}
        />
      </div>
    );
  },

  render() {
    const {
      currentFileIndex,
      currentFolderName,
      directoryDepth,
      errorResponses,
      filesToUpload,
      hideDialogs,
      isDeleting,
      isLoading,
      isUploading,
      items,
      lastFileIndex,
      previousFolders,
      hostingDetails
    } = this.state;

    if (!hostingDetails) {
      return null;
    }

    const styles = this.getStyles();
    const hasFilesToUpload = filesToUpload.length > 0;
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const hostingUrl = this.getHostingUrl();
    const pageTitle = this.getToolbarTitle();

    return (
      <div>
        <Helmet title={pageTitle} />
        <HostingDialog />
        <HostingPublishDialog />

        <InnerToolbar
          title={pageTitle}
          backButton={true}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go Back to Hosting Sockets"
        >
          <div style={styles.buttonsWrapper}>
            <Show if={items.length && !isLoading}>
              {this.renderNewFolderButtons()}
            </Show>
            <RaisedButton
              label="Go to site"
              primary={true}
              icon={<FontIcon className="synicon-open-in-new" />}
              onTouchTap={this.handleOnTouchTap(hostingUrl)}
              href={hostingUrl}
              target="_blank"
            />
          </div>
        </InnerToolbar>

        <Container>
          <HostingFilesList
            currentFolderName={currentFolderName}
            currentFileIndex={currentFileIndex}
            currentInstanceName={currentInstanceName}
            directoryDepth={directoryDepth}
            filesCount={filesToUpload.length}
            errorResponses={errorResponses}
            handleErrorsButtonClick={HostingFilesActions.finishUploading}
            handleClearFiles={this.handleClearFiles}
            handleUploadFiles={this.handleUploadFiles}
            handleSendFiles={this.handleSendFiles}
            hasFiles={hasFilesToUpload}
            hideDialogs={hideDialogs}
            isDeleting={isDeleting}
            isLoading={isLoading}
            isUploading={isUploading}
            items={items}
            lastFileIndex={lastFileIndex}
            moveDirectoryDown={this.moveDirectoryDown}
            moveDirectoryUp={this.moveDirectoryUp}
            previousFolders={previousFolders}
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(HostingFilesView);
