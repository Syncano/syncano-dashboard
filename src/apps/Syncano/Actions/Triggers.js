export default {
  create(payload) {
    this.NewLibConnection
      .Trigger
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  createWithScript(payload) {
    this.NewLibConnection
      .Script
      .please()
      .create(payload.script)
      .then((script) => this.NewLibConnection.Trigger.please().create({ ...payload, script: script.id }))
      .then(this.completed)
      .catch(this.failure);
  },

  get(id) {
    this.NewLibConnection
      .Trigger
      .please()
      .get({ id })
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Trigger
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.NewLibConnection
      .Trigger
      .please()
      .update({ id }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateWithScript(id, payload) {
    this.NewLibConnection
      .Script
      .please()
      .create(payload.script)
      .then((script) => this.NewLibConnection.Trigger.please().update({ id }, { ...payload, script: script.id }))
      .then(this.completed)
      .catch(this.failure);
  },

  remove(triggers) {
    const promises = triggers.map((trigger) => this.NewLibConnection.Trigger.please().delete({ id: trigger.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(triggerId) {
    this.NewLibConnection
      .TriggerTrace
      .please()
      .list({ triggerId })
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
