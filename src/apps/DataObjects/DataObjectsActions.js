import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    checkToggleColumn: {},
    fetch: {},
    setDataObjects: {},
    setCurrentClassObj: {},
    setSelectedRows: {},
    getIDsFromTable: {},
    clearStore: {},
    goToPage: {},
    selectSorting: {},
    fetchCurrentClassObj: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.getClass'
    },
    getDataObjectsCount: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.getCount'
    },
    fetchDataObjects: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.list'
    },
    getDataObject: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.get'
    },
    createDataObject: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.create'
    },
    updateDataObject: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.update'
    },
    removeDataObjects: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
