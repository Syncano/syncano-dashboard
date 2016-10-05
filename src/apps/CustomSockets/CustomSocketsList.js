import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

// Components
import ListItem from './CustomSocketsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsList = React.createClass({

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Custom Socket',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { getCheckedItems, isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeCustomSocketsDialog',
        ref: 'removeCustomSocketsDialog',
        title: 'Delete Custom Sockets',
        handleConfirm: Actions.removeCustomSockets,
        items: getCheckedItems(),
        groupName: 'Custom Sockets',
        isLoading
      }
    }];
  },

  showDeleteDialog() {
    this.showDialog('removeCustomSocketsDialog');
  },

  renderItem(item) {
    const { checkItem } = this.props;

    return (
      <ListItem
        key={`custom-socket-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeCustomSocketsDialog', item)}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick, handleSelectAll, handleUnselectAll, items, getCheckedItems } = this.props;
    const checkedItemsCount = getCheckedItems().length;

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-xs-12"
          primary={true}
          columnName="CHECK_ICON"
          handleClick={handleTitleClick}
        >
          Custom Sockets (BETA)
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-flex-2"
        >
          Description
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-flex-1"
        >
          Documentation
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-flex-1"
        >
          Endpoints
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="MENU">
          <Lists.Menu
            checkedItemsCount={checkedItemsCount}
            handleSelectAll={handleSelectAll}
            handleUnselectAll={handleUnselectAll}
            itemsCount={items.length}
          >
            <Lists.MenuItem onTouchTap={this.showDeleteDialog} />
          </Lists.Menu>
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

    if ((!items || !items.length) && !isLoading) {
      return (
        <EmptyView
          iconClassName="synicon-socket-custom-socket"
          buttonLabel="Add a Custom Socket"
          iconColor={Colors.purple400}
          title="Custom Sockets (BETA)"
          urlLabel="Custom Socket"
          description="Some random text about sockets, has to be replaced."
          docsUrl="http://docs.syncano.io/docs"
          handleClick={Actions.showDialog}
        />
      );
    }

    return (
      <Lists.Container style={style}>
        {this.getDialogs()}
        {this.renderHeader()}
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="custom-sockets-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});

export default CustomSocketsList;
