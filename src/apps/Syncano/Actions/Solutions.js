export default {
  get(id) {
    this.NewLibConnection
      .Solution
      .please()
      .get({ id })
      .then(this.completed)
      .catch(this.failure);
  },
  listVersions(id) {
    this.NewLibConnection
      .Solution
      .please()
      .getVersions({ id })
      .then(this.completed)
      .catch(this.failure);
  },
  createVersion(id, payload) {
    this.NewLibConnection
      .Solution
      .please()
      .createVersion({ id }, payload)
      .then(this.completed)
      .catch(this.failure);
  },
  install(payload) {
    this.NewLibConnection
      .Solution
      .please()
      .installVersion({ id: payload.solutionId, version_id: payload.versionId }, { instance: payload.instanceName })
      .then(this.completed)
      .catch(this.failure);
  },
  remove(id) {
    this.NewLibConnection
      .Solution
      .please()
      .delete({ id })
      .then(this.completed)
      .catch(this.failure);
  },
  list(payload) {
    this.NewLibConnection
      .Solution
      .please()
      .list({}, payload)
      .then(this.completed)
      .catch(this.failure);
  },
  create(payload) {
    this.NewLibConnection
      .Solution
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },
  update(id, payload) {
    this.NewLibConnection
      .Solution
      .please()
      .update({ id }, payload)
      .then(this.completed)
      .catch(this.failure);
  },
  star(id) {
    this.NewLibConnection
      .Solution
      .please()
      .unstar({ id })
      .then(this.completed)
      .catch(this.failure);
  },
  unstar(id) {
    this.NewLibConnection
      .Solution
      .please()
      .unstar({ id })
      .then(this.completed)
      .catch(this.failure);
  },
  listTags() {
    const { baseUrl } = this.NewLibConnection;

    this.Promise.get(`${baseUrl}/v1.1/marketplace/tags/`)
      .then(this.completed)
      .catch(this.failure);
  }
};
