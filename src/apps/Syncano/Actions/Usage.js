export default {
  listTotalDailyUsage(instanceName) {
    const params = instanceName !== 'all' ? { instance: instanceName } : { total: true };

    this.NewLibConnection
      .DailyUsage
      .please()
      .list({}, params)
      .currentMonth()
      .then(this.completed)
      .catch(this.failure);
  }
};
