import React from 'react';
import { Link } from 'react-router';

import { SnackbarNotificationMixin } from '../../mixins';

import Actions from './ScriptEndpointsActions';

import { MenuItem } from 'material-ui';
import { Color, ColumnList, Clipboard } from '../../common/';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsListItem',

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
    const { item, onIconClick, showDeleteDialog, scriptLabel } = this.props;
    const publicString = item.public.toString();
    const link = item.public ? item.links['public-link'] : item.links.self;

    return (
      <ColumnList.Item
        data-e2e={`${item.name}-script-socket-row`}
        checked={item.checked}
        id={item.name}
        key={item.name}
      >
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName="socket-script-endpoint"
          iconColor={Color.getColorByName('red', 'light')}
          keyName="name"
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={
            <Clipboard
              text={link}
              copyText={`${APP_CONFIG.SYNCANO_BASE_URL}${link}`}
              onCopy={() => this.setSnackbarNotification({
                message: 'Script Endpoint url copied!'
              })}
              tooltip="Copy Script Endpoint url"
              type="link"
            />
          }
        />
        <Column.Desc
          data-e2e={`${item.name}-script-socket-description`}
          className="col-flex-1"
        >
          {item.description}
        </Column.Desc>
        <Column.Desc
          className="col-flex-1"
        >
          <Link
            data-e2e={`${item.name}-script-socket-related-script`}
            to={{
              name: 'script',
              params: {
                instanceName,
                scriptId: item.script
              }
            }}
          >
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to={{
              name: 'scriptEndpoint-traces',
              params: {
                instanceName,
                scriptEndpointName: item.name
              }
            }}
          >
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">{publicString}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit"
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
