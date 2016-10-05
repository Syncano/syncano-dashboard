import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import { RaisedButton } from 'material-ui';
import { Container, Loading, ShowMore } from '../../common/';

import SnippetsInnerToolbar from './SnippetsInnerToolbar';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import ScriptDialog from '../Scripts/ScriptDialog';
import ScriptsList from '../Scripts/ScriptsList';
import TemplatesActions from '../Templates/TemplatesActions';
import TemplatesStore from '../Templates/TemplatesStore';
import TemplateDialog from '../Templates/TemplateDialog';
import TemplatesList from '../Templates/TemplatesList';
import ScriptsEmptyViewSmall from '../Scripts/ScriptsEmptyViewSmall';
import TemplatesEmptyViewSmall from '../Templates/TemplatesEmptyViewSmall';
import SnippetsEmptyViewDouble from './SnippetsEmptyViewDouble';

const Snippets = React.createClass({
  displayName: 'Snippets',

  mixins: [
    Reflux.connect(ScriptsStore, 'scripts'),
    Reflux.connect(TemplatesStore, 'templates')
  ],

  componentDidMount() {
    console.info('Snippets::componentDidMount');
    ScriptsActions.fetch();
    TemplatesActions.fetch();
  },

  handleClickShowMore(listName) {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/${listName}/`);
  },

  redirectToScripts() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/scripts/`);
  },

  redirectToTemplates() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/templates/`);
  },

  render() {
    const { scripts, templates } = this.state;
    const hasBothListsEmpty = !scripts.items.length && !templates.items.length;
    const visibleItems = 3;

    return (
      <div>
        <Helmet title="Snippets" />
        <ScriptDialog />
        <TemplateDialog />

        <SnippetsInnerToolbar>
          <RaisedButton
            label="Add a Script"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={ScriptsActions.showDialog}
          />
          <RaisedButton
            label="Add a Template"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={TemplatesActions.showDialog}
          />
        </SnippetsInnerToolbar>

        <Container>
          <div style={{ clear: 'both', height: '100%' }}>
            <Loading show={scripts.isLoading || templates.isLoading}>
              <ScriptsList
                titleVisible={!hasBothListsEmpty}
                emptyView={hasBothListsEmpty ? <SnippetsEmptyViewDouble /> : <ScriptsEmptyViewSmall />}
                isLoading={scripts.isLoading}
                items={scripts.items.slice(0, visibleItems)}
                hideDialogs={scripts.hideDialogs}
              />
              <ShowMore
                label={`Show all ${scripts.items.length} Scripts`}
                style={{ marginBottom: 20 }}
                visible={scripts.items.length > visibleItems}
                onTouchTap={this.redirectToScripts}
              />
              <TemplatesList
                titleVisible={!hasBothListsEmpty}
                emptyView={hasBothListsEmpty ? <div /> : <TemplatesEmptyViewSmall />}
                isLoading={templates.isLoading}
                items={templates.items.slice(0, visibleItems)}
                hideDialogs={templates.hideDialogs}
              />
              <ShowMore
                label={`Show all ${templates.items.length} Templates`}
                visible={templates.items.length > visibleItems}
                onTouchTap={this.redirectToTemplates}
              />
            </Loading>
          </div>
        </Container>
      </div>
    );
  }
});

export default withRouter(Snippets);
