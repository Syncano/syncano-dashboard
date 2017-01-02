import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

// Components
import { Container, InnerToolbar } from '../../common/';

// Local components
import CustomSocketsList from './CustomSocketsList';
import SocketsDialog from '../SocketsRegistry/SocketsRegistryDialog';

const CustomSockets = React.createClass({

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const { items, hideDialogs, isLoading } = this.state;

    return (
      <div>
        <Helmet title="My Sockets" />
        <SocketsDialog />
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
