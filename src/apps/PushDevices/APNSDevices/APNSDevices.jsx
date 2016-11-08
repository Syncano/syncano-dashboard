import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Store from './APNSDevicesStore';
import Actions from './APNSDevicesActions';

import { Container } from '../../../common/';
import DevicesList from '../DevicesList';
import APNSDevicesEmptyView from './APNSDevicesEmptyView';
import APNSNoConfigEmptyView from './APNSNoConfigEmptyView';
import APNSPushNotificationsSummaryDialog from '../../PushNotifications/APNS/APNSPushNotificationsSummaryDialog';

const APNSDevices = React.createClass({
  displayName: 'APNSDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    const { routes } = this.props;
    const currentRouteName = routes[routes.length - 1].name;

    if (currentRouteName !== 'all-push-notification-devices') {
      Actions.fetch();
    }
  },

  getDefaultProps() {
    return {
      titleVisible: true,
      emptyView: <APNSDevicesEmptyView />,
      noConfigView: <APNSNoConfigEmptyView />
    };
  },

  shouldShowTitle() {
    const { titleVisible, routes } = this.props;
    const { hasConfig, hasItems } = this.state;
    const currentRouteName = routes[routes.length - 1].name;

    if (currentRouteName !== 'all-push-notification-devices') {
      return hasConfig && hasItems;
    }

    return titleVisible;
  },

  render() {
    const { hasConfig, hideDialogs, isLoading, items, ...other } = this.state;
    const { visibleItems, emptyView, noConfigView } = this.props;

    return (
      <Container>
        <Helmet title="iOS Devices" />
        <APNSPushNotificationsSummaryDialog />
        <DevicesList
          titleVisible={this.shouldShowTitle()}
          emptyView={emptyView}
          noConfigView={noConfigView}
          type="apns"
          hasConfig={hasConfig}
          visibleItems={visibleItems}
          getCheckedItems={Store.getCheckedItems}
          actions={Actions}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add APNS Device"
          hideDialogs={hideDialogs}
          isLoading={isLoading}
          items={items}
          {...other}
        />
      </Container>
    );
  }
});

export default withRouter(APNSDevices);
