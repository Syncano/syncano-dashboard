import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    checkToggleColumn: {},
    clearStore: {},
    fetch: {},
    getIDsFromTable: {},
    goToPage: {},
    selectSorting: {},
    setCurrentClassObj: {},
    setDataObjects: {},
    setSelectedRows: {},
    createDataObject: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.create'
    },
    fetchCurrentClassObj: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.getClass'
    },
    fetchDataObjects: {
      asyncResult: true,
      children: ['completed', 'failure'],
      loading: true,
      method: 'Syncano.Actions.DataObjects.list'
    },
    getDataObject: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.get'
    },
    getDataObjectsCount: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.getCount'
    },
    removeDataObjects: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.remove'
    },
    updateDataObject: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.update'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
