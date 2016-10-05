import React from 'react';

import ScriptsActions from '../Scripts/ScriptsActions';
import TemplatesActions from '../Templates/TemplatesActions';

import { EmptyView } from '../../common';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const PushMessagesEmptyViewDouble = () => (
  <EmptyView.Double
    iconClassName="synicon-code-tags"
    iconColor={Colors.indigo400}
    title="You don't have any Snippets yet."
    labelButtonLeft="Add A Script"
    labelButtonRight="Add a Template"
    leftIconType={<FontIcon className="synicon-xml" />}
    rightIconType={<FontIcon className="synicon-arrow-up" />}
    handleClickLeftButton={ScriptsActions.showDialog}
    handleClickRightButton={TemplatesActions.showDialog}
    description={
      <span>
        Snippets consist of scripts and templates. Scripts allow you to run code in the cloud, templates help you
         render your data in the desired format (html, xml, csv etc.). Read our
        <a href="http://docs.syncano.io/docs/snippets-scripts" target="_blank"> Snippets - Scripts docs </a> and
        <a href="http://docs.syncano.io/docs/snippets-templates" target="_blank"> Snippets - Templates docs </a>
        to learn more.
      </span>
    }
  />
);

export default PushMessagesEmptyViewDouble;
