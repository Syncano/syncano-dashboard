import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointsStore';

// Components
import ListItem from './DataEndpointsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DataEndpointsList',

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Data Endpoint',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { getCheckedItems, isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeDataEndpointDialog',
        ref: 'removeDataEndpointDialog',
        title: 'Delete a Data Endpoint',
        handleConfirm: Actions.removeDataEndpoints,
        items: getCheckedItems(),
        groupName: 'Data Endpoint',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const { checkItem } = this.props;

    return (
      <ListItem
        key={`data-views-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeDataEndpointDialog', item)}
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
          iconClassName="synicon-socket-data"
          buttonLabel="Add Data Endpoint"
          iconColor={Colors.green400}
          title="Data Endpoint"
          urlLabel="Data Endpoint"
          description="Create custom endpoints that return data, the way you want it."
          docsUrl="http://docs.syncano.io/docs/endpoints-data"
          handleClick={Actions.showDialog}
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
          >
            Data Endpoints
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
            Data Class
          </Column.ColumnHeader>
          <Column.ColumnHeader className="col-flex-1">
            Preview
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeDataEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="dataendpoints-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
