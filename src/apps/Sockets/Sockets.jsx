import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { colors as Colors } from 'material-ui/styles/';

import ScriptsActions from '../Scripts/ScriptsActions';
import Actions from './SocketsActions';
import Store from './SocketsStore';
import SessionStore from '../Session/SessionStore';

import { DialogsMixin } from '../../mixins';

import { RaisedButton } from 'material-ui';
import { Container, Loading, Show, Dialog, PageIntro } from '../../common/';

import DataEndpoints from '../DataEndpoints';
import Channels from '../Channels';
import CustomSocketsRegistry from '../CustomSocketsRegistry';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import ScriptEndpoints from '../ScriptEndpoints';
import EmptyView from './EmptyView';
import SocketsDialog from './SocketsDialog';
import SocketsLists from './SocketsList';
import SocketsInnerToolbar from './SocketsInnerToolbar';
import PushNotifications from '../PushNotifications';

const Sockets = React.createClass({
  mixins: [
    Reflux.connect(Store, 'sockets'),
    DialogsMixin
  ],

  componentDidMount() {
    Actions.addSocketsListeners();
    Actions.fetch();
    ScriptsActions.fetch();

    const { prolongDialog } = this.refs;
    const { showProlongDialog } = this.props.location.query;

    if (prolongDialog && _.isBoolean(showProlongDialog) && showProlongDialog) {
      prolongDialog.show();
    }
  },

  componentWillUpdate(nextProps) {
    if (this.props.params.instanceName !== nextProps.params.instanceName) {
      ScriptsActions.fetch();
    }
  },

  componentWillUnmount() {
    Actions.clearSockets();
    Actions.removeSocketsListeners();
  },

  getPushNotificationItems() {
    const { sockets } = this.state;
    const APNSItems = _.filter(sockets.gcmPushNotifications, 'hasConfig');
    const GCMItems = _.filter(sockets.apnsPushNotifications, 'hasConfig');

    return APNSItems.concat(GCMItems);
  },

  handlePushSocketTitleClick() {
    const { router, params } = this.props;

    router.push(`instances/${params.instanceName}/push-notifications/config/`);
  },

  initDialogs() {
    const { instanceName } = this.props.params;

    return [{
      dialog: Dialog.Delete,
      params: {
        icon: 'synicon-thumb-up-outline',
        iconColor: Colors.green400,
        key: 'prolongDialog',
        ref: 'prolongDialog',
        title: 'Your instance has been reactivated.',
        children: (
          <div>
            {`You have successfully reactivated your instance <strong>${instanceName}</strong>. This means, we won't
            deactivate or delete it anytime soon while you will be active.`}
          </div>
        ),
        actions: (
          <RaisedButton
            key="cancel"
            onTouchTap={() => this.handleCancel('prolongDialog')}
            primary={true}
            label="Close"
            ref="cancel"
          />
        )
      }
    }];
  },

  renderLists() {
    const { sockets } = this.state;
    const { isPageIntroVisible, hidePageIntro } = this.props;

    if (!sockets.hasAnyItem && !sockets.isLoading) {
      return (
        <div data-e2e="empty-sockets-heading">
          <PageIntro
            headline="Welcome to Syncano"
            text={
              <div>
                <p>
                  Syncano is a platform for developing powerful apps. Piece together backend features as building blocks
                  {' using Syncano Sockets. Check out our '}
                  <a
                    href="http://docs.syncano.io/docs/getting-started-with-syncano/"
                    target="_blank"
                  >
                    Quick Start Guide
                  </a>
                  {' to learn more.'}
                </p>
                <p className="vp-1-t">Start building your app with the Sockets below!</p>
              </div>
            }
            show={isPageIntroVisible}
            onRequestClose={hidePageIntro}
          />
          <EmptyView />
        </div>
      );
    }

    const user = SessionStore.getUser();
    const userFirstName = user && user.first_name;
    let headline = 'Welcome back!';

    if (userFirstName) {
      headline = `Hey ${userFirstName}, welcome back!`;
    }

    return (
      <div style={{ clear: 'both', height: '100%' }}>
        <Loading show={sockets.isLoading}>
          <PageIntro
            headline={headline}
            text={
              <p>Piece together backend features as building blocks using Syncano Sockets.</p>
            }
            actions={
              <RaisedButton
                primary={true}
                label="Add a Socket"
                onTouchTap={Actions.showDialog}
              />
            }
            show={isPageIntroVisible}
            onRequestClose={hidePageIntro}
          />
          <SocketsLists sockets={sockets} />
          <Show if={this.getPushNotificationItems().length}>
            <PushNotifications.List
              name="Push Notification Sockets"
              handleTitleClick={this.handlePushSocketTitleClick}
              items={this.getPushNotificationItems()}
            />
          </Show>
        </Loading>
      </div>
    );
  },

  render() {
    const { sockets } = this.state;

    return (
      <div>
        <Helmet title="Sockets" />
        <CustomSocketsRegistry.Dialog />
        <SocketsDialog />
        <ScriptEndpoints.Dialog />
        <DataEndpoints.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />
        <Channels.SendMessageDialog />
        <PushNotifications.APNSConfigDialog />
        <PushNotifications.SummaryDialog />
        <PushNotifications.GCMConfigDialog />
        <PushNotifications.GCMSummaryDialog />

        {this.getDialogs()}

        <SocketsInnerToolbar empty={!sockets.hasAnyItem || sockets.isLoading}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
            data-e2e="sockets-toolbar-add-button"
          />
        </SocketsInnerToolbar>
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});

export default PageIntro.HOC(Sockets, 'socketsPageIntro');
