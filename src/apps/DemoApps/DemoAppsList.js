import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { Loading } from '../../common';

import ListItem from './DemoAppListItem';
import InstallDetailsDialog from './DemoAppsIntallationDetailsDialog';

class DemoAppsList extends Component {
  getStyles = () => ({
    container: {
      margin: 100
    },
    list: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  })

  handleRedirectToDemoApp(item) {
    const { router } = this.props;

    router.push(`/demo-apps/${item.name}`);
  }

  renderItems() {
    const { items } = this.props;

    return _.map(items, (item) => (
      <ListItem
        handleOpenDemoApp={() => this.handleRedirectToDemoApp(item)}
        key={item.name}
        item={item}
      />
    ));
  }

  render() {
    const styles = this.getStyles();
    const { isLoading } = this.props;

    return (
      <div style={styles.container}>
        <InstallDetailsDialog />
        <Loading show={isLoading}>
          <div style={styles.list}>
            {this.renderItems()}
          </div>
        </Loading>
      </div>
    );
  }
}

export default withRouter(DemoAppsList);

