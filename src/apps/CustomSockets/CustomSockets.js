import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

import { Container, InnerToolbar } from '../../common/';
import CustomSocketsList from './CustomSocketsList';

const CustomSockets = React.createClass({

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const { items, hideDialogs, isLoading } = this.state;

    return (
      <div>
        <Helmet title="My Sockets" />
        <InnerToolbar title="My Sockets" />
        <Container>
          <CustomSocketsList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});

export default CustomSockets;
