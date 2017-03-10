import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';

import SocketsRegistryStore from './SocketsRegistryStore';
import SocketsRegistryActions from './SocketsRegistryActions';
import InstancesActions from '../Instances/InstancesActions';

const SocketsRegistry = React.createClass({
  mixins: [Reflux.connect(SocketsRegistryStore)],

  componentDidMount() {
    SocketsRegistryActions.fetchSocketsRegistry();
    InstancesActions.fetch();
  },

  handleChangeSearchTerm(term) {
    const { value } = term.target;

    this.setState({ term: value });
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


  render() {
    const { children } = this.props;
    const { filter, filterBySyncano, isLoading, items, term } = this.state;

    return (
      <div>
        <Helmet title="Sockets Registry" />
        {children && React.cloneElement(children, {
          filter,
          filterBySyncano,
          handleChangeSearchTerm: this.handleChangeSearchTerm,
          isLoading,
          items,
          term
        })}
      </div>
    );
  }
});

export default SocketsRegistry;
