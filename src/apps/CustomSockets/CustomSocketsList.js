import React from 'react';

import ListItem from './CustomSocketsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsList = React.createClass({
  renderItem(item) {
    return (
      <ListItem
        key={`custom-socket-list-item-${item.name}`}
        item={item}
      />
    );
  },

  renderHeader() {
    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-flex-1"
          primary={true}
          columnName="CHECK_ICON"
        >
          Socket Name
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-flex-3"
        >
          Description
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-xs-4"
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
          iconColor={Colors.purple400}
          title="Syncano Sockets"
          urlLabel="Syncano Sockets"
          description="Use Syncano CLI to install a Socket from library"
          docsUrl="http://docs.syncano.io/docs"
        />
      );
    }

    return (
      <Lists.Container style={style}>
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
