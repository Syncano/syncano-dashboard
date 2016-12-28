import React from 'react';
import pluralize from 'pluralize';
import _ from 'lodash';

import SocketsRegistryActions from './SocketsRegistryActions';

import { ColumnList, Lists, Container, RegistryEmptyView } from '../../common/';
import ListItem from './SocketsRegistryListItem';

const Column = ColumnList.Column;

const SocketsRegistryList = React.createClass({
  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Socket',
      emptyItemHandleClick: SocketsRegistryActions.showDialog
    };
  },

  getStyles() {
    return {
      container: {
        margin: '0 200px'
      },
      ammount: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: '1em'
      },
      noResultsState: {
        fontSize: 28,
        textAlign: 'center',
        width: '100%'
      },
      noResultsTitle: {
        fontSize: 40,
        lineHeight: '30px',
        marginTop: 20
      },
      noResultsText: {
        marginTop: 30,
        fontStyle: 'italic'
      },
      foundSocketsCount: {
        fontWeight: 500
      },
      detailsColumnHeader: {
        padding: '0 32px'
      }
    };
  },

  getFilteredData() {
    const { items, filter } = this.props;
    const filteredByAuthor = filter === 'all' ? items : _.filter(items, { by_syncano: filter });
    const filterResult = this.filterByType(filteredByAuthor);

    return filterResult;
  },

  filterByType(items) {
    const { term, filterBySyncano } = this.props;
    const searchTerm = term && term.toLowerCase();

    if (filterBySyncano === 'all') {
      const filterByType = _.filter(items, (item) => {
        const isName = _.includes(item.author.toLowerCase(), searchTerm);
        const isAuthor = _.includes(item.description.toLowerCase(), searchTerm);
        const isDescription = _.includes(item.name.toLowerCase(), searchTerm);

        return isName || isAuthor || isDescription;
      });

      return filterByType;
    }
    const filterByType = _.filter(items, (item) => _.includes(item[filterBySyncano].toLowerCase(), searchTerm));

    return filterByType;
  },

  renderItem(item) {
    const showDeleteDialog = () => this.showDialog('removeSocketsDialog', item);

    return (
      <ListItem
        key={`sockets-registry-list-item-${item.name}`}
        item={item}
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
          columnName="AUTHOR"
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
          columnName="DETAILS"
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
      changeListView
    } = this.props;
    const items = this.getFilteredData();
    const styles = this.getStyles();
    const socketImageDir = '/img/socket-assemble.svg';
    const pluralizedResults = pluralize('result', items.length);
    const containsItems = (!items || !items.length) && !isLoading;

    if (containsItems && changeListView) {
      return (
        <div style={styles.noResultsState}>
          <div style={styles.noResultsTitle}>
            No Sockets found
          </div>
          <div style={styles.noResultsText}>
            {`Sorry, but nothing matched your search criteria.
            Please try again with some different keywords.`}
          </div>
        </div>
      );
    }
    if (containsItems && !changeListView) {
      return (
        <RegistryEmptyView
          title="Supercharge your project with Sockets from the community"
          description={`Think of Sockets Registry a package manager for Syncano Sockets. You can search for
            Sockets created by community and add them to your projects.`}
          src={socketImageDir}
          altText="No Socket"
        />
      );
    }

    return (
      <Lists.Container>
        <div style={styles.ammount}>
          Found
          <span style={styles.foundSocketsCount}>
            {` ${items.length} `}
          </span>
          {pluralizedResults}
        </div>
        <Container style={styles.container}>
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

export default SocketsRegistryList;
