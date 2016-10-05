import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import ScriptsActions from './ScriptsActions';
import { EmptyView } from '../../common';

const ScriptsEmptyView = () => (
  <EmptyView
    data-e2e="scripts-empty-list-item"
    iconClassName="synicon-xml"
    iconColor={Colors.cyan500}
    title="You don’t have any Scripts yet."
    description="Scripts allow you to run code in the cloud."
    urlLabel="Scripts"
    docsUrl="http://docs.syncano.io/v1.1/docs/snippets-scripts/"
    buttonLabel="Add a Script"
    handleClick={ScriptsActions.showDialog}
  />
);

export default ScriptsEmptyView;
