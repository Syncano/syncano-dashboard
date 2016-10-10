import React from 'react';
import Reflux from 'reflux';
import shortid from 'shortid';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import Actions from './HostingActions';
import Store from './HostingStore';

import { TextField } from 'material-ui';
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
    const { description, domains, id, label, newDomain } = this.state;
    let domainsArray = domains;

    if (domains && domains.length && _.isObject(domains[0])) {
      domainsArray = _.map(domains, 'value');
    }

    if (newDomain && newDomain.value.length) {
      domainsArray.push(newDomain);
    }

    return { label, description, id, domains: domainsArray };
  },

  handleChangeNewDomain(event, domain) {
    this.setState({ newDomain: domain });
  },

  handleAddNewDomain() {
    const { domains, newDomain } = this.state;
    const newDomains = _.union(domains, [{ id: shortid.generate(), value: newDomain }]);

    this.setState({
      domains: newDomains,
      newDomain: ''
    });
  },

  handleChangeDomains(domain, index) {
    const { domains } = this.state;

    domains[index].value = domain;
    this.setState({ domains });
  },

  handleRemoveDomain(domain) {
    const domains = _.reject(this.state.domains, { value: domain });

    this.setState({ domains });
  },

  handleAddSubmit() {
    const params = this.getHostingParams();

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

  render() {
    const { isLoading, open, label, description, canSubmit, newDomain, domains } = this.state;
    const title = this.hasEditMode() ? 'Edit Hosting' : 'Add Hosting';

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
              Hosting allows you to manage, deploy and publish websites using Syncano platform.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/v1.1/docs/">
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
          <HostingDialogDomainTable
            domains={domains}
            newDomain={newDomain}
            handleChangeNewDomain={this.handleChangeNewDomain}
            handleAddNewDomain={this.handleAddNewDomain}
            handleChangeDomains={this.handleChangeDomains}
            handleRemoveDomain={this.handleRemoveDomain}
          />
          <Show if={this.getValidationMessages('domains').length}>
            <Notification
              className="vm-2-t"
              type="error"
            >
              {this.getValidationMessages('domains').join(' ')}
            </Notification>
          </Show>
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
        <div className="vm-2-b">
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
