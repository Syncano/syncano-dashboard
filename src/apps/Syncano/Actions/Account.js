import Hello from '../../Account/Hello';

export default {
  resendActivationEmail(email) {
    this.NewLibConnection
      .Account
      .resendEmail(email)
      .then(this.completed)
      .catch(this.failure);
  },

  activate(payload) {
    this.NewLibConnection
      .Account
      .activate(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignIn(payload) {
    this.NewLibConnection
      .Account
      .login(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignUp(payload) {
    this.NewLibConnection
      .Account
      .register(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordReset(email) {
    this.NewLibConnection
      .Account
      .resetPassword(email)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordResetConfirm(payload) {
    this.NewLibConnection
      .Account
      .confirmPasswordReset(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  socialLogin(network) {
    Hello
      .login(network)
      .then((auth) => {
        this.NewLibConnection
          .Account
          .socialLogin(auth.network === 'google' ? 'google-oauth2' : auth.network, auth.authResponse.access_token)
          .then((payload) => {
            payload.network = network;
            return payload;
          })
          .then(this.completed)
          .catch(this.failure);
      });
  }
};
