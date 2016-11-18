import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import Actions from './CustomSocketsEndpointsActions';
import Store from './CustomSocketsEndpointsStore';

import { Container, InnerToolbar } from '../../common/';
import CustomSocketsEndpointsList from './CustomSocketsEndpointsList';

const CustomSocketsEndpoints = React.createClass({
  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    const { socketName } = this.props.params;

    Actions.setCurrentCustomSocketName(socketName);
    Actions.fetch();
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/custom-sockets/`);
  },

  render() {
    const { isLoading, items } = this.state;
    const { socketName } = this.props.params;

    return (
      <div>
        <Helmet title={`Custom Socket Endpoints: ${socketName}`} />
        <InnerToolbar
          title={`Sockets: ${socketName}`}
          backButton={true}
          backFallback={this.handleBackClick}
          backButtonTooltip="Go back to Custom Sockets List"
        />
        <Container>
          <CustomSocketsEndpointsList
            isLoading={isLoading}
            items={items}
            socketName={socketName}
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(CustomSocketsEndpoints);
