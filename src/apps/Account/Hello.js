import hello from 'hellojs';

const credentials = {};
const options = {};

credentials.facebook = FACEBOOK_ID;
credentials.google = GOOGLE_ID;
credentials.github = GITHUB_ID;

options.redirect_uri = `${location.protocol}//${location.host}`;
options.scope = 'email';

hello.init(credentials, options);

export default hello;
