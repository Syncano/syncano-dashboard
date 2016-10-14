import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import Store from './HostingStore';
import Actions from './HostingActions';
import SessionStore from '../Session/SessionStore';

import { TextField, Toggle } from 'material-ui';
import { Dialog, Show, Notification } from '../../common';
// import HostingDialogDomainTable from './HostingDialogDomainTable';

const CreateHostingDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        maximum: 64
      }
    },
    cname: {
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
    const { description, domains = [], id, isDefault, label, cname, newCname } = this.state;
    let domainsArray = _.map(domains, 'value');

    domainsArray = _.without(domainsArray, 'default');
    if (_.includes(domainsArray, cname)) {
      domainsArray = _.map(domainsArray, (domain) => domain === cname && (newCname || cname));
    } else {
      domainsArray.push(newCname);
    }

    return { label, description, id, isDefault, domains: domainsArray };
  },

  getStyles() {
    return {
      checkBox: {
        margin: '20px 0',
        maxWidth: 250
      }
    };
  },

  handleAddSubmit() {
    const { items } = this.state;
    const params = this.getHostingParams();

    if (_.isEmpty(items)) {
      params.isDefault = true;
    }

    Actions.createHosting(params);
  },

  handleEditSubmit() {
    const params = this.getHostingParams();

    Actions.updateHosting(params.id, params);
  },

  handleChangeLabel(event, value) {
    this.setState({ label: value });
  },

  handleChangeCName(event, value) {
    this.setState({ newCname: value });
  },

  handleChangeDescription(event, value) {
    this.setState({ description: value });
  },

  handleDefaultDomain() {
    let { isDefault } = this.state;

    isDefault = !isDefault;
    this.setState({ isDefault });
  },

  render() {
    const { isDefault, isLoading, open, label, description, canSubmit, cname, newCname } = this.state;
    const title = this.hasEditMode() ? 'Edit Hosting' : 'Add Hosting';
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const defaultLink = `https://${currentInstanceName}.syncano.site`;
    const styles = this.getStyles();
    const cnameValue = newCname || cname;

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
            <Dialog.SidebarSection title="Default hosting">
              You can also check <em>Set as default hosting</em> then it will be connected directly to your current
              Instance and avaliable at {defaultLink}
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
            value={label}
            name="label"
            onChange={this.handleChangeLabel}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText="Hosting's label"
            floatingLabelText="Label"
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
          />
          <Toggle
            label="Set as default hosting"
            style={styles.checkBox}
            toggled={isDefault}
            onToggle={this.handleDefaultDomain}
          />
          <TextField
            autoFocus={true}
            fullWidth={true}
            value={cnameValue}
            name="CNAME"
            onChange={this.handleChangeCName}
            errorText={this.getValidationMessages('cname').join(' ')}
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
