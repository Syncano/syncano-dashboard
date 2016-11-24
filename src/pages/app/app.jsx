import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';
import localStorage from 'local-storage-fallback';
import { Breakpoint } from 'react-responsive-grid';

import SessionStore from '../../apps/Session/SessionStore';
import SessionActions from '../../apps/Session/SessionActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SnackbarNotification } from '../../apps';
import { SyncanoTheme } from '../../common/';
import AppMobileOnboarding from './AppMobileOnboarding';

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

  getStyles() {
    return {
      root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    };
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

  render() {
    const styles = this.getStyles();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(SyncanoTheme)}>
        <div style={styles.root}>
          <Helmet
            titleTemplate="%s - Syncano Dashboard"
            link={[{ rel: 'icon', type: 'image/png', href: 'img/favicon-32x32.png', sizes: '32x32' }]}
          />
          <Breakpoint
            maxWidth={768}
            widthMethod="pageWidth"
          >
            <AppMobileOnboarding />
          </Breakpoint>
          <Breakpoint
            minWidth={768}
            widthMethod="pageWidth"
            style={styles.content}
          >
            {this.props.children}
            <SnackbarNotification />
          </Breakpoint>
        </div>
      </MuiThemeProvider>
    );
  }
});

export default withRouter(App);
