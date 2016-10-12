import React from 'react';
import Reflux from 'reflux';
import shortid from 'shortid';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import Store from './HostingStore';
import Actions from './HostingActions';
import SessionStore from '../Session/SessionStore';

import { TextField, Toggle } from 'material-ui';
import { Dialog, Show, Notification } from '../../common';
import HostingDialogDomainTable from './HostingDialogDomainTable';

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
    description: {
      length: {
        maximum: 256
      }
    }
  },

  getHostingParams() {
    const { description, domains = [], id, isDefault, label, newDomain } = this.state;
    let domainsArray = _.map(domains, 'value');

    if (newDomain && newDomain.length) {
      domainsArray.push(newDomain);
    }

    if (!isDefault) {
      domainsArray = _.without(domainsArray, 'default');
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

  handleChangeNewDomain(event, newDomain) {
    this.setState({ newDomain });
    if (newDomain.toLowerCase() === 'default') {
      this.setState({ errors: { feedback: "You can't add 'Default' domain" } });
    } else {
      this.setState({
        errors: {},
        newDomain
      });
    }
  },

  handleAddNewDomain() {
    const { domains, newDomain } = this.state;
    const newDomains = _.unionBy(domains, [{ id: shortid.generate(), value: newDomain }], 'value');

    if (newDomain.toLowerCase() !== 'default') {
      this.setState({
        domains: newDomains,
        newDomain: ''
      });
    }
  },

  handleChangeDomains(domain, index) {
    const { domains } = this.state;

    domains[index].value = domain;
    if (domain.toLowerCase() === 'default') {
      this.setState({
        errors: { feedback: "You can't add 'Default' domain" },
        domains
      });
    } else {
      this.setState({
        errors: {},
        domains
      });
    }
  },

  handleRemoveDomain(domain) {
    const domains = _.reject(this.state.domains, { value: domain });

    this.setState({ domains });
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

  handleChangeDescription(event, value) {
    this.setState({ description: value });
  },

  handleDefaultDomain() {
    let { isDefault } = this.state;

    isDefault = !isDefault;
    this.setState({ isDefault });
  },

  render() {
    const { isDefault, isLoading, open, label, description, canSubmit, newDomain, domains, items } = this.state;
    const title = this.hasEditMode() ? 'Edit Hosting' : 'Add Hosting';
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const defaultLink = `https://${currentInstanceName}.syncano.site`;
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
          <Show if={items.length !== 0}>
            <Toggle
              label="Set as default hosting"
              style={styles.checkBox}
              toggled={isDefault}
              onToggle={this.handleDefaultDomain}
            />
          </Show>
          <Dialog.ContentSection title="Domains">
            <HostingDialogDomainTable
              domains={domains}
              handleChangeNewDomain={this.handleChangeNewDomain}
              handleAddNewDomain={this.handleAddNewDomain}
              handleChangeDomains={this.handleChangeDomains}
              handleRemoveDomain={this.handleRemoveDomain}
              isDefault={isDefault}
              newDomain={newDomain}
            />
          </Dialog.ContentSection>
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
