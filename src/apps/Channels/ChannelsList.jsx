import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import ListItem from './ChannelsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsList',

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      emptyItemContent: 'Create a Real-time Channel Socket',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteChannelDialog',
        ref: 'deleteChannelDialog',
        title: 'Delete a Real-time Channel Socket',
        handleConfirm: Actions.removeChannels,
        items: getCheckedItems(),
        groupName: 'Real-time Channel Socket',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const { checkItem } = this.props;

    return (
      <ListItem
        key={`channels-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteChannelDialog', item)}
      />
    );
  },

  render() {
    const {
      handleTitleClick,
      handleSelectAll,
      handleUnselectAll,
      getCheckedItems,
      items,
      isLoading,
      style,
      ...other
    } = this.props;

    if ((!items || !items.length) && !isLoading) {
      return (
        <EmptyView
          data-e2e="real-time-channels-empty-item"
          iconClassName="synicon-socket-channel"
          iconColor={Colors.blue500}
          title="Real-time Channel"
          urlLabel="Real-time Channel"
          description="Create Channel which is a way of providing realtime communication functionality."
          docsUrl="http://docs.syncano.io/docs/realtime-communication"
          handleClick={Actions.showDialog}
          buttonLabel="Add Real-time Channel"
        />
      );
    }

    return (
      <Lists.Container style={style}>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}
            data-e2e="real-time-channels-list-title"
          >
            Real-time Channels
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Type
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            History
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Custom publish
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteChannelDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="channels-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
