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
    label: {
      presence: true,
      format: {
        pattern: '[a-z]+',
        message: 'can only contain a-z'
      },
      length: {
        maximum: 64
      }
    },
    description: {
      length: {
        maximum: 256
      }
    }
  },

  getHostingParams() {
    const { description, domains = [], id, isDefault, label } = this.state;

    return { label, description, id, isDefault, domains };
  },

  getStyles() {
    return {
      contentSection: {
        margin: '0 0 20px'
      },
      toggle: {
        maxWidth: 400,
        margin: '10px 0'
      },
      labelStyle: {
        lineHeight: 1.4,
        color: 'rgba(68, 68, 68, .8)'
      },
      defaultExplanation: {
        margin: '30px 0 10px'
      }
    };
  },

  handleAddSubmit() {
    const { description, domains = [], isDefault, label, cname } = this.state;
    const hostingCount = HostingStore.data.items.length;
    const params = { description, domains, isDefault, label };

    params.domains.push(label);
    cname && params.domains.push(cname);

    if (!hostingCount) {
      params.isDefault = true;
    }

    HostingActions.createHosting(params);
  },

  handleEditSubmit() {
    const { cname, cnameIndex } = this.state;
    const params = this.getHostingParams();
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

  handleChangeLabel(event, value) {
    this.setState({ label: value });
  },

  handleChangeCName(event, value) {
    this.setState({ cname: value });
  },

  handleChangeDescription(event, value) {
    this.setState({ description: value });
  },

  handleDefaultDomain() {
    const { isDefault } = this.state;

    this.setState({ isDefault: !isDefault });
  },

  render() {
    const { isDefault, isLoading, open, label, description, canSubmit, domains = [], cname, cnameIndex } = this.state;
    const title = this.hasEditMode() ? 'Edit Hosting' : 'Add Hosting';
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const defaultLink = `https://${currentInstanceName}.syncano.site`;
    const labelLink = `https://${currentInstanceName}--${label}.syncano.site`;
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
            <Dialog.SidebarSection title="Hosting label">
              Name of the hosting in Syncano Dashboard.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Domains">
              You can define different domains and use it for staging/production flow or simply to
              compare various versions of your web application.
              The domains will be linked to your hosting at
              https://{currentInstanceName}--<em>domain</em>.syncano.site
            </Dialog.SidebarSection>
            <Show if={this.hasEditMode()}>
              <Dialog.SidebarSection title="Default hosting">
                You can also toogle on <em>Default hosting </em> then it will be connected directly to your current
                Instance and avaliable at {defaultLink}
              </Dialog.SidebarSection>
            </Show>
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
            value={label}
            name="label"
            onChange={this.handleChangeLabel}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Hosting's label"
            floatingLabelText="Label"
            disabled={this.hasEditMode()}
            data-e2e="hosting-dialog-label-input"
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
            style={styles.contentSection}
          />
          <Show if={this.hasEditMode()}>
            <Dialog.ContentSection
              title="Default Hosting"
              style={styles.contentSection}
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
                    href={labelLink}
                    target="_blank"
                  >
                    {`${labelLink}.`}
                  </a>
                </Notification>
              </div>
              <Toggle
                label="Set as default hosting"
                style={styles.toggle}
                toggled={isDefault}
                onToggle={this.handleDefaultDomain}
              />
            </Dialog.ContentSection>
          </Show>
          <TextField
            fullWidth={true}
            defaultValue={domains[cnameIndex]}
            value={cname}
            name="CNAME"
            onChange={this.handleChangeCName}
            hintText="Hosting's CNAME"
            floatingLabelText="CNAME"
            data-e2e="hosting-dialog-cname-input"
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
