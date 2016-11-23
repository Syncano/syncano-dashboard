import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';
import localStorage from 'local-storage-fallback';
import { Breakpoint } from 'react-responsive-grid';

import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';

import { RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SnackbarNotification } from './../apps';
import { SyncanoTheme, MobileOnboarding } from '../common/';

const App = React.createClass({
  childContextTypes: {
    location: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array
  },

  getChildContext() {
    const { location, params, routes } = this.props;

    return { location, params, routes };
  },

  componentWillMount() {
    this.handleTokenSave();
    this.handleRouterSetup();
  },

  componentWillUpdate() {
    if (_.isUndefined(this.props.params.instanceName)) {
      SessionStore.removeInstance();
    }
  },

  componentDidUpdate() {
    this.handleRouterSetup();
  },

  handleTokenSave() {
    const { token, signUpMode } = this.props.location.query;

    if (token) {
      signUpMode && SessionStore.setSignUpMode();
      localStorage.setItem('token', token);
      SessionStore.setToken(token);
      SessionActions.setToken(token);
    }
  },

  handleRouterSetup() {
    const { router, location, params, routes } = this.props;

    SessionStore.setRouter(router);
    SessionStore.setLocation(location);
    SessionStore.setParams(params);
    SessionStore.setRoutes(routes);
  },

  renderContent() {
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    };

    return (
      <Breakpoint
        minWidth={768}
        widthMethod="componentWidth"
        style={styles}
      >
        {this.props.children}
        <SnackbarNotification />
      </Breakpoint>
    );
  },

  renderMobileOnboarding() {
    return (
      <Breakpoint
        maxWidth={767}
        widthMethod="componentWidth"
      >
        <MobileOnboarding>
          <MobileOnboarding.Slide
            headline="Welcome to Syncano"
            text={
              <div>
                <p className="vm-4-b">
                  Unfortunately, the Syncano Dashboard is not optimized for smartphones just yet. You’ll have to
                  open it on a tablet or computer.
                </p>
                <p>For now, we’d like to show you some of the things you’ll be able to do here!</p>
              </div>
            }
            imageSrc={'/img/illustrations/build-powerful-apps-in-half-the-time.svg'}
          />
          <MobileOnboarding.Slide
            headline="What is Syncano?"
            text={
              <p>
                Syncano is a platform designed to help you increase your productivity, focus on new features, and
                scale without managing servers.
              </p>
            }
          >
            <img
              src={'/img/illustrations/what-is-syncano.png'}
              alt="What is Syncano?"
              style={{ display: 'block', width: '100vw', margin: '0 -30px' }}
            />
          </MobileOnboarding.Slide>
          <MobileOnboarding.Slide
            headline="Sockets"
            text={
              <p>
                Simplify your stack. Piece together one or multiple features as building blocks for your app. Use
                Syncano Sockets as a data hub and easily connect disparate backend systems.
              </p>
            }
            imageSrc={'/img/illustrations/assemble-your-backend-with-building-blocks.svg'}
          />
          <MobileOnboarding.Slide headline="Join the Community">
            <img
              src={'/img/illustrations/syncano-slack.svg'}
              alt="Join the Community"
              style={{ display: 'block', margin: '0 auto' }}
            />
            <a
              href="https://www.syncano.io/slack-invite/"
              target="_blank"
            >
              <RaisedButton
                label="Send an Invite"
                backgroundColor="#FFCC01"
                labelColor="#1D2228"
                labelStyle={{ fontWeight: 700 }}
                style={{ marginTop: 30 }}
              />
            </a>
            <div style={{ marginTop: 50, fontSize: 20, fontWeight: 500, color: '#244273' }}>
              Connect with us
            </div>
            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://twitter.com/Syncano/"
                target="_blank"
                style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
              >
                <span className="synicon-twitter" />
              </a>
              <a
                href="https://www.facebook.com/syncano/"
                target="_blank"
                style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
              >
                <span className="synicon-facebook-box" />
              </a>
            </div>
          </MobileOnboarding.Slide>
        </MobileOnboarding>
      </Breakpoint>
    );
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(SyncanoTheme)}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '100%' }}>
          <Helmet
            titleTemplate="%s - Syncano Dashboard"
            link={[{ rel: 'icon', type: 'image/png', href: 'img/favicon-32x32.png', sizes: '32x32' }]}
          />
          {this.renderContent()}
          {this.renderMobileOnboarding()}
        </div>
      </MuiThemeProvider>
    );
  }
});

export default withRouter(App);
