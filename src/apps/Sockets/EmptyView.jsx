import React from 'react';
import { withRouter } from 'react-router';

import ChannelsActions from '../Channels/ChannelsActions';
// import CustomSocketsActions from '../CustomSockets/CustomSocketsActions';
import DataEndpointsActions from '../DataEndpoints/DataEndpointsActions';
import ScriptEndpointsActions from '../ScriptEndpoints/ScriptEndpointsActions';
import TriggersActions from '../Triggers/TriggersActions';
import SchedulesActions from '../Schedules/SchedulesActions';
import { APNSActions, GCMActions } from '../PushNotifications';
import SocketsStore from './SocketsStore';
import HostingActions from '../Hosting/HostingActions';
import EmptyListItem from './EmptyListItem';

const EmptyView = () => {
  const styles = {
    listContainer: {
      maxWidth: 744,
      margin: '0 auto'
    },
    socketDescription: {
      paddingTop: 5,
      color: '#9B9B9B'
    }
  };

  return (
    <div style={styles.listContainer}>
      <EmptyListItem
        handleCreate={DataEndpointsActions.showDialog}
        socketName="DataEndpoint"
        title="Data Endpoint"
        description="Place your objects and manage how your data is returned from Syncano."
        documentationUrl="http://docs.syncano.io/docs/endpoints-data/"
      />
      <EmptyListItem
        handleCreate={ScriptEndpointsActions.showDialog}
        socketName="ScriptEndpoint"
        title="Script Endpoint"
        description="Run Scripts on our servers and use them for business logic."
        documentationUrl="http://docs.syncano.io/docs/endpoints-scripts/"
      />
      <EmptyListItem
        handleCreate={TriggersActions.showDialog}
        socketName="Trigger"
        title="Trigger"
        description="Execute a Script when your data is created, updated or deleted."
        documentationUrl="http://docs.syncano.io/docs/triggers/"
      />
      <EmptyListItem
        handleCreate={SchedulesActions.showDialog}
        socketName="Schedule"
        title="Schedule"
        description="Plan events and run Scripts at desired times."
        documentationUrl="http://docs.syncano.io/docs/schedules/"
      />
      <EmptyListItem
        handleCreate={ChannelsActions.showDialog}
        socketName="Channel"
        title="Real-time Channel"
        description="Get real-time updates to keep your data synchronized."
        documentationUrl="http://docs.syncano.io/docs/realtime-communication/"
      />
      <EmptyListItem
        handleCreate={HostingActions.showDialog}
        socketName="Hosting"
        title="Hosting"
        description="Host, deploy and publish your websites using Syncano platform."
        documentationUrl="http://docs.syncano.io/docs/"
      />
      {/*
      <EmptyListItem
        handleCreate={CustomSocketsActions.showDialog}
        socketName="CustomSocket"
        title="Custom Sockets (BETA)"
        description="Some text about Custom Sockets to be REPLACED."
        documentationUrl="http://docs.syncano.io/docs/"
      />
      */}
      <EmptyListItem
        handleCreate={APNSActions.showDialog}
        label={SocketsStore.hasAPNSConfig() ? 'Edit' : 'Add'}
        socketName="Push"
        title="Apple Push Notifications"
        description="Instantly message your mobile users with timely and relevant content."
        documentationUrl="http://docs.syncano.io/docs/push-notification-sockets-ios/"
      />
      <EmptyListItem
        handleCreate={GCMActions.showDialog}
        label={SocketsStore.hasGCMConfig() ? 'Edit' : 'Add'}
        socketName="Push"
        title="Google Push Notifications"
        description="Instantly message your mobile users with timely and relevant content."
        documentationUrl="http://docs.syncano.io/docs/push-notification-sockets-android/"
      />
    </div>
  );
};

export default withRouter(EmptyView);
