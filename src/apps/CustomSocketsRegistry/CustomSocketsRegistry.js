import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Actions from './CustomSocketsRegistryActions';
import Store from './CustomSocketsRegistryStore';

import { Container, Show } from '../../common/';

import SocketsRegistryInnerToolbar from './SocketsRegistryInnerToolbar';
import SocketsSearchBar from './SocketsSearchBar';
import CustomSocketsRegistryList from './CustomSocketsRegistryList';

const CustomSocketsRegistry = React.createClass({

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('CustomSocketsRegistry::componentDidMount');
    Actions.fetchCustomSocketsRegistry();
  },

  handleChangeSearchTerm(term) {
    this.setState({ term: term.target.value, changeListView: true });
  },

  handleStartFilter() {
    const { searchClicked } = this.state;

    if (!searchClicked) {
      this.setState({ filter: 'all', searchClicked: true });
    }
  },

  filteredData() {
    const { items, filter } = this.state;
    const filteredByAuthor = filter === 'all' ? items : _.filter(items, { by_syncano: filter });
    const filterResult = this.filterByType(filteredByAuthor);

    return filterResult;
  },

  filterByType(items) {
    const { term, filterBySyncano } = this.state;
    const searchTerm = term && term.toLowerCase();

    if (filterBySyncano === 'all') {
      const filterByType = _.filter(items, item => {
        const isName = _.includes(item.author.toLowerCase(), searchTerm);
        const isAuthor = _.includes(item.description.toLowerCase(), searchTerm);
        const isDescription = _.includes(item.name.toLowerCase(), searchTerm);

        return isName || isAuthor || isDescription;
      });

      return filterByType;
    }
    const filterByType = _.filter(items, item => _.includes(item[filterBySyncano].toLowerCase(), searchTerm));

    return filterByType;
  },

  render() {
    const { isLoading, items, term, changeListView, searchClicked } = this.state;
    const filteredData = this.filteredData();

    return (
      <div>
        <Helmet title="Custom Sockets Registry" />
        <SocketsSearchBar
          items={items}
          onClick={this.handleStartFilter}
          handleChangeSearchTerm={this.handleChangeSearchTerm}
          value={term}
        />
        <Show if={searchClicked}>
          <SocketsRegistryInnerToolbar />
        </Show>
        <Container>
          <CustomSocketsRegistryList
            changeListView={changeListView}
            isLoading={isLoading}
            items={filteredData}
            onIconClick={Actions.checkItem}
          />
        </Container>
      </div>
    );
  }
});

export default CustomSocketsRegistry;
