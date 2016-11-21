import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    login: {},
    logout: {},
    setToken: {},
    setUser: {},
    setTheme: {},
    setInstance: {},
    setInvitationFromUrl: {},
    getInvitationFromUrl: {},
    fetchUser: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Profile.getUser'
    },
    fetchInstance: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.set'
    }
  }
);
