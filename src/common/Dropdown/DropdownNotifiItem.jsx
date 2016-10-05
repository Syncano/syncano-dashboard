import React from 'react';

import { FontIcon, FlatButton, List, ListItem } from 'material-ui';
import { Loading } from '../../common/';

export default React.createClass({
  displayName: 'DropdownNotifiItem',

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isLoading: React.PropTypes.bool,
    headerContent: React.PropTypes.shape({
      userFullName: React.PropTypes.string.isRequired,
      userEmail: React.PropTypes.string.isRequired,
      handleItemClick: React.PropTypes.func,
      clickable: React.PropTypes.bool
    })
  },

  getInvitationItems() {
    const invitationItems = this.props.items.filter((item) => item.type === 'invitation');

    return invitationItems;
  },

  getLinkItems() {
    const linkItems = this.props.items.filter((item) => item.type === 'normal-link');

    return linkItems;
  },

  renderInvitationItems() {
    const invitationItems = this.getInvitationItems();
    const items = invitationItems.map((item) => {
      const icon = (
        <FontIcon
          className={item.leftIcon.name || null}
          color={item.leftIcon.color}
        />
      );

      const buttons = (
        <div>
          <FlatButton
            onClick={item.handleAccept}
            label={item.buttonsText[0]}
            primary={true}
          />
          <FlatButton
            onClick={item.handleDecline}
            label={item.buttonsText[1]}
          />
        </div>
      );

      return (
        <ListItem
          leftIcon={icon}
          disabled={true}
        >
          {item.content.text}
          {buttons}
        </ListItem>
      );
    });

    return items;
  },

  renderEmptyNotification() {
    const emptyItem = {
      subheader: 'Notifications',
      subheaderStyle: {
        borderBottom: '1px solid #EAEAEA'
      },
      name: 'empty-notification',
      leftIcon: {
        name: 'synicon-information',
        color: '#0091EA'
      },
      content: {
        text: 'You don\'t have any notifications',
        style: {}
      }
    };
    const icon = (
      <FontIcon
        className={emptyItem.leftIcon.name}
        color={emptyItem.leftIcon.color}
      />
    );

    return (
      <List
        subheader={emptyItem.subheader}
        subheaderStyle={emptyItem.subheaderStyle}
      >
        <ListItem
          key={emptyItem.name}
          disableTouchTap={true}
          leftIcon={icon}
        >
          <span>
            {emptyItem.content.text}
          </span>
        </ListItem>
      </List>
    );
  },

  renderNormalLinkItems() {
    const linkItems = this.getLinkItems();
    const items = linkItems.map((item, index) => {
      const icon = (
        <FontIcon
          className={item.leftIcon.name || null}
          color={item.leftIcon.color}
        />
      );

      return (
        <ListItem
          disabled={true}
          key={item.name + index}
          leftIcon={icon}
          secondaryText={item.content.secondaryText}
          secondaryTextLines={item.content.secondaryTextLines || 1}
        >
          <span
            style={item.content.style}
          >
            {item.content.text}
          </span>
        </ListItem>
      );
    });

    return items;
  },

  renderItems() {
    const items = [];

    if (this.props.items.length === 0) {
      return this.renderEmptyNotification();
    }

    items.push(this.renderInvitationItems());
    items.push(this.renderNormalLinkItems());

    return items;
  },

  render() {
    return (
      <Loading
        show={this.props.isLoading}
        size={1}
      >
        {this.renderItems()}
      </Loading>
    );
  }
});
