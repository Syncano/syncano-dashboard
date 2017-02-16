import React from 'react';
import Reflux from 'reflux';
import pluralize from 'pluralize';
import _ from 'lodash';

import { FormMixin } from '../../mixins';

import { FontIcon, TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import Dialog from './FullPageDialog';
import StandardButtons from './DialogStandardButtons';

export default React.createClass({
  displayName: 'DeleteDialog',

  mixins: [
    Reflux.ListenerMixin,
    FormMixin
  ],

  validatorConstraints() {
    const { itemLabelName, groupName, withConfirm } = this.props;

    if (withConfirm) {
      const items = this.getItems();
      const confirmText = items.length ? items[0][itemLabelName] : '';

      return {
        validationText: {
          presence: {
            message: `^Type ${groupName} name to continue`
          },
          inclusion: {
            within: [confirmText],
            message: `^Incorrect ${groupName} name`
          }
        }
      };
    }

    return null;
  },

  getDefaultProps() {
    return {
      withConfirm: false,
      actionName: 'delete',
      itemLabelName: 'name',
      isLoading: false,
      icon: 'synicon-delete'
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  getItems() {
    let items = this.state.items ? this.state.items : this.props.items;

    if (!_.isArray(items)) {
      items = [items];
    }

    return items;
  },

  getItemAssociation(item, associationFor) {
    const hasTriggerAssociation = _.has(item, 'triggers') && (_.isArray(item.triggers) && item.triggers.length);
    const hasScheduleAssociation = _.has(item, 'schedules') && (_.isArray(item.schedules) && item.schedules.length);
    const isAssociated = hasTriggerAssociation || hasScheduleAssociation;

    if (isAssociated && associationFor === 'triggers') {
      return _.isArray(item.triggers) ? ` (${item.triggers.join(', ')})` : '';
    }

    if (isAssociated && associationFor === 'schedules') {
      return _.isArray(item.schedules) ? ` (${item.schedules.join(', ')})` : '';
    }

    return '';
  },

  getDialogList(items, paramName, associationFor) {
    const listItems = items.map((item) => {
      const association = this.getItemAssociation(item, associationFor);

      if (_.isFinite(item)) {
        return <li key={item}>ID: {item}</li>;
      }

      if (!_.isObject(item)) {
        return null;
      }

      return (
        <li key={item[paramName || 'name']}>
          {item[paramName || 'name'] + association}
        </li>
      );
    });

    return <ul>{listItems}</ul>;
  },

  handleSuccessfullValidation() {
    const { handleConfirm, handleConfirmParam } = this.props;

    handleConfirm(this.getItems(), handleConfirmParam);
    if (_.isFunction(handleConfirm.completed)) {
      this.listenTo(handleConfirm.completed, () => {
        this.dismiss();
        this.stopListeningTo(handleConfirm.completed);
      });
    }
  },

  dismiss() {
    this.setState({ open: false });
  },

  show(items) {
    this.setState({ open: true, items });
  },

  renderConfirmContent() {
    const { validationText } = this.state;
    const { itemLabelName, groupName, actionName } = this.props;
    const listItems = this.getItems();
    const itemsCount = listItems.length;
    const pluralizedGroup = pluralize(groupName, itemsCount);
    const confirmDescription = `To confirm ${actionName} type ${pluralizedGroup} name.`;

    return (
      <div style={{ lineHeight: '1.4' }}>
        <div className="vm-1-t">
          <div className="vm-1-b">
            <strong>This action cannot be undone or stopped.</strong>
          </div>
          <div className="vm-1-b">
            All current data for {pluralizedGroup} <strong>will be lost.</strong>
          </div>
          <div>
            This will permanently {actionName} {pluralizedGroup}:
            {this.getDialogList(listItems, itemLabelName)}
          </div>
          <div className="vm-4-t">
            {confirmDescription}
          </div>
          <TextField
            className="confirmation-text-field"
            value={validationText}
            onChange={(event, value) => this.setState({ validationText: value })}
            errorText={this.getValidationMessages('validationText').join(' ')}
            fullWidth={true}
            floatingLabelText="Instance name"
            hintText="Instance name"
          />
        </div>
      </div>
    );
  },

  renderContent() {
    const { actionName, groupName, itemLabelName, withConfirm } = this.props;
    const listItems = this.getItems();
    const itemsCount = listItems.length;

    if (withConfirm) {
      return this.renderConfirmContent();
    }

    return (
      <div>
        {`Do you really want to ${actionName} ${itemsCount} ${pluralize(groupName, itemsCount)}?`}
        {this.getDialogList(listItems, itemLabelName)}
      </div>
    );
  },

  render() {
    const { children, withConfirm, icon, iconColor, groupName, ...other } = this.props;
    const { open } = this.state;
    const customizeColor = iconColor || Colors.grey500;

    return (
      <Dialog
        onRequestClose={this.dismiss}
        contentSize="small"
        open={open}
        modal={true}
        actions={
          <StandardButtons
            data-e2e-submit={`${_.kebabCase(groupName)}-delete-dialog-confirm`}
            data-e2e-cancel={`${_.kebabCase(groupName)}-delete-dialog-cancel`}
            handleCancel={this.dismiss}
            handleConfirm={this.handleFormValidation}
          />
        }
        {...other}
      >
        <div className="row">
          <FontIcon
            className={`${withConfirm ? 'synicon-alert' : icon} col-sm-7 vm-2-t`}
            style={{ fontSize: 60, color: withConfirm ? Colors.orange400 : customizeColor }}
          />
          <div
            className="vm-1-t col-sm-28"
            style={{ lineHeight: 1.6 }}
          >
            {children || this.renderContent()}
          </div>
        </div>
      </Dialog>
    );
  }
});
