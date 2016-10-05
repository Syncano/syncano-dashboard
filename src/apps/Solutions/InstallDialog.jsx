import React from 'react' ;
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogMixin, FormMixin } from '../../mixins';

// Stores and Actions
import InstanceDialogStore from '../Instances/InstanceDialogStore';
import Store from './InstallDialogStore';
import Actions from './InstallDialogActions';

// Components
import { TextField } from 'material-ui' ;
import { Loading, SelectFieldWrapper, Show, Notification, Dialog } from '../../common/';

export default React.createClass({
  displayName: 'SolutionInstallDialog',

  mixins: [
    DialogMixin,
    FormMixin,
    Reflux.connect(Store)
  ],

  validatorConstraints: {
    instance: {
      presence: true
    },
    version: {
      presence: true
    }
  },

  handleEditSubmit() {
    console.debug('SolutionInstallDialog::handleEditSubmit');
  },

  handleAddSubmit() {
    const { instance, instances, solutionId, version } = this.state;
    let instanceName = null;

    if (instance) {
      instanceName = instance;
    } else if (instances.length === 1) {
      instanceName = instances[0].name;
    }
    if (!instanceName) {
      instanceName = InstanceDialogStore.genUniqueName();

      Actions.createInstance({ name: instanceName }).then(() => {
        Actions.installSolution({
          versionId: version,
          solutionId,
          instanceName
        });
      });
    } else {
      Actions.installSolution({
        versionId: version,
        solutionId,
        instanceName
      });
    }
  },

  renderCustomFormNotifications() {
    const { errors } = this.state;
    const nonFormFields = ['classes'];
    let messages = [];

    _.map(errors, (value, fieldName) => {
      if (nonFormFields.indexOf(fieldName) > -1) {
        _.forEach(value, (error) => {
          messages = _.map(error, (errorText) => errorText);
        });
      }
    });

    if (messages.length > 0) {
      return <Notification type="error">{messages.join(' ')}</Notification>;
    }

    return null;
  },

  renderInstanceField() {
    const { instances, instance } = this.state;

    if (!instances) {
      return <Loading />;
    }

    if (_.isArray(instances) && instances.length < 2) {
      return (
        <TextField
          ref="instance"
          name="instance"
          fullWidth={true}
          disabled={true}
          value={instance}
          onChange={(event, value) => this.setState({ instance: value })}
          errorText={this.getValidationMessages('instance').join(' ')}
          floatingLabelText="Instance Name"
        />
      );
    }

    return (
      <SelectFieldWrapper
        name="instance"
        options={Store.getInstancesDropdown()}
        value={instance}
        floatingLabelText="Instances"
        onChange={(event, index, value) => this.setSelectFieldValue('instance', value)}
        errorText={this.getValidationMessages('instance').join(' ')}
      />
    );
  },

  render() {
    const title = 'Install a Solution';
    const { open, hideVersionPicker, version } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={title}
        contentSize="medium"
        onRequestClose={this.handleCancel}
        open={open}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
      >
        <div>
          {this.renderFormNotifications()}
          {this.renderCustomFormNotifications()}

          <div className="row">
            <div className="col-flex-1">
              {this.renderInstanceField()}
            </div>
          </div>

          <Show if={!hideVersionPicker}>
            <SelectFieldWrapper
              name="version"
              options={Store.getVersionsDropdown()}
              value={version}
              onChange={(event, index, value) => this.setSelectFieldValue('version', value)}
              errorText={this.getValidationMessages('version').join(' ')}
            />
          </Show>
        </div>
      </Dialog.FullPage>
    );
  }
});
