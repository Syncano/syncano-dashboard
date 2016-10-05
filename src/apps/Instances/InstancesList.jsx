import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';

import ListItem from './InstancesListItem';
import { Loading, ColumnList, Dialog, Lists } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'InstancesList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteInstanceDialog',
        ref: 'deleteInstanceDialog',
        title: 'Delete an Instance',
        items: Store.getCheckedItems('myInstances'),
        handleConfirm: Actions.removeInstances,
        groupName: 'Instance',
        withConfirm: true,
        isLoading
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`instances-list-item-${item.name}`}
        checkable={false}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteInstanceDialog', item)}
      />
    );
  },

  render() {
    const { name, isLoading } = this.props;

    return (
      <Loading show={isLoading}>
        <Lists.Container className="instances-list">
          {this.getDialogs()}
          <ColumnList.Header>
            <Column.ColumnHeader
              primary={true}
              columnName="CHECK_ICON"
            >
              {name}
            </Column.ColumnHeader>
            <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
            <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
            <Column.ColumnHeader columnName="MENU" />
          </ColumnList.Header>
          <Lists.List
            {...this.props}
            key="instances-list"
            renderItem={this.renderItem}
          />
        </Lists.Container>
      </Loading>
    );
  }
});
