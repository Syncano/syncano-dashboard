import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    checkFolder: {},
    clearFilesToUpload: {},
    createFolder: {},
    fetch: {},
    finishUploading: {},
    moveDirectoryDown: {},
    moveDirectoryUp: {},
    setFilesToUpload: {},
    setHostingId: {},
    cancelUploading: {
      method: 'Syncano.Actions.Hosting.cancelUploading'
    },
    uploadFiles: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.uploadFiles'
    },
    fetchFiles: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
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
    withCheck: true
  }
);
