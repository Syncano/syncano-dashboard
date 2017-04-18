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
  }
};
