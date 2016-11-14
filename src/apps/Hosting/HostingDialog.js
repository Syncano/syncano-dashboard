import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import HostingDialogStore from './HostingDialogStore';
import HostingStore from './HostingStore';
import HostingActions from './HostingActions';
import SessionStore from '../Session/SessionStore';

import { TextField, Toggle } from 'material-ui';
import { Dialog, Show, Notification } from '../../common';

const CreateHostingDialog = React.createClass({
  mixins: [
    Reflux.connect(HostingDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    description: {
      length: {
        maximum: 256
      }
    }
  },

  getHostingParams() {
    const { description, domains = [], id, is_default, name } = this.state;

    return { name, description, id, is_default, domains };
  },

  getStyles() {
    return {
      contentSection: {
        margin: '0 0 20px'
      },
      toggle: {
        maxWidth: 400,
        marginTop: 10
      },
      nameStyle: {
        lineHeight: 1.4,
        color: 'rgba(68, 68, 68, .8)'
      },
      defaultExplanation: {
        margin: '30px 0 10px'
      },
      defaultHostingContentSection: {
        margin: 0
      }
    };
  },

  handleAddSubmit() {
    const { description, domains = [], is_default, name, cname } = this.state;
    const hostingCount = HostingStore.data.items.length;
    const params = { description, domains, is_default, name };

    cname && params.domains.push(cname);

    if (!hostingCount) {
      params.is_default = true;
    }

    HostingActions.createHosting(params);
  },

  handleEditSubmit() {
    const params = this.getHostingParams();
    const { cnameIndex, cname = params.domains[cnameIndex] } = this.state;
    const pristineCname = cname && cnameIndex < 0;
    const updateCname = cname && cnameIndex > -1;
    const removeCname = !cname && cnameIndex > -1;

    if (pristineCname) {
      params.domains.push(cname);
    }

    if (updateCname) {
      params.domains[cnameIndex] = cname;
    }

    if (removeCname) {
      _.remove(params.domains, (value, index) => index === cnameIndex);
    }

    HostingActions.updateHosting(params.id, params);
  },

  handleChangeName(event, value) {
    this.setState({ name: value });
  },

  handleCNAMEChange(event, value) {
    this.setState({ cname: value });
  },

  handleChangeDescription(event, value) {
    this.setState({ description: value });
  },

  handleDefaultDomain() {
    const { is_default } = this.state;

    this.setState({ is_default: !is_default });
  },

  render() {
    const { is_default, isLoading, open, name, description, canSubmit, domains = [], cnameIndex, cname } = this.state;
    const hasEditMode = this.hasEditMode();
    const title = hasEditMode ? 'Edit Hosting' : 'Add Hosting';
    const hostingCname = cname || domains[cnameIndex];
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const defaultLink = `https://${currentInstanceName}.syncano.site`;
    const nameLink = `https://${name}--${currentInstanceName}.syncano.site`;
    const sidebarCustomDomain = _.isEmpty(hostingCname) ? 'DOMAIN' : hostingCname;
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={title}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
            data-e2e-submit="hosting-dialog-submit-button"
          />
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              Hosting allows you to manage, deploy and publish websites using Syncano Platform.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Hosting name">
              {"Hosting's name in Syncano Dashboard. It is also used to construct your hosting domain url."}
            </Dialog.SidebarSection>
            <Show if={this.hasEditMode()}>
              <Dialog.SidebarSection title="Default hosting">
                Enabling the <em>default hosting</em> will set this hosting&apos;s domain url to be also available
                at {defaultLink}
              </Dialog.SidebarSection>
            </Show>
            <Dialog.SidebarSection title="CNAME">
              If your domain name is, for example, <em>my-domain.com</em> then type it in the CNAME field. Next,
              go to your domain name provider website and set the CNAME to point at {nameLink}
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/v1.1/docs/hosting/">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div>
          <TextField
            autoFocus={true}
            fullWidth={true}
            value={name}
            name="name"
            onChange={this.handleChangeName}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Hosting's name"
            floatingLabelText="Name"
            disabled={hasEditMode}
            data-e2e="hosting-dialog-name-input"
          />
          <TextField
            fullWidth={true}
            value={description}
            name="description"
            onChange={this.handleChangeDescription}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Hosting's description"
            floatingLabelText="Description"
            data-e2e="hosting-dialog-description-input"
            style={hasEditMode && styles.contentSection}
          />
          <Show if={hasEditMode}>
            <Dialog.ContentSection
              title="Default Hosting"
              style={styles.defaultHostingContentSection}
              rootStyles={styles.defaultHostingContentSection}
            >
              <div style={styles.defaultExplanation}>
                <Notification hasCloseButtonVisible={false}>
                  {'Default hosting is available at '}
                  <a
                    href={defaultLink}
                    target="_blank"
                  >
                    {`${defaultLink}.`}
                  </a>
                  <br />
                  {'Each instance can have one default hosting. '}
                  {'Setting this as a default will not affect '}
                  <a
                    href={nameLink}
                    target="_blank"
                  >
                    {`${nameLink}.`}
                  </a>
                </Notification>
              </div>
              <Toggle
                label="Set as default hosting"
                style={styles.toggle}
                toggled={is_default}
                onToggle={this.handleDefaultDomain}
              />
            </Dialog.ContentSection>
          </Show>
          <TextField
            fullWidth={true}
            defaultValue={domains[cnameIndex]}
            value={cname}
            name="Domain"
            onChange={this.handleCNAMEChange}
            floatingLabelText="Custom Domain"
            data-e2e="hosting-dialog-domain-input"
          />
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
          <Show if={this.getValidationMessages('domains').length}>
            <Notification type="error">
              {this.getValidationMessages('domains').join(' ')}
            </Notification>
          </Show>
          <Show if={this.getValidationMessages('detail').length}>
            <Notification type="error">
              {this.getValidationMessages('detail').join(' ')}
            </Notification>
          </Show>
        </div>
      </Dialog.FullPage>
    );
  }
});

export default CreateHostingDialog;
