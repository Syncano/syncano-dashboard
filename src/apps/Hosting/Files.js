import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { SnackbarNotificationMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
import SessionStore from '../Session/SessionStore';
import HostingPublishDialogActions from './HostingPublishDialogActions';

import { FontIcon, RaisedButton } from 'material-ui';
import { InnerToolbar, Container, Show } from '../../common';
import HostingFilesList from './HostingFilesList';
import HostingDialog from './HostingDialog';
import HostingPublishDialog from './HostingPublishDialog';

const HostingFilesView = React.createClass({
  mixins: [
    Reflux.connect(HostingFilesStore),
    SnackbarNotificationMixin
  ],

  componentDidMount() {
    const { hostingId } = this.props.params;

    HostingFilesActions.setHostingId(hostingId);
    HostingFilesActions.fetch();
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

    return hostingDetails && !isLoading ? `Website Hosting: ${hostingDetails.label} (id: ${hostingDetails.id})` : '';
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

  handleUploadFiles(directory, event) {
    event.stopPropagation();
    const { files } = event.target;

    if (files && files.length) {
      const filesToUpload = _.map(files, (file) => this.extendFilePath(file, directory));

      this.setState({ filesToUpload });
    }
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

  showMissingDomainsSnackbar() {
    this.setSnackbarNotification({
      message: "You don't have any domains yet. Please add some or set Hosting as default."
    });
  },

  extendFilePath(file, directory) {
    if (file.webkitRelativePath) {
      const firstSlashIndex = file.webkitRelativePath.indexOf('/');

      file.path = directory ? `${directory}/` : '';
      file.path += file.webkitRelativePath.substring(firstSlashIndex + 1);

      return file;
    }

    file.path = directory ? `${directory}/${file.name}` : file.name;

    return file;
  },

  render() {
    const {
      isLoading,
      hideDialogs,
      items,
      filesToUpload,
      lastFileIndex,
      currentFileIndex,
      isUploading,
      isDeleting,
      errorResponses
    } = this.state;

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
          <Show if={items.length && !isLoading}>
            <RaisedButton
              label="Go to site"
              primary={true}
              icon={<FontIcon className="synicon-open-in-new" style={{ marginTop: 4 }} />}
              onTouchTap={this.handleOnTouchTap(hostingUrl)}
              href={hostingUrl}
              target="_blank"
            />
          </Show>
        </InnerToolbar>

        <Container>
          <HostingFilesList
            currentInstanceName={currentInstanceName}
            isDeleting={isDeleting}
            isUploading={isUploading}
            lastFileIndex={lastFileIndex}
            currentFileIndex={currentFileIndex}
            handleClearFiles={this.handleClearFiles}
            filesCount={filesToUpload.length}
            handleUploadFiles={this.handleUploadFiles}
            handleSendFiles={this.handleSendFiles}
            hasFiles={hasFilesToUpload}
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
            errorResponses={errorResponses}
            handleErrorsButtonClick={HostingFilesActions.finishUploading}
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(HostingFilesView);
