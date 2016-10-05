import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  showDialog: {},
  dismissDialog: {},

  fetch: {},
  setTags: {},
  setSolution: {},
  setSolutionVersions: {},

  fetchSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.get'
  },
  fetchSolutionVersions: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.listVersions'
  },
  fetchSolutions: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.list'
  },
  createSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.create'
  },
  installSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.install'
  },
  createVersion: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.createVersion'
  },
  removeSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.remove'
  },
  updateSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.update'
  },
  starSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.star'
  },
  unstarSolution: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.unstar'
  },
  fetchTags: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.listTags'
  }
});
