import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import HostingStore from './HostingStore';
import HostingActions from './HostingActions';

import { Container, Loading } from '../../common';
import { RaisedButton } from 'material-ui';
import HostingList from './HostingList';
import HostingDialog from './HostingDialog';
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';

const Hosting = React.createClass({
  mixins: [
    Reflux.connect(HostingStore)
  ],

  componentDidMount() {
    HostingActions.fetch();
  },

  render() {
    const { isLoading, items, hideDialogs } = this.state;

    return (
      <div>
        <Helmet title="Hosting" />
        <HostingDialog />

        <SocketsInnerToolbar title="Hosting">
          <RaisedButton
            label="Add"
            style={{ marginRight: 0 }}
            primary={true}
            onTouchTap={HostingActions.showDialog}
            data-e2e="add-hosting-button"
          />
        </SocketsInnerToolbar>

        <Container>
          <Loading show={isLoading}>
            <HostingList
              items={items}
              hideDialogs={hideDialogs}
            />
          </Loading>
        </Container>
      </div>
    );
  }
});

export default Hosting;
