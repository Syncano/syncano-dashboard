import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';

import { DialogMixin } from '../../mixins';

import HostingPublishDialogActions from './HostingPublishDialogActions';
import HostinPublishDialogStore from './HostinPublishDialogStore';

import { Dialog } from '../../common';
import { colors as Colors } from 'material-ui/styles';

const PublishDialog = React.createClass({

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(HostinPublishDialogStore),
    DialogMixin
  ],

  handlePublishHosting() {
    const { id } = this.state;

    HostingPublishDialogActions.publishHosting(id);
  },

  render() {
    const { instanceName } = this.props.params;
    const { isLoading, open } = this.state;
    const containerStyles = {
      lineHeight: 2
    };

    return (
      <Dialog.Delete
        key="dialog"
        ref="dialog"
        icon="synicon-alert"
        iconColor={Colors.orange400}
        title="Publish your website"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={isLoading}
            submitLabel="Publish"
            handleCancel={this.handleCancel}
            handleConfirm={this.handlePublishHosting}
          />
        }
      >
        <div style={containerStyles}>
          <strong>
            {"This action will publish the changes you've applied to your website."}
          </strong>
          <div>
            Website will be available at:
          </div>
          <div>
            <a
              href={`http://${instanceName}.syncano.site`}
              target="_blank"
            >
              {`http://${instanceName}.syncano.site`}
            </a>
          </div>
          <div className="vm-4-t vm-4-b">
            Click publish button to deploy you changes
          </div>
        </div>
      </Dialog.Delete>
    );
  }
});

export default withRouter(PublishDialog);
