import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';

import AuthActions from '../../apps/Account/AuthActions';
import SessionStore from '../../apps/Session/SessionStore';
import ProfileInvitationsStore from '../../apps/ProfileInvitations/ProfileInvitationsStore';
import ProfileInvitationsActions from '../../apps/ProfileInvitations/ProfileInvitationsActions';

import { Popover, FontIcon, MenuItem, Divider, Badge, IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Loading } from '../';
import { SnackbarNotificationMixin } from '../../mixins';
import InvitationItem from './InvitationItem';

export default Radium(React.createClass({
  displayName: 'HeaderNotificationsDropdown',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
    SnackbarNotificationMixin
  ],

  componentDidMount() {
    ProfileInvitationsActions.fetch();
  },

  getInitialState() {
    return {
      open: false
    };
  },

  getStyles() {
    return {
      icon: {
        color: Colors.white,
        fontSize: 21
      },
      badgeContainer: {
        padding: 0
      },
      badgeContainerFilled: {
        padding: '0 6px 0 0'
      },
      badge: {
        backgroundColor: 'transparent',
        color: '#fff'
      },
      badgeFilled: {
        background: this.context.muiTheme.rawTheme.palette.accent2Color
      },
      resendEmailText: {
        cursor: 'pointer',
        color: Colors.lightBlueA700,
        lineHeight: '48px'
      },
      menuItem: {
        whiteSpace: 'normal',
        lineHeight: '24px',
        color: '#777',
        minWidth: '400px',
        paddingTop: '12px',
        paddingBottom: '12px',
        position: 'relative'
      }
    };
  },

  handleAcceptInvitations(items) {
    console.info('Header::handleAcceptInvitations');
    ProfileInvitationsActions.acceptInvitations(items);
    this.shouldPopoverHide();
  },

  handleDeclineInvitations(items) {
    console.info('Header::handleDeclineInvitations');
    ProfileInvitationsActions.declineInvitations(items);
    this.shouldPopoverHide();
  },

  handleResendEmail() {
    console.info('Header::handleResendEmail');
    AuthActions.resendActivationEmail(SessionStore.getUser().email);
    this.setSnackbarNotification({ message: 'Activation e-mail was sent' });
    this.shouldPopoverHide();
  },

  shouldPopoverHide() {
    const { items } = this.state;

    if (!items.length) {
      this.togglePopover(null, false);
    }
  },

  togglePopover(event, isOpen) {
    if (isOpen) {
      ProfileInvitationsActions.fetchInvitations();
    }

    this.setState({
      open: isOpen,
      anchorEl: event ? event.currentTarget : null
    });
  },

  renderItems() {
    const styles = this.getStyles();
    const { items } = this.state;
    const user = SessionStore.getUser();

    if (user && user.is_active && !items.length) {
      return (
        <MenuItem
          key="empty"
          primaryText="You don't have any notifications"
          disabled={true}
          style={styles.menuItem}
          leftIcon={
            <FontIcon
              className="synicon-information"
              color={Colors.lightBlueA700}
            />
          }
        />
      );
    }

    const notifications = items.map((item) =>
      <InvitationItem
        key={`invitation${item.id}`}
        item={item}
        handleAccept={() => this.handleAcceptInvitations([item])}
        handleDecline={() => this.handleDeclineInvitations([item])}
      />
    );

    if (SessionStore.getUser() && !SessionStore.getUser().is_active) {
      notifications.push(
        <MenuItem
          key="resend-link"
          style={styles.menuItem}
          onTouchTap={this.handleResendEmail}
          leftIcon={
            <FontIcon
              className="synicon-alert"
              color={Colors.orange500}
            />
          }
        >
          <div style={styles.resendEmailText}>
            Your email address is not yet verified. Click here to resend activation email.
          </div>
        </MenuItem>
      );
    }

    return notifications;
  },

  renderIcon() {
    const notifications = this.renderItems();
    const isBadge = notifications.length > 0;
    const notificationCountIcon = isBadge ? notifications.length : '';
    const iconClassName = notifications.length ? 'synicon-bell' : 'synicon-bell-outline';
    const styles = this.getStyles();
    const badgeContainerStyle = { ...styles.badgeContainer, ...(isBadge && styles.badgeContainerFilled) };
    const badgeStyle = { ...styles.badge, ...(isBadge && styles.badgeFilled) };

    return (
      <Badge
        badgeContent={notificationCountIcon}
        style={badgeContainerStyle}
        badgeStyle={badgeStyle}
      >
        <IconButton
          data-e2e="notification-top-nav-button"
          iconStyle={styles.icon}
          iconClassName={iconClassName}
          onTouchTap={(event) => this.togglePopover(event, true)}
        />
      </Badge>
    );
  },

  render() {
    const { isLoading, open, anchorEl } = this.state;
    const { id } = this.props;

    return (
      <div>
        {this.renderIcon()}
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={(event) => this.togglePopover(event, false)}
        >
          <MenuItem
            data-e2e="notification-top-nav-list"
            id={id}
            key="notificationDropdownHeader"
            primaryText="Notifications"
            disabled={true}
          />
          <Divider />
          {this.renderItems()}
          <Loading
            type="linear"
            position="bottom"
            show={isLoading}
          />
        </Popover>
      </div>
    );
  }
}));
