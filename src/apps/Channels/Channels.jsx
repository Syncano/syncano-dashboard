import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import { RaisedButton } from 'material-ui';
import { Container } from '../../common/';

// Local components
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';
import ChannelsList from './ChannelsList';
import ChannelDialog from './ChannelDialog';
import SendChannelMessageDialog from './SendChannelMessageDialog';

export default React.createClass({
  displayName: 'Channels',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Channels::componentDidMount');
    Actions.fetch();
  },

  render() {
    const { isLoading, items, hideDialogs } = this.state;

    return (
      <div>
        <Helmet title="Channels" />
        <ChannelDialog />
        <SendChannelMessageDialog />

        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </SocketsInnerToolbar>

        <Container>
          <ChannelsList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});
