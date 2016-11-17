import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../../mixins';

// Stores and Actions
import Actions from './APNSPushNotificationsActions';
import Store from './APNSConfigDialogStore';

// Components
import { IconButton, TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Show, Dialog, DropZone, Notification } from '../../../common/';

export default Radium(React.createClass({
  displayName: 'APNSConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const { certificateTypes } = this.state;
    const validator = {};

    _.forEach(certificateTypes, (certificateType) => {
      if (this.state[`${certificateType}_certificate`]) {
        validator[`${certificateType}_certificate_name`] = {
          presence: true,
          length: {
            maximum: 200
          }
        };
        validator[`${certificateType}_bundle_identifier`] = {
          presence: true,
          length: {
            maximum: 200
          }
        };
      }
    });

    return validator;
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      dropzoneContainer: {
        padding: '20px 0'
      },
      apiKeys: {
        paddingLeft: 30
      },
      GDClink: {
        margin: '80px 0',
        cursor: 'pointer',
        color: Colors.blue400
      },
      actionsContainer: {
        padding: 20
      },
      dropzoneWithFileTitle: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 500,
        paddingTop: 16
      },
      dropzoneWithFileContainer: {
        position: 'relative',
        width: '100%'
      },
      certificateType: {
        fontSize: 11,
        paddingBottom: 10
      },
      closeIconColor: {
        color: Colors.grey400
      },
      closeIcon: {
        position: 'absolute',
        right: 0
      }
    };
  },

  handleAddSubmit() {
    Actions.configAPNSPushNotification(this.removeEmptyParams(this.state));
  },

  removeEmptyParams(params) {
    return _.omitBy(params, _.isEmpty);
  },

  renderDropzoneDescription(type) {
    const styles = this.getStyles();
    const handleRemoveCertificate = () => Actions.removeCertificate(type);

    if (!this.state[`${type}_certificate`]) {
      return null;
    }

    return (
      <div
        className="row"
        style={styles.dropzoneWithFileContainer}
      >
        <IconButton
          data-e2e="apns-notification-remove-certificate"
          onTouchTap={handleRemoveCertificate}
          style={styles.closeIcon}
          iconStyle={styles.closeIconColor}
          tooltip="Remove cerificate"
          iconClassName="synicon-close"
        />
        <div className="col-flex-1">
          <div style={styles.dropzoneWithFileTitle}>{_.capitalize(type)} certificate</div>
          <div className="row align-middle">
            <div className="col-xs-24">
              <TextField
                data-e2e={`${type}-certificate-name-input`}
                fullWidth={true}
                value={this.state[`${type}_certificate_name`]}
                onChange={(event, value) => this.setState({ [`${type}_certificate_name`]: value })}
                errorText={this.getValidationMessages(`${type}_certificate_name`).join(' ')}
                floatingLabelText="Apple Push Notification Certificate Name"
              />
            </div>
            <div className="col-xs-11">
              <TextField
                underlineShow={false}
                disabled={true}
                autoWidth={true}
                fullWidth={true}
                value={_.capitalize(type)}
                floatingLabelText="Type"
              />
            </div>
          </div>
          <div className="row align-middle">
            <div className="col-xs-23">
              <TextField
                fullWidth={true}
                value={this.state[`${type}_bundle_identifier`]}
                onChange={(event, value) => this.setState({ [`${type}_bundle_identifier`]: value })}
                errorText={this.getValidationMessages(`${type}_bundle_identifier`).join(' ')}
                floatingLabelText="Bundle Identifier"
              />
            </div>
            <div className="col-xs-12">
              <div style={styles.certificateType}>Expiration Date</div>
              {this.state[`${type}_expiration_date`]}
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderDropZones() {
    const { certificateTypes, isCertLoading } = this.state;

    return _.map(certificateTypes, (type) => {
      const handleOnDrop = (file) => Actions.setCertificate(type, file);

      return (
        <div
          key={`dropzone${type}`}
          style={[type === 'production' && { marginTop: 16 }]}
        >
          <DropZone
            certificateType={type}
            accept="application/x-pkcs12"
            isLoading={isCertLoading}
            handleButtonClick={handleOnDrop}
            onDrop={handleOnDrop}
            disableClick={true}
            withButton={true}
            uploadButtonLabel="UPLOAD .p12 CERTIFICATE"
          >
            {this.renderDropzoneDescription(type)}
          </DropZone>
        </div>
      );
    });
  },

  renderCertificateErrors() {
    const { certificateTypes } = this.state;

    return _.map(certificateTypes, (type) => (
      <Show
        key={`certificateError${type}`}
        if={this.getValidationMessages(`${type}_certificate`).length > 0}
      >
        <div className="vm-2-t">
          <Notification type="error">
            {this.getValidationMessages(`${type}_certificate`).join(' ')}
          </Notification>
        </div>
      </Show>
    ));
  },

  render() {
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="large"
        title="Configure Push Notification Socket - Apple"
        autoDetectWindowHeight={true}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            data-e2e-submit="push-notification-submit-button"
            data-e2e-cancel="push-notification-cancel-button"
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              <strong>Apple Push Notification Socket</strong> allows you to send messages to your iOS devices. You can
              easily notify users about updates etc.
              <br /><br />
              <i>
                NOTE: At least one production or development certificate must be uploaded to send Push Notifications.
              </i>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Certificates">
              Certificates are IDs that uniquely identify your application.
              <br /><br />
              <i>
                {`NOTE: If you don't have any certificates generated yet, click link below to learn how to generate them
                 from our docs.`}
              </i>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/push-notification-sockets-ios">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div className="row align-center hp-2-l hp-2-r vm-2-b vm-2-t">
          <div
            className="hm-2-r"
            dangerouslySetInnerHTML={{ __html: require('./phone-apple.svg') }}
          />
          <div className="col-flex-1">
            {this.renderDropZones()}
            {this.renderCertificateErrors()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
}));
