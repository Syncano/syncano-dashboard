export default {
  get(name) {
    return this.apiV2Request().get(`/sockets/${name}/`)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    return this.apiV2Request().get('/sockets/')
      .then(this.completed)
      .catch(this.failure);
  },

  listSocketEndpoints(name) {
    return this.apiV2Request().get(`/endpoints/sockets/${name}/`)
      .then(this.completed)
      .catch(this.failure);
  }
};
