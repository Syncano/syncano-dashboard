import _ from 'lodash';

export default {
  list() {
    this.NewLibConnection
      .User
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  subList(nextParams) {
    this.NewLibConnection
      .User
      .please()
      .list({}, nextParams)
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(userParams, groups) {
    const userGroups = groups.newGroups ? groups.newGroups : null;
    const userGroupsArray = _.isArray(userGroups) ? userGroups : [userGroups];

    if (userGroups) {
      this.NewLibConnection
        .User
        .please()
        .create(userParams)
        .then((user) => {
          const addUserToGroups = _.map(userGroupsArray, (group) =>
            this.NewLibConnection
              .Group
              .please()
              .addUser({ id: group.id }, { user: user.id }));

          this.Promise.all(addUserToGroups)
            .then(this.completed)
            .catch(this.failure);
        })
        .catch(this.failure);
    } else {
      this.NewLibConnection
        .User
        .please()
        .create(userParams)
        .then(this.completed)
        .catch(this.failure);
    }
  },

  update(id, payload, groups) {
    this.NewLibConnection
      .User
      .please()
      .update({ id }, payload)
      .then(() => {
        const groupsId = groups.groups.map((group) => group.id);
        const newGroupsId = groups.newGroups.map((group) => group.id);
        const addedGroups = _.difference(newGroupsId, groupsId);
        const removedGroups = _.difference(groupsId, newGroupsId);
        const addUserToGroups = _.map(addedGroups, (group) =>
          this.NewLibConnection
            .Group
            .please()
            .addUser({ id: group }, { user: id }));
        const removeUserFromGroups = _.map(removedGroups, (group) =>
          this.NewLibConnection
            .Group
            .please()
            .deleteUser({ id: group }, { user: id }));
        const promises = removeUserFromGroups.concat(addUserToGroups);

        this.Promise.all(promises)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  remove(users) {
    const promises = _.map(users, (user) => this.NewLibConnection.User.please().delete({ id: user.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
