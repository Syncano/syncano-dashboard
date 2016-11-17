import React from 'react';
import pluralize from 'pluralize';

import Actions from './SocketsActions';

import { ColumnList, Lists, Container } from '../../common/';
import ListItem from './SocketsListItem';

const Column = ColumnList.Column;

const SocketsList = React.createClass({

  getDefaultProps() {
    return {
      checkItem: Actions.checkItem
    };
  },

  getStyles() {
    return {
      ammount: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: '1em'
      },
      foundSocketsCount: {
        fontWeight: 500
      },
      detailsColumnHeader: {
        padding: '0 32px'
      }
    };
  },

  renderItem(item) {
    const { checkItem } = this.props;
    const showDeleteDialog = () => this.showDialog('removeCustomSocketsDialog', item);

    return (
      <ListItem
        key={`custom-sockets-registry-list-item-${item.name}`}
        item={item}
        onIconClick={checkItem}
        showDeleteDialog={showDeleteDialog}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick } = this.props;
    const styles = this.getStyles();

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-sm-10"
          primary={true}
          columnName="CHECK_ICON"
          handleClick={handleTitleClick}
        >
          Sockets
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          registry={true}
          className="col-sm-5"
        >
          Author
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          registry={true}
          className="col-flex-2"
        >
          Description
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-sm-7"
          registry={true}
          styles={styles.detailsColumnHeader}
        >
          Details
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  render() {
    const {
      isLoading,
      items
    } = this.props;
    const styles = this.getStyles();
    const pluralizedResults = pluralize('result', items.length);

    return (
      <Lists.Container>
        <div style={styles.ammount}>
          Found
          <span style={styles.foundSocketsCount}>
            {` ${items.length} `}
          </span>
          {pluralizedResults}
        </div>
        <Container>
          {this.renderHeader()}
          <Lists.List
            isLoading={isLoading}
            items={items}
            renderItem={this.renderItem}
          />
        </Container>
      </Lists.Container>
    );
  }
});

export default SocketsList;
