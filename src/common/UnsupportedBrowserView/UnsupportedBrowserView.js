import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import EmptyView from '../EmptyView';

const UnsupportedBrowserView = ({ actionButton }) => (
  <EmptyView
    iconClassName="synicon-emoticon-sad"
    iconColor={Colors.blue500}
    title="Unsupported browser"
    showDocsUrl={false}
    description="Oops! It seems that you are using a browser that doesn't support uploading folders :(.
       Please use Google Chrome or Syncano CLI instead."
    actionButton={actionButton}
  />
);

export default UnsupportedBrowserView;
