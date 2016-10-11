import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { DialogMixin, FormMixin } from '../../mixins';

import Actions from './HostingActions';
import Store from './HostingStore';
import SessionStore from '../Session/SessionStore';

import { TextField, Checkbox } from 'material-ui';
import { Dialog, Show, Notification, SelectWrapper } from '../../common';

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

  getStyles() {
    return {
      checkBox: {
        marginTop: 15,
        outline: '#bababa'
      },
      checkBoxLabel: {
        color: '#bababa'
      }
    };
  },

  getHostingParams() {
    const { label, description, domains = [], id } = this.state;
    let domainsArray = domains;

    if (domains && domains.length && _.isObject(domains[0])) {
      domainsArray = _.map(domains, 'value');
    }

    return { label, description, id, domains: domainsArray };
  },

  handleChangeDomain(newValues, domains) {
    this.setState({
      domains: _.uniqBy(domains, 'value')
    });
  },

  handleAddSubmit() {
    const { shouldBeSetAsDefault, items } = this.state;
    const params = this.getHostingParams();

    if (_.isEmpty(items)) {
      params.domains.push('default');
    }

    Actions.createHosting(params, shouldBeSetAsDefault);
  },

  handleEditSubmit() {
    const { shouldBeSetAsDefault } = this.state;
    const params = this.getHostingParams();

    Actions.updateHosting(params.id, params, shouldBeSetAsDefault);
  },

  handleChangeLabel(event, value) {
    this.setState({ label: value });
  },

  handleChangeDescription(event, value) {
    this.setState({ description: value });
  },

  handleDefaultDomainCheck(event, checked) {
    this.setState({ shouldBeSetAsDefault: checked });
  },

  render() {
    const { isLoading, open, label, description, canSubmit, domains, shouldBeSetAsDefault } = this.state;
    const title = this.hasEditMode() ? 'Edit Hosting' : 'Add Hosting';
    const styles = this.getStyles();
    const currentInstance = SessionStore.getInstance();
    const currentInstanceName = currentInstance && currentInstance.name;
    const defaultLink = `https://${currentInstanceName}.syncano.site`;
    const valueWithoutDefault = _.pull(domains, 'default');

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
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
          <Checkbox
            style={styles.checkBox}
            label="Set as default hosting"
            checked={shouldBeSetAsDefault}
            labelStyle={styles.checkBoxLabel}
            onCheck={this.handleDefaultDomainCheck}
          />
          <SelectWrapper
            errorText={this.getValidationMessages('domains').join(' ')}
            className="vm-3-t"
            multi={true}
            value={valueWithoutDefault}
            allowCreate={true}
            placeholder="Domains"
            onChange={this.handleChangeDomain}
            data-e2e="hosting-dialog-domains-input"
          />
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
