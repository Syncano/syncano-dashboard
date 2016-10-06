import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setHostingId: {},
    checkFolder: {},
    uploadFiles: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.uploadFiles'
    },
    fetchFiles: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.listFiles'
    },
    removeHostingFiles: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.removeFiles'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
