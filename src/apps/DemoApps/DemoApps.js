import React from 'react';
import Reflux from 'reflux';

import { DialogsMixin } from '../../mixins';

import Store from './DemoAppsStore';
import Actions from './DemoAppsActions';

import DemoAppsList from './DemoAppsList';

export default React.createClass({
  displayName: 'DemoApps',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      title: {
        marginTop: 20,
        fontWeight: 500,
        fontSize: 32
      },
      subTitle: {
        marginTop: 30,
        color: '#999'
      }
    };
  },

  render() {
    const { isLoading, items } = this.state;
    const styles = this.getStyles();

    return (
      <div
        style={styles.container}
        className="vm-3-t align-center"
      >
        <div style={styles.title}>
          Syncano Demo Apps
        </div>
        <div style={styles.subTitle}>
          Demo Apps allow you to get more detailed knowledge about Syncano functionalities and see how they can be used.
        </div>
        <DemoAppsList
          isLoading={isLoading}
          items={items}
        />
      </div>
    );
  }
});
