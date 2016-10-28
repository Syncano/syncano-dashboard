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
        alignSelf: 'flex-start',
        fontSize: 12,
        paddingTop: 8,
        textTransform: 'uppercase'
      },
      websiteUrlContainerStyles: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%'
      }
    }
  )

  toggleMoreLinks = () => {
    const { areLinksVisible } = this.state;

    this.setState({
      areLinksVisible: !areLinksVisible
    });
  }

  render() {
    const { areLinksVisible } = this.state;
    const { item, onIconClick, params, showDeleteDialog, showPublishDialog, showEditDialog } = this.props;
    const styles = this.getStyles();
    const isDefaultHosting = _.includes(item.domains, 'default');
    const defaultLink = `https://${params.instanceName}.syncano.site`;
    const domainsCount = item.domains.length;
    let customDomainLink = '';

    if (domainsCount) {
      customDomainLink = `https://${params.instanceName}--${item.domains[0]}.syncano.site`;
    }
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
            className="col-sm-12"
            id={item.id}
            iconClassName="socket-hosting"
            iconColor={Colors.orange600}
            checked={item.checked}
            handleIconClick={onIconClick}
            primaryText={item.name}
          />
          <Column.Desc
            className="col-flex-1"
            data-e2e={`${item.description}-hosting-list-item-description`}
          >
            {item.description}
          </Column.Desc>
          <Column.Desc className="col-sm-11">
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
            <Link
              to={{ pathname: filesRedirectPath }}
              data-e2e={`${item.name}-hosting-list-item-files`}
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
          <Column.Menu data-e2e={`${item.name}-hosting-dropdown-icon`}>
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
