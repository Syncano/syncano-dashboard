import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
import HostingPublishDialogActions from './HostingPublishDialogActions';

import { RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { InnerToolbar, Container, Show } from '../../common';
import HostingFilesList from './HostingFilesList';
import HostingDialog from './HostingDialog';
import HostingPublishDialog from './HostingPublishDialog';

const HostingFilesView = React.createClass({
  mixins: [
    Reflux.connect(HostingFilesStore)
  ],

  componentDidMount() {
    const { hostingId } = this.props.params;

    HostingFilesActions.setHostingId(hostingId);
    HostingFilesActions.fetch();
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

  handleUploadFiles(event) {
    event.stopPropagation();
    const { files } = event.target;

    if (files && files.length) {
      const filesToUpload = _.map(files, this.extendFilePath);

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

  extendFilePath(file) {
    const firstSlashIndex = file.webkitRelativePath.indexOf('/');

    file.path = file.webkitRelativePath.substring(firstSlashIndex + 1);

    return file;
  },

  render() {
    const { isLoading, hideDialogs, items, filesToUpload, lastFileIndex, currentFileIndex, isUploading } = this.state;
    const hasFilesToUpload = filesToUpload.length > 0;
    const isDefaultHosting = this.isDefaultHosting();

    return (
      <div>
        <Helmet title="Website Hosting" />
        <HostingDialog />
        <HostingPublishDialog />

        <InnerToolbar
          title="Website Hosting"
          backButton={true}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go back to Hostings List"
        >
          <Show if={items.length && !isLoading}>
            <RaisedButton
              label={isDefaultHosting ? 'Published' : 'Publish'}
              onTouchTap={this.handleShowPublishDialog}
              primary={true}
              disabled={isDefaultHosting}
              disabledBackgroundColor={Colors.green500}
              disabledLabelColor="#FFF"
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
