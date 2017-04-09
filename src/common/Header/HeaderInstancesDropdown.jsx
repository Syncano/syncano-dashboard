import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Radium from 'radium';
import localStorage from 'local-storage-fallback';

import SessionStore from '../../apps/Session/SessionStore';
import SessionActions from '../../apps/Session/SessionActions';
import InstancesStore from '../../apps/Instances/InstancesStore';
import InstancesActions from '../../apps/Instances/InstancesActions';

import { FontIcon, IconMenu, List, ListItem, Subheader } from 'material-ui';
import { Color, ColumnList } from '../../common/';

const HeaderInstancesDropdown = Radium(React.createClass({
  mixins: [
    Reflux.connect(InstancesStore),
    Reflux.connectFilter(SessionStore, 'currentInstance', (sessionData) => sessionData.instance)
  ],

  componentDidMount() {
    InstancesActions.fetch();
  },

  getStyles() {
    return {
      root: {
        height: 56,
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 24,
        backgroundColor: '#F2F2F2',
        position: 'fixed',
        width: 256,
        zIndex: 1,
        cursor: 'pointer'
      },
      dropdownInstanceIcon: {
        left: 20,
        minWidth: 32,
        height: 32,
        fontSize: 18,
        lineHeight: '18px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: 'green',
        margin: '8px 16px 8px 0'
      },
      dropdownMenu: {
        left: 0,
        top: 0,
        maxHeight: 'calc(100vh - 80px)',
        overflow: 'auto',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)'
      },
      list: {
        minWidth: 320,
        paddingBottom: 0
      },
      separator: {
        borderTop: '1px solid #BDBDBD',
        paddingLeft: 20
      },
      dropdownText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        paddingLeft: 0,
        textOverflow: 'ellipsis',
        fontSize: 16,
        lineHeight: '24px'
      },
      noInstancesItem: {
        fontWeight: 500,
        color: '#BDBDBD'
      },
      dropdownIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
      },
      iconMenu: {
        width: '100%'
      },
      currentInstanceListItem: {
        fontWeight: 700
      }
    };
  },

  handleDropdownItemClick(instanceName) {
    const { router } = this.props;

    // redirect to main instance screen
    this.refs.instancesDropdown.close();
    SessionActions.fetchInstance(instanceName);
    localStorage.setItem('lastInstanceName', instanceName);
    router.push(`/instances/${instanceName}/`);
  },

  renderListItems(instances) {
    const styles = this.getStyles();
    const { currentInstance } = this.state;
    const defaultIconBackground = ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    const defaultIcon = ColumnList.ColumnListConstans.DEFAULT_ICON;
    const items = instances.map((instance) => {
      const iconName = instance.metadata.icon ? `synicon-${instance.metadata.icon}` : `synicon-${defaultIcon}`;
      const iconBackground = {
        backgroundColor: Color.getColorByName(instance.metadata.color, 'dark') || defaultIconBackground
      };
      const icon = (
        <FontIcon
          className={iconName}
          style={{ ...styles.dropdownInstanceIcon, ...iconBackground }}
        />
      );

      return (
        <ListItem
          key={instance.name}
          primaryText={instance.name}
          onTouchTap={() => this.handleDropdownItemClick(instance.name)}
          style={instance.name === currentInstance.name && styles.currentInstanceListItem}
          leftIcon={icon}
          data-e2e={instance.name}
        />
      );
    });

    return items;
  },

  renderList(instances) {
    const styles = this.getStyles();
    const subheaderText = InstancesStore.amIOwner(instances[0]) ? 'My Instances' : 'Shared with me';

    if (!instances.length) {
      return null;
    }

    return (
      <List
        className={InstancesStore.amIOwner(instances[0]) ? 'my-instances-list' : 'shared-instances-list'}
        style={styles.list}
      >
        <Subheader style={!InstancesStore.amIOwner(instances[0]) && styles.separator}>
          {subheaderText}
        </Subheader>
        {this.renderListItems(instances)}
      </List>
    );
  },

  renderDropdownIcon() {
    const styles = this.getStyles();
    const defaultIconBackground = ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    const { currentInstance } = this.state;
    const defaultIcon = ColumnList.ColumnListConstans.DEFAULT_ICON;
    const iconStyle = {
      backgroundColor: Color.getColorByName(currentInstance.metadata.color, 'dark') || defaultIconBackground,
      left: 0
    };
    const iconName = currentInstance.metadata.icon ? currentInstance.metadata.icon : defaultIcon;

    return (
      <div style={styles.dropdownIcon}>
        <FontIcon
          className={`synicon-${iconName}`}
          style={{ ...styles.dropdownInstanceIcon, ...iconStyle }}
        />
        <div
          style={styles.dropdownText}
          data-e2e={`current-instanceName-${currentInstance.name}`}
        >
          {currentInstance.name}
        </div>
        <FontIcon className="synicon-menu-down" />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { currentInstance, myInstances, sharedInstances } = this.state;
    const instancesList = myInstances.concat(sharedInstances);

    console.error(instancesList);

    if (!currentInstance || !instancesList.length) {
      return null;
    }

    return (
      <div
        style={styles.root}
        data-e2e="instances-dropdown"
      >
        <IconMenu
          ref="instancesDropdown"
          iconButtonElement={this.renderDropdownIcon()}
          style={styles.iconMenu}
          menuStyle={styles.dropdownMenu}
        >
          {this.renderList(myInstances)}
          {this.renderList(sharedInstances)}
        </IconMenu>
      </div>
    );
  }
}));

export default withRouter(HeaderInstancesDropdown);
