import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import { withRouter, Link } from 'react-router';
import Gravatar from 'gravatar';

import { SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../../apps/Session/SessionActions';
import SessionStore from '../../apps/Session/SessionStore';
import InstancesStore from '../../apps/Instances/InstancesStore';
import ProfileBillingPlanStore from '../../apps/Profile/ProfileBillingPlanStore';
import ProfileBillingPlanActions from '../../apps/Profile/ProfileBillingPlanActions';

// Components
import Sticky from 'react-stickydiv';
import { FontIcon, Divider, ListItem, Avatar, Toolbar, ToolbarGroup, IconMenu } from 'material-ui';
import { Logo, Clipboard, UpgradeButton } from '../';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';
import HeaderGettingStartedDropdown from './HeaderGettingStartedDropdown';

import './Header.sass';

const Header = Radium(React.createClass({
  displayName: 'Header',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(InstancesStore),
    SnackbarNotificationMixin
  ],

  componentDidMount() {
    ProfileBillingPlanActions.fetchBillingProfile();
    SessionStore.getInstance();
  },

  getStyles() {
    return {
      topToolbar: {
        background: this.context.muiTheme.rawTheme.palette.primary1Color,
        height: 50,
        padding: 0,
        justifyContent: 'flex-start'
      },
      logotypeContainer: {
        paddingLeft: 24,
        height: '100%',
        width: 256,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'initial'
      },
      logo: {
        height: 20
      },
      toolbarList: {
        padding: '0 24px',
        display: 'flex'
      },
      toolbarListItem: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer'
      },
      accountKeyIcon: {
        zIndex: -1
      },
      listItemInnerDiv: {
        padding: 0
      }
    };
  },

  getDropdownItems() {
    const { router } = this.props;
    const styles = this.getStyles();
    const user = SessionStore.getUser() || '';
    const billingIcon = <FontIcon className="synicon-credit-card" />;
    const instancesListIcon = <FontIcon className="synicon-view-list" />;
    const accountKeyIcon = <FontIcon className="synicon-key-variant" style={styles.accountKeyIcon} />;
    const logoutIcon = <FontIcon className="synicon-power" />;

    if (!user) {
      return null;
    }

    return (
      <div>
        <ListItem
          leftAvatar={this.renderIconButton()}
          onTouchTap={() => router.push('/account/')}
          primaryText={`${user.first_name} ${user.last_name}`}
          secondaryText={user.email}
        />
        <Divider />
        <ListItem
          leftIcon={accountKeyIcon}
          innerDivStyle={styles.listItemInnerDiv}
        >
          <Clipboard
            text="Copy Account Key"
            copyText={user.account_key}
            onCopy={() => this.setSnackbarNotification({
              message: 'Account Key copied to the clipboard'
            })}
            label="Copy Account Key"
            type="list"
          />
        </ListItem>
        <ListItem
          onTouchTap={() => router.push('/instances/')}
          leftIcon={instancesListIcon}
          primaryText="My Instances"
        />
        <ListItem
          onTouchTap={() => router.push('/account/plan/')}
          leftIcon={billingIcon}
          primaryText="Plans & Billing"
        />
        <ListItem
          data-e2e="account-logout-top-nav-item"
          onTouchTap={SessionActions.logout}
          leftIcon={logoutIcon}
          primaryText="Logout"
        />
      </div>
    );
  },

  getFallBackAvatar() {
    return `${location.protocol}//${location.hostname}:${location.port}/img/fox.png`;
  },

  getGravatarUrl() {
    const { gravatarUrl } = this.state;
    const userEmail = SessionStore.getUser() ? SessionStore.getUser().email : null;

    if (gravatarUrl) {
      return gravatarUrl;
    }

    return Gravatar.url(userEmail, { d: 'blank' }, true);
  },

  renderIconButton() {
    return (
      <Avatar
        data-e2e="account-icon-top-nav"
        style={{
          backgroundImage: `url(${this.getGravatarUrl()}), url(${this.getFallBackAvatar()})`,
          backgroundSize: '40px 40px',
          top: 'calc(50% - 20px)'
        }}
      />
    );
  },

  renderUpgradeButton() {
    const styles = this.getStyles();
    const { router } = this.props;
    const plan = ProfileBillingPlanStore.getPlan();

    if (plan !== 'builder') {
      return false;
    }

    return (
      <li
        id="upgrade-button"
        style={{ ...styles.toolbarListItem, ...{ paddingRight: 0 } }}
      >
        <UpgradeButton onTouchTap={() => router.push('/account/plan')} />
      </li>
    );
  },

  renderBetaBadge() {
    if (process.env.NODE_ENV !== 'beta') {
      return null;
    }

    return (
      <span style={{ color: '#fff', fontWeight: 600, paddingLeft: 10, paddingTop: 5 }}>BETA</span>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <Sticky zIndex={12}>
        <Toolbar style={styles.topToolbar}>
          <ToolbarGroup style={styles.logotypeContainer}>
            <Link to="app">
              <Logo
                className="logo-white"
                style={styles.logo}
              />
            </Link>
            {this.renderBetaBadge()}
          </ToolbarGroup>
          <ToolbarGroup style={{ height: '100%' }}>
            <ul
              className="toolbar-list left"
              style={styles.toolbarList}
            >
              {/* <li
                id="menu-demo-apps"
                style={styles.toolbarListItem}
              >
                <Link to="demo-apps">Demo Apps</Link>
              </li>*/}
              <li
                id="custom-sockets-registry"
                style={styles.toolbarListItem}
              >
                <Link to="custom-sockets-registry">Sockets Registry</Link>
              </li>
              <li
                id="menu-solutions"
                style={styles.toolbarListItem}
              >
                <Link to="solutions">Solutions Market</Link>
              </li>
              <li>
                <HeaderGettingStartedDropdown />
              </li>
            </ul>
          </ToolbarGroup>
          <ToolbarGroup style={{ marginLeft: -5, height: '100%', flex: 1, justifyContent: 'flex-end' }}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}
            >
              {this.renderUpgradeButton()}
              <li
                id="menu-notifications"
                style={styles.toolbarListItem}
              >
                <HeaderNotificationsDropdown id="menu-notifications--dropdown" />
              </li>
              <li>
                <IconMenu
                  iconButtonElement={this.renderIconButton()}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'middle'
                  }}
                  targetOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  {this.getDropdownItems()}
                </IconMenu>
              </li>
            </ul>
          </ToolbarGroup>
        </Toolbar>
      </Sticky>
    );
  }
}));

export default withRouter(Header);
