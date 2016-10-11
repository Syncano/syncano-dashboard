import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { SnackbarNotificationMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
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
    const firstSlashIndex = file.webkitRelativePath.indexOf('/');

    file.path = `${directory}/${file.webkitRelativePath.substring(firstSlashIndex + 1)}`;

    return file;
  },

  render() {
    const {
      isLoading,
      hideDialogs,
      hostingDetails,
      items,
      filesToUpload,
      lastFileIndex,
      currentFileIndex,
      isUploading
    } = this.state;

    const hasFilesToUpload = filesToUpload.length > 0;
    const hostingUrl = this.getHostingUrl();
    const hostingLabel = hostingDetails ? hostingDetails.label : '';
    const pageTitle = `Website Hosting: ${hostingLabel}`;

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
          backButtonTooltip="Go back to Hostings List"
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
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(HostingFilesView);
