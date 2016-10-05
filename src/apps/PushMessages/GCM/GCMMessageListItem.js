import React from 'react';
import PushMessagesListItem from '../PushMessagesListItem';

const GCMMessageListItem = (props) => (
  <PushMessagesListItem
    type="GCM"
    {...props}
  />
);

export default GCMMessageListItem;
