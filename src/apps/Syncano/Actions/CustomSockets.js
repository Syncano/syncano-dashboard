
export default {
  create(payload) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .CustomSocket
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .update({ name }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(customSockets) {
    const promises = customSockets.map((customSocket) =>
      this.NewLibConnection
      .CustomSocket
      .please()
      .delete({ name: customSocket.name })
      );

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },
  listScriptEndpoints() {
    this.NewLibConnection
      .ScriptEndpoint
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
