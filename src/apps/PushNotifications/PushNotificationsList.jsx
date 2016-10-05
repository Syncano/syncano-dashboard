import React from 'react';

import { ColumnList, Loading, Lists } from '../../common/';
import APNSListItem from './APNS/APNSPushNotificationsListItem';
import GCMListItem from './GCM/GCMPushNotificationsListItem';
import APNSPushNotificationsSummaryDialog from './APNS/APNSPushNotificationsSummaryDialog';

const Column = ColumnList.Column;

export default (props) => {
  const renderItem = (item) => {
    const listItem = {
      APNS: <APNSListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}
      />,
      GCM: <GCMListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}
      />
    };

    return listItem[item.name];
  };

  return (
    <Lists.Container>
      <APNSPushNotificationsSummaryDialog />
      <ColumnList.Header>
        <Column.ColumnHeader
          handleClick={props.handleTitleClick}
          primary={true}
          columnName="DESC"
          className="col-sm-12"
        >
          {props.name}
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC" />
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-6"
        >
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            Configured
          </div>
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-sm-6"
          columnName="DESC"
        >
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            Messages
          </div>
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-sm-4"
          columnName="DESC"
        >
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            Devices
          </div>
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC" />
        <Column.ColumnHeader columnName="MENU" />
      </ColumnList.Header>
      <Loading show={props.isLoading}>
        <Lists.List
          {...props}
          renderItem={renderItem}
        />
      </Loading>
    </Lists.Container>
  );
};
