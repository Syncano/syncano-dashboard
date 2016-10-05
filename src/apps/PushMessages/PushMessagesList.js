import React from 'react';
import { withRouter } from 'react-router';

import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Loading, Container, Lists, ShowMore } from '../../common/';
import APNSMessageListItem from './APNS/APNSMessageListItem';
import GCMMessageListItem from './GCM/GCMMessageListItem';

const Column = ColumnList.Column;

const PushMessagesList = React.createClass({
  displayName: 'PushMessagesList',

  getStyles() {
    return {
      title: {
        color: Colors.grey400,
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 20,
        marginTop: 30
      },
      status: {
        marginLeft: 64
      }
    };
  },

  redirectToSingleMessagesList() {
    const { router, params, type } = this.props;
    const redirectPathName = `/instances/${params.instanceName}/push-notifications/messages/${type.toLowerCase()}/`;

    router.push(redirectPathName);
  },

  renderItem(item) {
    const { type } = this.props;
    const listItem = {
      APNS: (
        <APNSMessageListItem
          devicesIcon="synicon-cellphone-iphone"
          item={item}
        />
      ),
      GCM: (
        <GCMMessageListItem
          devicesIcon="synicon-cellphone-android"
          item={item}
        />
      )
    };

    return listItem[type];
  },

  renderHeader() {
    const styles = this.getStyles();

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          columnName="CHECK_ICON"
          className="col-sm-8"
        >
          <div style={styles.status}>
            Status
          </div>
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-13"
        >
          Message
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC">
          Environment
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC">
          Devices
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DATE">
          Sent
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  renderContent() {
    const { emptyView, items, router, type, params } = this.props;
    const visibleItems = 3;
    const isAllMessagesRouteActive = router.isActive({ name: 'all-push-notification-messages', params });
    const slicedItems = isAllMessagesRouteActive ? items.slice(0, visibleItems) : items;

    if (!items || items.length === 0) {
      return emptyView;
    }

    return (
      <div>
        <Lists.Container>
          {this.renderHeader()}

          <Lists.List
            items={slicedItems}
            renderItem={this.renderItem}
          />
        </Lists.Container>


        <ShowMore
          label={`Show all ${items.length} ${type} messages`}
          visible={items.length > visibleItems && isAllMessagesRouteActive}
          onTouchTap={this.redirectToSingleMessagesList}
        />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { title, isLoading, hasConfig, hasDevices, noConfigView, noDevicesView } = this.props;

    if (!hasConfig && !isLoading) {
      return (
        <Container>
          <div style={styles.title}>
            {title}
          </div>
          {noConfigView}
        </Container>
      );
    }

    if (!hasDevices && !isLoading) {
      return (
        <Container>
          <div style={styles.title}>
            {title}
          </div>
          {noDevicesView}
        </Container>
      );
    }

    return (
      <Container>
        <div style={styles.title}>
          {title}
        </div>
        <Loading show={isLoading}>
          {this.renderContent()}
        </Loading>
      </Container>
    );
  }
});

export default withRouter(PushMessagesList);
