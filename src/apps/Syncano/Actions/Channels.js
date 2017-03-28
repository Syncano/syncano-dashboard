export default {
  list() {
    this.NewLibConnection
      .Channel
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
