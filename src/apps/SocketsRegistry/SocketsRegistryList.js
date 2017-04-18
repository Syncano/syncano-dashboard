import React from 'react';
import _ from 'lodash';
import pluralize from 'pluralize';

import SocketsRegistryStore from './SocketsRegistryStore';
import SocketsRegistryActions from './SocketsRegistryActions';

import { ColumnList, Container, Lists, RegistryEmptyView, SearchResultsCountBox, Show } from '../../common/';

import ListItem from './SocketsRegistryListItem';
import SocketsRegistryInnerToolbar from './SocketsRegistryInnerToolbar';
import SocketsSearchBar from './SocketsSearchBar';

const Column = ColumnList.Column;

const SocketsRegistryList = React.createClass({
  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Socket',
      emptyItemHandleClick: SocketsRegistryActions.showDialog,
      getCheckedItems: SocketsRegistryStore.getCheckedItems,
      checkItem: SocketsRegistryActions.checkItem
    };
  },

  getStyles() {
    return {
      container: {
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
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

  renderListHeader() {
    const styles = this.getStyles();
    const { handleTitleClick } = this.props;

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

  renderNotification() {
    const items = this.getFilteredData();
    const count = items.length;

    if (!count) {
      return (
        <SearchResultsCountBox className="vm-3-b">
          No Sockets found. Sorry, please try again with some different keywords.
        </SearchResultsCountBox>
      );
    }

    const pluralizedResultText = pluralize('result', count);

    return (
      <SearchResultsCountBox className="vm-3-b">
        {`Found ${count} ${pluralizedResultText}.`}
      </SearchResultsCountBox>
    );
  },

  renderContent() {
    const items = this.getFilteredData();
    const { isLoading, filter, filterBySyncano, term } = this.props;

    if (!term || isLoading) {
      return (
        <RegistryEmptyView
          title="Supercharge your project with Sockets from the community"
          description={`Think of Sockets Registry as a package manager for Syncano Sockets. You can search for Sockets
            created by community and add them to your projects.`}
          src={require('../../assets/img/socket-assemble.svg')}
          altText="No Socket"
        />
      );
    }

    return (
      <div>
        <SocketsRegistryInnerToolbar
          filter={filter}
          filterBySyncano={filterBySyncano}
        />
        {this.renderNotification()}
        <Show if={items.length}>
          {this.renderListHeader()}
          <Lists.List
            isLoading={isLoading}
            items={items}
            renderItem={this.renderItem}
          />
        </Show>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { term, handleChangeSearchTerm } = this.props;

    return (
      <Lists.Container>
        <SocketsSearchBar
          value={term}
          onInputChange={handleChangeSearchTerm}
        />
        <Container style={styles.container}>
          {this.renderContent()}
        </Container>
      </Lists.Container>
    );
  }
});

export default SocketsRegistryList;
