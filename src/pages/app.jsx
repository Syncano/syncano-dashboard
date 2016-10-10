import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';
import localStorage from 'local-storage-fallback';

import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SnackbarNotification } from './../apps';
import { SyncanoTheme } from '../common/';

const App = React.createClass({
  childContextTypes: {
    location: PropTypes.object,
    params: PropTypes.object,
    routes: PropTypes.array
  },

  getChildContext() {
    return {
      location: this.props.location,
      params: this.props.params,
      routes: this.props.routes
    };
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
    SessionStore.setRouter(this.props.router);
    SessionStore.setLocation(this.props.location);
    SessionStore.setParams(this.props.params);
    SessionStore.setRoutes(this.props.routes);
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(SyncanoTheme)}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '100%' }}>
          <Helmet
            titleTemplate="%s - Syncano Dashboard"
            link={[{ rel: 'icon', type: 'image/png', href: 'img/favicon-32x32.png', sizes: '32x32' }]}
          />
          {this.props.children}
          <SnackbarNotification />
        </div>
      </MuiThemeProvider>
    );
  }
});

export default withRouter(App);
