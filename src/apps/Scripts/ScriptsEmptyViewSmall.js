import React from 'react';
import { EmptyView } from '../../common';
import ScriptsActions from './ScriptsActions';

const ScriptsEmptyViewSmall = () => (
  <EmptyView.Small
    handleClick={ScriptsActions.showDialog}
    iconClassName="synicon-xml"
    description="You don't have any Scripts yet."
    buttonLabel="Add a Script"
  />
);

export default ScriptsEmptyViewSmall;
