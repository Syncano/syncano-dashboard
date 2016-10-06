import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './CustomSocketsActions';
import Store from './CustomSocketsStore';

// Components
import { RaisedButton } from 'material-ui';
import { Container } from '../../common/';

// Local components
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';
import CustomSocketsList from './CustomSocketsList';
import CustomSocketsDialog from '../CustomSocketsRegistry/CustomSocketsRegistryDialog';

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
        <Helmet title="Custom Sockets" />

        <CustomSocketsDialog />
        <SocketsInnerToolbar>
          <RaisedButton
            data-e2e="custom-sockets-toolbar-add-button"
            style={{ marginRight: 0 }}
            label="Add"
            primary={true}
            onTouchTap={Actions.showDialog}
          />
        </SocketsInnerToolbar>
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
