import React from 'react';

import { DialogsMixin } from '../../mixins';

import HostingPublishDialogActions from './HostingPublishDialogActions';
import HostingActions from './HostingActions';
import HostingStore from './HostingStore';

import { ColumnList, Lists, Dialog, EmptyView } from '../../common/';
import { colors as Colors } from 'material-ui/styles';
import ListItem from './HostingListItem';
import HostingPublishDialog from './HostingPublishDialog';

const Column = ColumnList.Column;

const HostingList = React.createClass({
  mixins: [
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      getCheckedItems: HostingStore.getCheckedItems,
      checkItem: HostingActions.checkItem,
      handleSelectAll: HostingActions.selectAll,
      handleUnselectAll: HostingActions.uncheckAll
    };
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeHostingDialog',
        ref: 'removeHostingDialog',
        title: 'Delete a Hosting',
        handleConfirm: HostingActions.removeHostings,
        items: getCheckedItems(),
        groupName: 'Hosting',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const { checkItem } = this.props;

    const showEditDialog = () => {
      HostingActions.showDialog(item);
    };

    const showPublishDialog = () => {
      HostingPublishDialogActions.showDialog(item);
    };

    const showDeleteDialog = () => {
      this.showDialog('removeHostingDialog', item);
    };

    return (
      <ListItem
        key={`hosting-list-item-${item.id}`}
        onIconClick={checkItem}
        item={item}
        showEditDialog={showEditDialog}
        showPublishDialog={showPublishDialog}
        showDeleteDialog={showDeleteDialog}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick, handleSelectAll, handleUnselectAll, items, getCheckedItems } = this.props;

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-sm-12"
          primary={true}
          columnName="CHECK_ICON"
          handleClick={handleTitleClick}
          data-e2e="hosting-list-title"
        >
          Hosting
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-flex-1"
        >
          Description
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-11"
        >
          Website Url
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-3"
        >
          Files
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-3 align-center row"
        >
          Default
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="MENU">
          <Lists.Menu
            checkedItemsCount={getCheckedItems().length}
            handleSelectAll={handleSelectAll}
            handleUnselectAll={handleUnselectAll}
            itemsCount={items.length}
          />
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  render() {
    const {
      items,
      isLoading,
      style,
      ...other
    } = this.props;

    if (!items || !items.length) {
      return (
        <EmptyView
          iconClassName="synicon-socket-hosting"
          iconColor={Colors.orange600}
          title="Hosting"
          urlLabel="Hosting"
          description="Host, deploy and publish your websites using Syncano platform."
          docsUrl="http://docs.syncano.io/docs"
          shouldBeHidden={true}
        />
      );
    }

    return (
      <Lists.Container
        style={style}
        data-e2e="hosting-list-container"
      >
        {this.getDialogs()}
        {this.renderHeader()}
        <HostingPublishDialog />
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="hosting-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});

export default HostingList;
