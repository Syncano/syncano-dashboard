import React from 'react';
import _ from 'lodash';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Truncate } from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'MessageListItem',

  formatMessageBody(bodyObj) {
    return _.map(bodyObj, (value, key) => <Truncate text={`"${key}": "${value}"`} />);
  },

  render() {
    const { item, devicesIcon, type } = this.props;
    const messageBody = type === 'GCM' ? item.content.notification : item.content.aps.alert;
    const iconMap = {
      scheduled: {
        backgroundColor: Colors.blue400,
        iconClassName: 'timelapse'
      },
      error: {
        backgroundColor: Colors.red400,
        iconClassName: 'close'
      },
      delivered: {
        backgroundColor: Colors.green400,
        iconClassName: 'check'
      },
      partially_delivered: {
        backgroundColor: Colors.yellow700,
        iconClassName: 'alert-circle-outline'
      }
    };

    return (
      <ColumnList.Item
        key={item.id}
        checked={item.checked}
        data-e2e="push-message-list-item"
      >
        <Column.CheckIcon
          id={item.id}
          iconClassName={iconMap[item.status].iconClassName}
          className="col-sm-8"
          checkable={false}
          keyName="id"
          background={iconMap[item.status].backgroundColor}
          primaryText={_.replace(item.status, '_', ' ')}
          secondaryText={`ID: ${item.id.toString()}`}
        />
        <Column.Text className="col-sm-13">
          {this.formatMessageBody(messageBody)}
        </Column.Text>
        <Column.Desc>
          {item.content.environment}
        </Column.Desc>
        <Column.Desc>
          {item.content.registration_ids.length}
          <FontIcon
            color={Colors.blue400}
            className={devicesIcon}
          />
        </Column.Desc>
        <Column.Date
          date={item.created_at}
        />
      </ColumnList.Item>
    );
  }
});
