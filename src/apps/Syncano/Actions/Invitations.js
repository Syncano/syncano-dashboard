export default {
  list() {
    this.NewLibConnection
      .InstanceInvitation
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .InstanceInvitation
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(invitations) {
    const promises = invitations.map((invitation) =>
      this.NewLibConnection
        .InstanceInvitation
        .please()
        .delete({ id: invitation.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  resend(invitations) {
    const promises = invitations.map((invitation) =>
      this.NewLibConnection
        .InstanceInvitation
        .please()
        .resend({ id: invitation.id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
