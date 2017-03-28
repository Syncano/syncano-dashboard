export default {
  list() {
    this.NewLibConnection
      .Class
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .Class
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  }
};
