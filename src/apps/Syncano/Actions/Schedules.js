export default {
  create(payload) {
    this.NewLibConnection
      .Schedule
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
      .then((script) => this.NewLibConnection.Schedule.please().create({ ...payload, script: script.id }))
      .then(this.completed)
      .catch(this.failure);
  },

  get(scheduleId) {
    this.NewLibConnection
      .Schedule
      .please()
      .get({ id: scheduleId })
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Schedule
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.NewLibConnection
      .Schedule
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
      .then((script) => this.NewLibConnection.Schedule.please().update({ id }, { ...payload, script: script.id }))
      .then(this.completed)
      .catch(this.failure);
  },

  remove(schedules) {
    const promises = schedules.map((schedule) => this.NewLibConnection.Schedule.please().delete({ id: schedule.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(scheduleId) {
    this.NewLibConnection
      .ScheduleTrace
      .please()
      .list({ scheduleId })
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
