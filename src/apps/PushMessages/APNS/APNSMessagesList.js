import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';

import Actions from './APNSMessagesActions';
import Store from './APNSMessagesStore';

import PushMessagesList from '../PushMessagesList';
import EmptyView from './APNSMessagesEmptyView';
import NoDevicesView from '../../PushDevices/APNSDevices/APNSDevicesEmptyView';
import NoConfigView from '../../PushDevices/APNSDevices/APNSNoConfigEmptyView';

const APNSMessagesList = React.createClass({
  displayName: 'APNSMessagesList',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    const { routes } = this.props;
    const currentRouteName = routes[routes.length - 1].name;

    if (currentRouteName !== 'all-push-notification-messages') {
      Actions.fetch();
    }
  },

  getDefaultProps() {
    return {
      noConfigView: <NoConfigView />,
      noDevicesView: <NoDevicesView />,
      emptyView: <EmptyView />,
      titleVisible: true
    };
  },

  shouldShowTitle() {
    const { titleVisible, routes } = this.props;
    const { hasConfig, hasDevices, hasMessages } = this.state;
    const currentRouteName = routes[routes.length - 1].name;

    if (currentRouteName !== 'all-push-notification-messages') {
      return hasConfig && hasMessages && hasDevices;
    }

    return titleVisible;
  },

  render() {
    const { items, isLoading, hasDevices, hasConfig } = this.state;

    return (
      <PushMessagesList
        isLoading={isLoading}
        items={items}
        type="APNS"
        title={this.shouldShowTitle() ? 'iOS Messages History' : null}
        hasConfig={hasConfig}
        hasDevices={hasDevices}
        {...this.props}
      />
    );
  }
});

export default withRouter(APNSMessagesList);
