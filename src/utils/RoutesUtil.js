import _ from 'lodash';
import Cookies from 'js-cookie';
import localStorage from 'local-storage-fallback';
import URI from 'urijs';

import auth from '../apps/Account/auth';
import NewLibConnection from '../apps/Session/NewLibConnection';

import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import AuthStore from '../apps/Account/AuthStore';

const RoutesUtil = {
  checkActiveSubscriptions(nextState, replace, callback) {
    const connection = NewLibConnection.get();
    const token = localStorage.getItem('token');

    if (token) {
      connection.setAccountKey(token);
    }

    return connection
      .Profile
      .please()
      .get()
      .then(({ status }) => {
        const redirectRoute = {
          no_active_subscription: '/expired/',
          free_limits_exceeded: '/free-limits-exceeded/',
          hard_limit_reached: '/hard-limits-reached/',
          overdue_invoices: '/failed-payment/'
        }[status];

        redirectRoute && replace(redirectRoute);
        callback();
      });
  },

  checkInstanceActiveSubscription(nextState, replace, callback) {
    const connection = NewLibConnection.get();
    const token = localStorage.getItem('token');
    const { instanceName } = nextState.params;

    if (token) {
      connection.setAccountKey(token);
    }

    if (instanceName) {
      let currentUserEmail;

      return connection
        .Account
        .getUserDetails()
        .then(({ email }) => {
          currentUserEmail = email;
        })
        .then(() => (
          connection
            .Instance
            .please()
            .get({ name: instanceName })
        ))
        .then(({ owner }) => {
          if (owner.email === currentUserEmail) {
            return RoutesUtil.checkActiveSubscriptions(nextState, replace, callback);
          }

          return callback();
        })
        .catch(console.error);
    }

    return callback();
  },

  isInstanceAvailable(instanceName) {
    const connection = NewLibConnection.get();

    return connection
      .Instance
      .please()
      .get({ name: instanceName });
  },

  onAppEnter(nextState, replace) {
    const uri = new URI();
    const originalUri = uri.normalize().toString();
    let pathname = decodeURIComponent(nextState.location.pathname).replace('//', '/');
    const query = _.extend({}, uri.search(true), nextState.location.query);

    if (Cookies.get('redirectMode')) {
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', Cookies.get('token'));
      }

      localStorage.removeItem('lastPathname');
      localStorage.removeItem('lastInstanceName');

      Cookies.remove('redirectMode', { domain: APP_CONFIG.SYNCANO_BASE_DOMAIN });
      Cookies.remove('token', { domain: APP_CONFIG.SYNCANO_BASE_DOMAIN });

      SessionActions.fetchUser();
    }

    SessionStore.setUTMData(nextState.location.query);

    // remove trailing slash
    if (pathname.length > 1 && pathname.match('/$') !== null) {
      pathname = pathname.slice(0, -1);
    }

    uri.search(query);
    uri.hash(`${pathname}${uri.search()}`);
    uri.search('');

    const normalizedUri = uri.normalize().toString();

    if (originalUri !== normalizedUri) {
      location.href = normalizedUri;
      return null;
    }

    let name = 'app';
    const names = nextState.routes.map((route) => route.name).filter((routeName) => typeof routeName !== 'undefined');

    if (names.length > 0) {
      name = names[names.length - 1];
    }

    if (name === 'login' || name === 'signup') {
      window.analytics.page(`Dashboard ${_.capitalize(name)}`, {
        path: nextState.location.pathname
      });
    } else {
      window.analytics.page('Dashboard', {
        Page: name,
        path: nextState.location.pathname,
        category: 'Dashboard',
        label: name
      });
    }

    if (nextState.location.query.invitation_key) {
      return AuthStore.acceptInvitationFromUrl();
    }

    if (auth.loggedIn() && nextState.location.pathname === '/' && !query.token) {
      return this.redirectToLastPathname(nextState, replace);
    }

    return null;
  },

  onDashboardChange(prevState, nextState, replace) {
    localStorage.setItem('lastPathname', nextState.location.pathname);

    if (nextState.location.pathname === '/') {
      this.redirectToLastInstance(nextState, replace);
    }
  },

  onDashboardEnter(nextState, replace) {
    const { signUpMode } = nextState.location.query;

    if (!signUpMode) {
      this.redirectToSyn4Instance(nextState);
    }

    if (!auth.loggedIn() && !signUpMode) {
      return this.redirectToLogin(nextState, replace);
    }

    return null;
  },

  redirectToDashboard(nextState, replace) {
    if (auth.loggedIn()) {
      replace({ pathname: '/' });
    }
  },

  redirectToLastInstance(nextState, replace) {
    const lastInstanceName = localStorage.getItem('lastInstanceName');

    if (lastInstanceName) {
      this.isInstanceAvailable(lastInstanceName).then(() => replace({
        pathname: `/instances/${lastInstanceName}/my-sockets/`
      }));
    }
  },

  redirectToLastPathname(nextState, replace) {
    const lastPathname = localStorage.getItem('lastPathname');

    if (lastPathname && lastPathname !== '/') {
      return replace({ pathname: lastPathname });
    }

    return null;
  },

  redirectToLogin(nextState, replace) {
    const query = _.omit(nextState.location.query, 'next');

    if (nextState.location.query.next) {
      return replace({
        name: 'login',
        state: { nextPathname: nextState.location.pathname },
        query: _.merge({ next: nextState.location.pathname }, query)
      });
    }

    Cookies.remove('logged_in', { domain: APP_CONFIG.SYNCANO_BASE_DOMAIN });

    return replace({ name: 'login', query: _.merge({ next: nextState.location.pathname }, query) });
  },

  redirectToSyn4Instance(nextState) {
    const lastInstanceName = nextState.params.instanceName;

    return this.isInstanceAvailable(lastInstanceName)
      .then((instance = {}) => {
        const instanceCreatedAt = Date.parse(instance.created_at);
        const releaseDate = Number(APP_CONFIG.SYNCANO5_RELEASE_DATE);

        if (instanceCreatedAt < releaseDate && !instance.metadata.testInstance) {
          Cookies.set('token', localStorage.getItem('token'), {
            domain: APP_CONFIG.SYNCANO_BASE_DOMAIN,
            expires: 365
          });
          Cookies.set('redirectMode', true, {
            domain: APP_CONFIG.SYNCANO_BASE_DOMAIN,
            expires: 365
          });
          window.location = `${APP_CONFIG.SYNCANO_OLD_DASHBOARD}/#/instances/${instance.name}`;
        }
      });
  },

  onInstanceEnter(nextState, replace, cb) {
    this.checkInstanceActiveSubscription(nextState, replace, cb);
    this.redirectToSyn4Instance(nextState);
  }
};

export default RoutesUtil;
