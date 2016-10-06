import React, { Component } from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, StatusLabel, LinkWithIcon, Show } from '../../common/';
import HostingListItemLinks from './HostingListItemLinks';

const Column = ColumnList.Column;

class HostingListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areLinksVisible: false
    };
  }

  getStyles = () => (
    {
      moreLinksButton: {
        cursor: 'pointer',
        color: Colors.blue500,
        width: '100%',
        fontSize: 12,
        paddingBottom: 8,
        textTransform: 'uppercase'
      },
      websiteUrlContainerStyles: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }
    }
  )

  toggleMoreLinks = () => {
    const { areLinksVisible } = this.state;

    this.setState({
      areLinksVisible: !areLinksVisible
    });
  }

  render = () => {
    const { areLinksVisible } = this.state;
    const { item, onIconClick, params, showDeleteDialog, showPublishDialog, showEditDialog } = this.props;
    const styles = this.getStyles();
    const isDefaultHosting = _.includes(item.domains, 'default');
    const defaultLink = `https://${params.instanceName}.syncano.site`;
    const domainsCount = item.domains.length;
    const customDomainLink = domainsCount ? `https://${params.instanceName}--${item.domains[0]}.syncano.site` : '';
    const visibleLink = isDefaultHosting ? defaultLink : customDomainLink;
    const moreLinksLabel = areLinksVisible ? 'Hide Links' : 'More Links';
    const filesRedirectPath = `/instances/${params.instanceName}/hosting/${item.id}/files/`;
    const moreButton = (
      <div
        style={styles.moreLinksButton}
        onClick={this.toggleMoreLinks}
      >
        {moreLinksLabel}
      </div>
    );

    return (
      <div>
        <ColumnList.Item
          checked={item.checked}
          key={item.id}
        >
          <Column.CheckIcon.Socket
            className="col-sm-9"
            id={item.id}
            iconClassName="socket-hosting"
            iconColor={Colors.orange600}
            checked={item.checked}
            handleIconClick={onIconClick}
            primaryText={item.label}
          />
          <Column.Desc
            className="col-sm-7"
            data-e2e={`${item.description}-hosting-list-item-description`}
          >
            {item.description}
          </Column.Desc>
          <Column.Desc className="col-sm-12">
            <Show if={domainsCount}>
              <div style={styles.websiteUrlContainerStyles}>
                <LinkWithIcon url={visibleLink} />
                <Show if={domainsCount > 1}>
                  {moreButton}
                </Show>
              </div>
            </Show>
          </Column.Desc>
          <Column.Desc className="col-sm-3">
            <Link to={{ pathname: filesRedirectPath }}>
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
              primaryText="Publish"
              data-e2e="dropdown-hosting-item-publish"
            />
            <MenuItem
              onTouchTap={showDeleteDialog}
              primaryText="Delete"
              data-e2e="dropdown-hosting-item-delete"
            />
          </Column.Menu>
        </ColumnList.Item>
        <HostingListItemLinks
          isVisible={areLinksVisible}
          domains={item.domains}
          isDefaultHosting={isDefaultHosting}
        />
      </div>
    );
  }
}

export default withRouter(HostingListItem);
