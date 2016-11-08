import Reflux from 'reflux';
import _ from 'lodash';

import {
  CheckListStoreMixin,
  StoreFormMixin,
  StoreLoadingMixin,
  WaitForStoreMixin,
  SnackbarNotificationMixin
} from '../../mixins';

import Actions from './HostingFilesActions';
import HostingUploadDialogActions from './HostingUploadDialogActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreFormMixin,
    StoreLoadingMixin,
    WaitForStoreMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      currentFolderName: '',
      directoryDepth: 0,
      errorResponses: [],
      filesToUpload: [],
      isCanceled: false,
      isLoading: true,
      isUploading: false,
      isDeleting: false,
      items: [],
      previousFolders: [],
      showNewFolderForm: false,
      name: ''
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      Actions.setHostingId,
      this.refreshData
    );
    this.setLoadingStates();
  },

  sendHostingAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.label,
      socket: 'hosting'
    });
  },

  onCheckFolder(folder) {
    const { items } = this.data;
    const folderToCheck = _.find(items, { id: folder.id });
    const isChecked = folder.checked;

    _.forEach(folderToCheck.files, (file) => {
      file.checked = !isChecked;
    });
    this.trigger(this.data);
  },

  refreshData() {
    const { currentHostingId } = this.data;

    currentHostingId && Actions.fetchFiles(currentHostingId);
  },

  onSetHostingId(hostingId) {
    this.data.currentHostingId = hostingId;
  },

  handleCloseOnUpload(event) {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to close?';
  },

  onUploadFiles() {
    window.addEventListener('beforeunload', this.handleCloseOnUpload);
  },

  onUploadFilesCompleted(uploadingStatus) {
    if (uploadingStatus.isFinished) {
      this.data.filesToUpload = [];
      this.data.isUploading = false;
      this.refreshData();
      if (!this.data.errorResponses.length) {
        HostingUploadDialogActions.dismissDialog();
        this.setSnackbarNotification({
          message: uploadingStatus.isCanceled ? 'Your uploading process has been canceled.' :
            'Your files have been successfully uploaded.',
          autoHideDuration: null,
          onActionTouchTap: this.dismissSnackbarNotification,
          action: 'DISMISS'
        });
      }
    }
    this.data.isUploading = !uploadingStatus.isFinished;
    this.data.currentFileIndex = uploadingStatus.currentFileIndex;
    this.data.lastFileIndex = uploadingStatus.lastFileIndex;
    uploadingStatus.isFinished && removeEventListener('beforeunload', this.handleCloseOnUpload);
    this.trigger(this.data);
  },

  onUploadFilesFailure(uploadingStatus, response) {
    this.data.errorResponses = [...this.data.errorResponses, response];
    this.data.currentFileIndex = uploadingStatus.currentFileIndex;
    this.data.lastFileIndex = uploadingStatus.lastFileIndex;
    uploadingStatus.isFinished && removeEventListener('beforeunload', this.handleCloseOnUpload);
    this.trigger(this.data);
  },

  onFetchFilesCompleted(data) {
    this.data.items = data.files;
    this.data.hostingDetails = data.hostingDetails;
    this.trigger(this.data);
  },

  onRemoveHostingFilesCompleted(deletingStatus) {
    if (deletingStatus.isFinished) {
      this.data.isDeleting = false;
      this.refreshData();
    }
    this.data.isDeleting = !deletingStatus.isFinished;
    this.data.currentFileIndex = deletingStatus.currentFileIndex;
    this.data.lastFileIndex = deletingStatus.lastFileIndex;
    this.trigger(this.data);
  },

  onSetFilesToUpload(filesToUpload) {
    this.data.filesToUpload = filesToUpload;
    this.data.isCanceled = false;
    this.trigger(this.data);
  },

  onClearFilesToUpload() {
    this.data.filesToUpload = [];
    this.trigger(this.data);
  },

  onFinishUploading() {
    HostingUploadDialogActions.dismissDialog();
    this.data.filesToUpload = [];
    this.data.errorResponses = [];
    this.data.isUploading = false;
    this.refreshData();
  },

  onCreateFolder(name) {
    this.data.currentFolderName = name;
    this.data.directoryDepth = this.data.directoryDepth + 1;
    this.data.previousFolders = [...this.data.previousFolders, name];
    this.data.showNewFolderForm = false;
    this.data.name = '';
    this.trigger(this.data);
  },

  onMoveDirectoryUp(depth) {
    const depthLevel = _.isFinite(depth) ? depth : 1;

    this.data.directoryDepth = this.data.directoryDepth - depthLevel;
    this.data.currentFolderName = this.data.previousFolders[this.data.directoryDepth - 1] || '';
    this.data.previousFolders = _.dropRight(this.data.previousFolders, depthLevel);
    this.trigger(this.data);
  },

  onMoveDirectoryDown(nextFolderName) {
    this.data.directoryDepth = this.data.directoryDepth + 1;
    this.data.currentFolderName = nextFolderName;
    this.data.previousFolders = [...this.data.previousFolders, nextFolderName];
    this.trigger(this.data);
  }
});
