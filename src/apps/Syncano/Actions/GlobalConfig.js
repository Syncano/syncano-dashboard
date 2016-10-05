export default {
  get() {
    const name = this.NewLibConnection.getInstanceName();

    this.NewLibConnection
      .Instance
      .please()
      .getGlobalConfig({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  update(config) {
    const name = this.NewLibConnection.getInstanceName();

    this.NewLibConnection
      .Instance
      .please()
      .setGlobalConfig({ name }, config)
      .then(this.completed)
      .catch(this.failure);
  }
};
