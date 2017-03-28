export default {
  list() {
    this.NewLibConnection
      .Class
      .please()
      .list()
      .ordering('desc')
      .then((classes) => {
        const classesList = classes.filter((item) => item.name !== 'user_profile');

        this.completed(classesList);
      })
      .catch(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .Class
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .Class
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.NewLibConnection
      .Class
      .please()
      .update({ name }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(classes) {
    const promises = classes.map((item) => this.NewLibConnection.Class.please().delete({ name: item.name }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
