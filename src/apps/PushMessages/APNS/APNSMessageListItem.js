import React from 'react';
import PushMessagesListItem from '../PushMessagesListItem';

const APNSMessageListItem = (props) => (
  <PushMessagesListItem
    type="APNS"
    {...props}
  />
);

export default APNSMessageListItem;
