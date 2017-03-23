import React from 'react';

import Actions from './ChannelsActions';
import SendChannelMessageDialogActions from './SendChannelMessageDialogActions';

import { Link } from 'react-router';
import { SnackbarNotificationMixin } from '../../mixins';

import { MenuItem } from 'material-ui';
import { Color, ColumnList, Clipboard } from '../../common/';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [SnackbarNotificationMixin],

  render() {
    const { instanceName } = this.context.params;
    const { item, onIconClick, showDeleteDialog } = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}
      >
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName="socket-channel"
          iconColor={Color.getColorByName('blue', 'light')}
          keyName="name"
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={
            <Clipboard
              text={item.links.poll}
              copyText={`${APP_CONFIG.SYNCANO_BASE_URL}${item.links.poll}`}
              onCopy={() => this.setSnackbarNotification({
                message: 'Channel Socket url copied!'
              })}
              tooltip="Copy Channel Socket url"
              type="link"
            />
          }
        />
        <Column.Desc className="col-flex-1">
          {item.description}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.type}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to={{
              name: 'channel-history',
              params: {
                instanceName,
                channelName: item.name
              }
            }}
          >
            History
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-publish"
            disabled={!item.custom_publish}
            onTouchTap={() => SendChannelMessageDialogActions.showDialog(item)}
            primaryText={`Send Message ${!item.custom_publish ? ' (only for custom publish)' : ''}`}
          />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
