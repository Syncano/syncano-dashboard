import React from 'react';

import { DialogsMixin } from '../../mixins';

import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

import ListItem from './CustomSocketsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsList = React.createClass({

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Socket',
      getCheckedItems: Store.getCheckedItems
    };
  },

  getInitialState() {
    return {
      deletedItem: {}
    };
  },

  componentWillUpdate(nextProps) {
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { getCheckedItems, isLoading } = this.props;
    const { deletedItem: { name } } = this.state;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeCustomSocketsDialog',
        ref: 'removeCustomSocketsDialog',
        title: `Remove ${name}`,
        handleConfirm: Actions.removeCustomSockets,
        items: getCheckedItems(),
        itemName: name,
        description: "and all of it's endpoints.",
        withConfirm: true,
        groupName: 'sockets',
        isLoading
      }
    }];
  },


  renderItem(item) {
    const showDeleteDialog = () => {
      this.setState({ deletedItem: item });
      this.showDialog('removeCustomSocketsDialog', item);
    };

    return (
      <ListItem
        key={`custom-socket-list-item-${item.name}`}
        item={item}
        showDeleteDialog={showDeleteDialog}
      />
    );
  },

  renderHeader() {
    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-xs-12"
          primary={true}
          columnName="CHECK_ICON"
        >
          Sockets (BETA)
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
          buttonLabel="Add a Socket"
          iconColor={Colors.purple400}
          title="Sockets (BETA)"
          urlLabel="Socket"
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
