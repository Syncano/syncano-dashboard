import React from 'react';
import TemplatesActions from './TemplatesActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../common';

const ScriptsEmptyView = () => (
  <EmptyView
    data-e2e="templates-empty-list-item"
    iconClassName="synicon-arrow-up"
    iconColor={Colors.cyan500}
    title="You don't have any Templates yet."
    description="Templates allow for rendering your data in the desired format (html, xml, csv etc.)."
    urlLabel="Templates"
    docsUrl="http://docs.syncano.io/docs/snippets-templates"
    buttonLabel="Add a Template"
    handleClick={TemplatesActions.showDialog}
  />
);

export default ScriptsEmptyView;
