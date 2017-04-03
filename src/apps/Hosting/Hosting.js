import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import HostingStore from './HostingStore';
import HostingActions from './HostingActions';

import { Container, InnerToolbar, Loading } from '../../common';
import HostingList from './HostingList';

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
        <InnerToolbar title="Hosting" />

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
