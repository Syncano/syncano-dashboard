import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';

// Local components
import ApiKeysList from './ApiKeysList';
import ApiKeyDialog from './ApiKeyDialog';

export default React.createClass({
  displayName: 'ApiKeys',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    console.info('ApiKeys::componentWillMount');
    Actions.fetch();
  },

  render() {
    const { items, isLoading, hideDialogs } = this.state;
    const title = 'API Keys';

    return (
      <div>
        <Helmet title={title} />
        <ApiKeyDialog />

        <InnerToolbar title={title}>
          <RaisedButton
            data-e2e="api-keys-add-button"
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </InnerToolbar>

        <Container>
          <ApiKeysList
            items={items}
            isLoading={isLoading}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});
