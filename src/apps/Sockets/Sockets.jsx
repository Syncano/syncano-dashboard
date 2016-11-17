import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Actions from './SocketsActions';
import Store from './SocketsStore';

import { InnerToolbar } from '../../common/';
import SocketsList from './SocketsList';

const Sockets = React.createClass({
  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetchSockets();
  },

  render() {
    const { items, isLoading } = this.state;

    return (
      <div>
        <Helmet title="Sockets Registry" />
        <InnerToolbar title="Sockets" />
        <SocketsList
          items={items}
          isLoading={isLoading}
        />
      </div>
    );
  }
});

export default Sockets;
