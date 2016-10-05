import _ from 'lodash';

export default {
  create(label) {
    this.NewLibConnection
      .Group
      .please()
      .create({ label })
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Group
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, label) {
    this.NewLibConnection
      .Group
      .please()
      .update({ id }, { label })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(groups) {
    const promises = _.map(groups, (group) => this.NewLibConnection.Group.please().delete({ id: group.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
