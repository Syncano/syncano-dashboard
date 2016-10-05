export default {
  list() {
    this.NewLibConnection
      .ApiKey
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .ApiKey
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.NewLibConnection
      .ApiKey
      .please()
      .update({ id }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(apiKeys) {
    apiKeys.map((apiKey) => {
      this.NewLibConnection
        .ApiKey
        .please()
        .delete({ id: apiKey.id })
        .then(this.completed)
        .catch(this.failure);
    });
  },

  reset(apiKeys) {
    const promises = apiKeys.map((apiKey) =>
      this.NewLibConnection
        .ApiKey
        .please()
        .reset({ id: apiKey.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
