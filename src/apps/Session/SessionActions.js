import CreateActions from '../../utils/ActionsConstructor.js';

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
    handleInvalidURL: {},
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
