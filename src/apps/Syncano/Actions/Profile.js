export default {
  updateSettings(payload) {
    this.NewLibConnection
      .Account
      .update(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  changePassword(payload) {
    this.NewLibConnection
      .Account
      .changePassword({
        current_password: payload.current_password,
        new_password: payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  setPassword(password) {
    this.NewLibConnection
      .Account
      .setPassword({ password })
      .then(this.completed)
      .catch(this.failure);
  },

  getUser() {
    const { baseUrl, accountKey } = this.NewLibConnection;

    this.Promise
      .get(`${baseUrl}/v1.1/account/`, { params: { api_key: accountKey } })
      .then(this.completed)
      .catch(this.failure);
  },

  resetKey() {
    this.NewLibConnection
      .Account
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  }
};
