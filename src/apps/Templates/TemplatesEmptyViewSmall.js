import React from 'react';
import { EmptyView } from '../../common';
import TemplatesActions from './TemplatesActions';

const TemplatesEmptyViewSmall = () => (
  <EmptyView.Small
    handleClick={TemplatesActions.showDialog}
    iconClassName="synicon-arrow-up"
    description="You don't have any Templates yet."
    buttonLabel="Add a Template"
  />
);

export default TemplatesEmptyViewSmall;
