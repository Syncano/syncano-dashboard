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
    const { customSocketName } = this.props.params;

    Actions.setCurrentCustomSocketName(customSocketName);
    Actions.fetch();
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/custom-sockets/`);
  },

  render() {
    const { isLoading, items } = this.state;
    const { customSocketName } = this.props.params;

    return (
      <div>
        <Helmet title={`Socket Endpoints: ${customSocketName}`} />
        <InnerToolbar
          title={`Sockets: ${customSocketName}`}
          backButton={true}
          forceBackFallback={true}
          backFallback={this.handleBackClick}
          backButtonTooltip="Go back to Sockets List"
        />
        <Container>
          <CustomSocketsEndpointsList
            isLoading={isLoading}
            items={items}
            socketName={customSocketName}
          />
        </Container>
      </div>
    );
  }
});

export default withRouter(CustomSocketsEndpoints);
