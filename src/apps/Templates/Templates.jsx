import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Stores and Actions
import Actions from './TemplatesActions';
import Store from './TemplatesStore';

// Components
import { RaisedButton } from 'material-ui';
import { Container } from '../../common/';
import SnippetsInnerToolbar from '../Snippets/SnippetsInnerToolbar';

// Local components
import TemplatesList from './TemplatesList';
import TemplateDialog from './TemplateDialog';

export default React.createClass({
  displayName: 'Templates',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    console.info('Templates::componentDidMount');
    Actions.fetch();
  },

  render() {
    const { items, isLoading, hideDialogs } = this.state;

    return (
      <div>
        <Helmet title="Templates" />
        <TemplateDialog />

        <SnippetsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </SnippetsInnerToolbar>

        <Container>
          <TemplatesList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});
