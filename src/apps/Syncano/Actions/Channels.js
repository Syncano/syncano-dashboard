export default {
  list() {
    this.NewLibConnection
      .Channel
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .Channel
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, params) {
    this.NewLibConnection
      .Channel
      .please()
      .update({ name }, params)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(channels) {
    const promises = channels.map((channel) => this.NewLibConnection.Channel.please().delete({ name: channel.name }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .Channel
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  getHistory(name) {
    this.NewLibConnection
      .Channel
      .please()
      .history({ name })
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  publish(name, content, room = null) {
    this.NewLibConnection
      .Channel
      .please()
      .publish({ name }, content, room)
      .then(this.completed)
      .catch(this.failure);
  },

  poll(name, room = null) {
    const poll = this.NewLibConnection.Channel.please().poll({ name }, { room }, false);

    poll.on('start', () => this.completed(poll));

    poll.on('message', (message) => this.completed(poll, message));

    poll.on('error', (error) => this.failure(error));

    poll.start();
  }
};
