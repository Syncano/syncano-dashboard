import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import { withRouter, Link } from 'react-router';
import Gravatar from 'gravatar';

// Stores & Actions
import SessionActions from '../../apps/Session/SessionActions';
import SessionStore from '../../apps/Session/SessionStore';
import InstancesStore from '../../apps/Instances/InstancesStore';
import ProfileBillingPlanStore from '../../apps/Profile/ProfileBillingPlanStore';
import ProfileBillingPlanActions from '../../apps/Profile/ProfileBillingPlanActions';

// Components
import Sticky from 'react-stickydiv';
import { FontIcon, Divider, ListItem, Avatar, Toolbar, ToolbarGroup, IconMenu } from 'material-ui';
import { Logo, HeaderButton } from '../';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

import './Header.sass';

const Header = Radium(React.createClass({
  displayName: 'Header',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(InstancesStore)
  ],

  componentDidMount() {
    ProfileBillingPlanActions.fetchBillingProfile();
    SessionStore.getInstance();
  },

  getStyles() {
    return {
      avatar: {
        backgroundImage: `url(${this.getGravatarUrl()})`,
        backgroundSize: '40px 40px',
        top: 'calc(50% - 20px)'
      },
      betaBadge: {
        color: '#fff',
        fontWeight: 600,
        paddingLeft: 10,
        paddingTop: 5
      },
      topToolbar: {
        background: '#4C38D0',
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
      toolbarGroup: {
        marginLeft: -5,
        height: '100%',
        flex: 1,
        justifyContent: 'flex-end'
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
      toolbarDropdownListItem: {
        padding: 0
      }
    };
  },

  getDropdownItems() {
    const user = SessionStore.getUser() || '';
    const billingIcon = <FontIcon className="synicon-credit-card" />;
    const instancesListIcon = <FontIcon className="synicon-view-list" />;
    const logoutIcon = <FontIcon className="synicon-power" />;

    if (!user) {
      return null;
    }

    return (
      <div>
        <ListItem
          leftAvatar={this.renderIconButton()}
          onTouchTap={this.goToAccountDetails}
          primaryText={`${user.first_name} ${user.last_name}`}
          secondaryText={user.email}
        />
        <Divider />
        <ListItem
          onTouchTap={this.goToInstances}
          leftIcon={instancesListIcon}
          primaryText="My Instances"
        />
        <ListItem
          onTouchTap={this.goToAccountPlan}
          leftIcon={billingIcon}
          primaryText="Plans & Billing"
        />
        <ListItem
          onTouchTap={SessionActions.logout}
          leftIcon={logoutIcon}
          primaryText="Logout"
          data-e2e="account-logout-top-nav-item"
        />
      </div>
    );
  },

  getGravatarUrl() {
    const { gravatarUrl } = this.state;
    const userEmail = SessionStore.getUser() ? SessionStore.getUser().email : null;

    if (gravatarUrl) {
      return gravatarUrl;
    }

    return Gravatar.url(userEmail, { d: 'mm' }, true);
  },

  goToAccountDetails() {
    const { router } = this.props;

    router.push('/account/');
  },

  goToInstances() {
    const { router } = this.props;

    router.push('/instances/');
  },

  goToAccountPlan() {
    const { router } = this.props;

    router.push('/account/plan/');
  },

  renderIconButton() {
    const styles = this.getStyles();

    return (
      <Avatar
        data-e2e="account-icon-top-nav"
        style={styles.avatar}
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
        <HeaderButton
          onTouchTap={() => router.push('/account/plan/')}
          label="Upgrade"
          fontIcon="fa fa-arrow-up"
        />

      </li>
    );
  },

  renderBetaBadge() {
    const styles = this.getStyles();

    if (APP_CONFIG.ENV !== 'beta') {
      return null;
    }

    return (
      <span style={styles.betaBadge}>BETA</span>
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
              <li
                id="menu-instances"
                style={{ ...styles.toolbarListItem, paddingTop: '5px' }}
              >
                <HeaderButton
                  onTouchTap={this.goToInstances}
                  label="Instances"
                  fontIcon="fa fa-list-alt"
                />
              </li>
              <li
                id="menu-getting-started"
                style={styles.toolbarListItem}
              >
                <HeaderButton
                  href="https://syncano.github.io/syncano-node-cli/#/getting-started/quickstart"
                  target="_blank"
                  label="Getting Started"
                  fontIcon="fa fa-rocket"
                />
              </li>
              <li
                id="menu-documentation"
                style={styles.toolbarListItem}
              >
                <HeaderButton
                  href="https://syncano.github.io/syncano-node-cli/#/"
                  target="_blank"
                  label="Documentation"
                  fontIcon="fa fa-book"
                />
              </li>
            </ul>
          </ToolbarGroup>
          <ToolbarGroup style={styles.toolbarGroup}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}
            >
              {this.renderUpgradeButton()}
              <li
                id="menu-notifications"
                style={{ ...styles.toolbarListItem, ...{ paddingTop: '4px' } }}
              >
                <HeaderNotificationsDropdown id="menu-notifications--dropdown" />
              </li>
              <li>
                <IconMenu
                  iconButtonElement={this.renderIconButton()}
                  style={{ cursor: 'pointer' }}
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
