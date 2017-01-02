import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Stores and Actions
import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

// Components
import { Container, InnerToolbar } from '../../common/';

// Local components
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
        <Helmet title="Installed Sockets" />
        <InnerToolbar title="Installed Sockets" />
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
