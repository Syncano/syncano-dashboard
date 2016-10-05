export default {
  listFullBackups() {
    this.NewLibConnection
      .FullBackup
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  listAllFullBackups() {
    this.NewLibConnection
      .FullBackup
      .please()
      .listAll()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  createFullBackup(params) {
    this.NewLibConnection
      .FullBackup
      .please()
      .create(params)
      .then(this.completed)
      .catch(this.failure);
  },

  removeFullBackups(backups) {
    const promises = backups.map((backup) =>
      this.NewLibConnection
        .FullBackup
        .please()
        .delete({ id: backup.id })
    );

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  restoreFromBackup(backup) {
    this.NewLibConnection
      .Restore
      .please()
      .restore({}, { backup: backup.id })
      .then(this.completed)
      .catch(this.failure);
  },

  restoreFromFile(backupFile) {
    this.NewLibConnection
      .Restore
      .please()
      .restore({}, { archive: this.NewLibConnection.file(backupFile) })
      .then(this.completed)
      .catch(this.failure);
  }
};
