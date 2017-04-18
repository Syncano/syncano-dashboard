import Reflux from 'reflux';
import Raven from '../../raven';
import _ from 'lodash';
import localStorage from 'local-storage-fallback';
import Cookies from 'js-cookie';

import Actions from './SessionActions';

import NewLibConnection from './NewLibConnection';
import Colors from 'material-ui/styles/colors';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.connection = NewLibConnection.get();
    this.token = localStorage.getItem('token') || null;
    this.user = null;
    this.instance = null;
    this.router = null;
    this.params = null;
    this.location = null;
    this.routes = null;
    this.theme = null;
    this.signUpMode = null;

    if (this.isAuthenticated() && !this.user) {
      Actions.fetchUser();
    }

    if (this.token !== null) {
      this.connection.setAccountKey(this.token);
    }
  },

  getConnection(empty) {
    return this.connection || empty || null;
  },

  getToken(empty) {
    return this.token || empty || null;
  },

  getUser(empty) {
    return this.user || empty || null;
  },

  getInstance(empty) {
    return this.instance || empty || null;
  },

  getRouter(empty) {
    return this.router || empty || null;
  },

  getParams(empty) {
    return this.params || empty || null;
  },

  getLocation(empty) {
    return this.location || empty || null;
  },

  getRoutes(empty) {
    return this.routes || empty || null;
  },

  getSignUpMode() {
    return this.signUpMode;
  },

  getTheme(empty) {
    return this.theme || empty || null;
  },

  getInvitationFromUrl() {
    return localStorage.getItem('invitationKey');
  },

  getUTMData() {
    return JSON.parse(localStorage.getItem('UTMData'));
  },

  setAnalyticsIdentifying(user) {
    const UTMData = this.getUTMData();
    const analyticsIdentifyObject = {
      'First name': user.first_name,
      'Last name': user.last_name,
      source: 'Sign up',
      email: user.email,
      is_active: user.is_active,
      authBackend: user.network || 'password'
    };

    if (!_.isUndefined(UTMData)) {
      _.extend(analyticsIdentifyObject, UTMData);
    }

    if (this.signUpMode) {
      window.analytics.identify(user.id, analyticsIdentifyObject);
    } else {
      window.analytics.identify(user.id);
    }
  },

  setToken(token) {
    this.token = token;
    this.connection.setAccountKey(token);
    localStorage.setItem('token', token);
    this.setLoggedInCookie();
    Actions.fetchUser();
  },

  setLoggedInCookie() {
    // cookie to detect on website if user is logged in
    Cookies.set('logged_in', 'true', {
      domain: APP_CONFIG.SYNCANO_BASE_DOMAIN,
      expires: 365
    });
  },

  setInvitationFromUrl(invitationKey) {
    localStorage.setItem('invitationKey', invitationKey);
  },

  setUser(user) {
    if (typeof user === 'undefined') {
      return;
    }

    this.user = user;

    if (typeof this.user.account_key === 'undefined') {
      this.user.account_key = this.token;
    } else {
      this.token = user.account_key;
      this.connection.setAccountKey(this.token);
      localStorage.setItem('token', this.token);
      this.setLoggedInCookie();
    }

    Raven.setUserContext({
      email: user.email,
      id: user.id
    });

    this.setAnalyticsIdentifying(user);
    this.trigger(this);
  },

  setUTMData(query) {
    const UTMData = {
      'UTM Campaign': query.utm_campaign,
      'UTM Content': query.utm_content,
      'UTM Medium': query.utm_medium,
      'UTM Source': query.utm_source,
      'UTM Term': query.utm_term
    };

    if (query.utm_campaign) {
      localStorage.setItem('UTMData', JSON.stringify(UTMData));
    }
  },

  setInstance(instance) {
    this.instance = instance;
    this.trigger(this);
  },

  setRouter(router) {
    this.router = router;
  },

  setParams(params) {
    this.params = params;
  },

  setLocation(location) {
    this.location = location;
  },

  setRoutes(routes) {
    this.routes = routes;
    this.trigger(this);
  },

  setSignUpMode() {
    this.signUpMode = true;
  },

  setTheme(theme) {
    this.theme = theme;
  },

  isFriendlyUser() {
    if (this.getUser()) {
      const email = this.getUser({}).email;
      const endings = ['syncano.io', 'syncano.com', 'chimeraprime.com'];

      return _.some(endings, (ending) => _.endsWith(email, ending));
    }

    return false;
  },

  onFetchInstanceCompleted(payload) {
    Actions.setInstance(payload);
  },

  onFetchUserCompleted(payload) {
    Actions.setUser(payload.data);
  },

  onFetchUserFailure() {
    this.onLogout();
  },

  removeInstance() {
    this.instance = null;
  },

  removeSignUpMode() {
    this.signUpMode = null;
  },

  makePalette(mainColor, accentColor) {
    return {
      primary1Color: Colors[`${mainColor}700`],
      primary2Color: Colors[`${mainColor}500`],
      primary3Color: Colors[`${mainColor}100`],
      accent1Color: Colors[`${accentColor}700`],
      accent2Color: Colors[`${accentColor}300`],
      accent3Color: Colors[`${accentColor}200`]
    };
  },

  onLogin(payload) {
    if (typeof payload === 'undefined' || typeof payload.account_key === 'undefined') {
      return;
    }

    this.token = payload.account_key;
    Actions.setUser(payload);
    localStorage.setItem('token', payload.account_key);
    this.connection.setAccountKey(payload.account_key);
    this.setLoggedInCookie();
  },

  onLogout() {
    this.token = null;
    this.user = null;
    this.removeInstance();
    this.connection.setAccountKey(null);

    localStorage.removeItem('lastInstanceName');
    localStorage.removeItem('lastPathname');
    localStorage.removeItem('token');
    localStorage.removeItem('invitationKey');
    Cookies.remove('logged_in', { domain: APP_CONFIG.SYNCANO_BASE_DOMAIN });

    Raven.setUserContext();
    window.analytics.identify();
    this.trigger(this);

    if (this.router) {
      this.router.push({ pathname: '/login', query: _.merge(this.location.query, { next: this.location.pathname }) });
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  },

  isReady() {
    return this.isAuthenticated() && this.user !== null;
  }
});
