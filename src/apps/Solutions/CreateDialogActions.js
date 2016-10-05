import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setSolutions: {},
    setFilter: {},
    setTags: {},
    toggleTagSelection: {},
    selectOneTag: {},

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
  },
  {
    withDialog: true
  }
);
