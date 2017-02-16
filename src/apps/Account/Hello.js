import hello from 'hellojs';

const credentials = {};
const options = {};

credentials.facebook = APP_CONFIG.FACEBOOK_ID;
credentials.google = APP_CONFIG.GOOGLE_ID;
credentials.github = APP_CONFIG.GITHUB_ID;

options.redirect_uri = `${location.protocol}//${location.host}`;
options.scope = 'email';

hello.init(credentials, options);

export default hello;
