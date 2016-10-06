import React from 'react';
import Reflux from 'reflux';

import { DialogsMixin } from '../../mixins';

import Actions from './DemoAppsActions';
import Store from './DemoAppsStore';
import SessionStore from '../Session/SessionStore';

import DemoAppsList from './DemoAppsList';
import { Dialog } from '../../common';

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

  initDialogs() {
    const { clickedAppName, isLoading } = this.state;
    const email = SessionStore.getUser() ? SessionStore.getUser().email : null;
    const params = {
      email,
      instanceName: clickedAppName
    };

    return [{
      dialog: Dialog.FullPage,
      params: {
        key: 'installDemoAppDialog',
        ref: 'installDemoAppDialog',
        contentSize: 'small',
        title: `Install ${clickedAppName} Demo App`,
        onRequestClose: () => this.handleCancel('installDemoAppDialog'),
        isLoading,
        actions: (
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={() => this.handleCancel('installDemoAppDialog')}
            handleConfirm={() => Actions.installDemoApp(params)}
          />
        ),
        children: (
          <div>
            This action will install {clickedAppName} Demo App. You will be redirected to new Instance.
          </div>
        )
      }
    }];
  },

  render() {
    const { isLoading, items } = this.state;
    const styles = this.getStyles();

    return (
      <div
        style={styles.container}
        className="vm-3-t align-center"
      >
        {this.getDialogs()}
        <div style={styles.title}>
          Syncano DEMO Apps
        </div>
        <div style={styles.subTitle}>
          Demo Apps allow you to get more detailed knowledge about Syncano functionalities and see how they can be used.
        </div>
        <DemoAppsList
          handleClickInstall={() => this.showDialog('installDemoAppDialog')}
          isLoading={isLoading}
          items={items}
        />
      </div>
    );
  }
});
