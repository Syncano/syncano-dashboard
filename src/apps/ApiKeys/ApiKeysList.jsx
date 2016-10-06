import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import ListItem from './ApiKeysListItem';
import { ColumnList, Dialog, Lists } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ApiKeysList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('ApiKeysList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'resetApiKeyDialog',
          ref: 'resetApiKeyDialog',
          title: 'Reset an API Key',
          handleConfirm: Actions.resetApiKey,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          itemLabelName: 'api_key',
          actionName: 'reset',
          groupName: 'API Key',
          icon: 'synicon-refresh'
        }
      },
      {
        dialog: Dialog.Delete,
        params: {
          key: 'deleteApiKeyDialog',
          ref: 'deleteApiKeyDialog',
          title: 'Delete an API key',
          handleConfirm: Actions.removeApiKeys,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          itemLabelName: 'api_key',
          groupName: 'API Key'
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`apikeys-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteApiKeyDialog', item)}
        showResetDialog={() => this.showDialog('resetApiKeyDialog', item)}
      />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="api-keys-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            columnName="CHECK_ICON"
            primary={true}
          >
            API Keys
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="ID"
            className="col-flex-1"
          >
            ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="TEXT"
            className="col-flex-1"
          >
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
            >
              <Lists.MenuItem
                primaryText="Reset All"
                onTouchTap={() => this.showDialog('resetApiKeyDialog')}
              />
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteApiKeyDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add an API Key"
          emptyItemHandleClick={Actions.showDialog}
          key="apikeys-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
