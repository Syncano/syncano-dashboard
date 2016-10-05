export default {
  list() {
    this.NewLibConnection
      .Admin
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.NewLibConnection
      .Admin
      .please()
      .update({ id }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(admins) {
    const promises = admins.map((admin) => this.NewLibConnection.Admin.please().delete({ id: admin.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
