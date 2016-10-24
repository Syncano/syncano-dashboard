import React, { Component } from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, StatusLabel } from '../../common/';
import HostingListItemLinks from './HostingListItemLinks';

const Column = ColumnList.Column;

class HostingListItem extends Component {
  getStyles = () => ({
    root: {
      height: 'auto',
      minHeight: 64
    },
    websiteUrlContainerStyles: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%'
    }
  });

  render() {
    const { item, onIconClick, params, showDeleteDialog, showPublishDialog, showEditDialog } = this.props;
    const styles = this.getStyles();
    const isDefaultHosting = _.includes(item.domains, 'default');

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}
        style={styles.root}
      >
        <Column.CheckIcon.Socket
          className="col-sm-12"
          id={item.id}
          iconClassName="socket-hosting"
          iconColor={Colors.orange600}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.label}
        />
        <Column.Desc
          className="col-flex-1"
          data-e2e={`${item.description}-hosting-list-item-description`}
        >
          {item.description}
        </Column.Desc>
        <Column.Desc className="col-sm-11">
          <div style={styles.websiteUrlContainerStyles}>
            <HostingListItemLinks items={item.domains} />
          </div>
        </Column.Desc>
        <Column.Desc className="col-sm-3">
          <Link
            to={`/instances/${params.instanceName}/hosting/${item.id}/files/`}
            data-e2e={`${item.label}-hosting-lit-item-files`}
          >
            Files
          </Link>
        </Column.Desc>
        <Column.Desc className="col-sm-3 row align-center">
          <StatusLabel
            isActive={isDefaultHosting}
            withInactive={false}
          />
        </Column.Desc>
        <Column.Menu data-e2e={`${item.label}-hosting-dropdown-icon`}>
          <MenuItem
            onTouchTap={showEditDialog}
            primaryText="Edit"
            data-e2e="dropdown-hosting-item-edit"
          />
          <MenuItem
            onTouchTap={showPublishDialog}
            primaryText="Set as default"
            disabled={isDefaultHosting}
            data-e2e="dropdown-hosting-item-set-default"
          />
          <MenuItem
            onTouchTap={showDeleteDialog}
            primaryText="Delete"
            data-e2e="dropdown-hosting-item-delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
}

export default withRouter(HostingListItem);
