import React from 'react';
import Reflux from 'reflux';

// Utils
import { DialogMixin, FormMixin } from '../../../mixins';

// Stores and Actions
import Actions from './GCMPushNotificationsActions';
import Store from './GCMConfigDialogStore';

// Components
import { TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Loading, Dialog } from '../../../common/';

export default React.createClass({
  displayName: 'GCMConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    return {
      development_api_key: {
        length: {
          maximum: 40
        }
      },
      production_api_key: {
        length: {
          maximum: 40
        }
      }
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      actionsContainer: {
        padding: 20
      },
      apiKeys: {
        padding: '0 30px'
      },
      GDClink: {
        margin: '80px 0',
        cursor: 'pointer',
        color: Colors.blue400
      }
    };
  },

  handleSaveGCMConfig() {
    const { production_api_key, development_api_key } = this.state;

    Actions.configGCMPushNotification({ production_api_key, development_api_key });
  },

  handleAddSubmit() {
    this.handleSaveGCMConfig();
  },

  handleEditSubmit() {
    this.handleSaveGCMConfig();
  },

  render() {
    const styles = this.getStyles();
    const { open, isLoading, canSubmit, isCertLoading, development_api_key, production_api_key } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Configure Push Notification Socket - Google"
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            data-e2e-submit="push-notification-submit-button"
            data-e2e-cancel="push-notification-cancel-button"
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Google Push Notification Sockets allow for sending messages directly to your users Android devices. Thanks
               to this functionality, your users can be quickly informed about changes taking place within your
               application.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Development and Production API keys">
              Those are your API keys from Google Developer Console. At least one of them is required to send Push
               Notification messages to devices.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/push-notification-sockets-android">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div className="row align-center hp-2-l hp-2-r vp-2-t">
          <div dangerouslySetInnerHTML={{ __html: require('./phone-android.svg') }} />
          <div className="col-flex-1 hm-3-l">
            <Loading show={isCertLoading}>
              <TextField
                ref="development_api_key"
                name="development_api_key"
                autoFocus={true}
                value={development_api_key}
                onChange={(event, value) => this.setState({ development_api_key: value })}
                fullWidth={true}
                floatingLabelText="Google Cloud Messaging Development API key"
                errorText={this.getValidationMessages('development_api_key').join(' ')}
              />
              <TextField
                ref="production_api_key"
                name="production_api_key"
                value={production_api_key}
                onChange={(event, value) => this.setState({ production_api_key: value })}
                fullWidth={true}
                floatingLabelText="Google Cloud Messaging Production API key"
                errorText={this.getValidationMessages('production_api_key').join(' ')}
              />
            </Loading>
            <div className="vm-4-t">
              You can find this key in
              <a
                style={styles.GDClink}
                href="https://console.developers.google.com"
              > Google Developer Console</a>
            </div>
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
