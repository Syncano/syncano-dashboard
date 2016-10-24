import Reflux from 'reflux';
import _ from 'lodash';

import { CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin, SnackbarNotificationMixin } from '../../mixins';

import Actions from './HostingFilesActions';
import HostingUploadDialogActions from './HostingUploadDialogActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      errorResponses: [],
      filesToUpload: [],
      isLoading: true,
      isUploading: false,
      isDeleting: false,
      items: []
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

    folderToCheck.checked = !folder.checked;
    this.trigger(this.data);
  },

  refreshData() {
    const { currentHostingId } = this.data;

    currentHostingId && Actions.fetchFiles(currentHostingId);
  },

  setHostingId(hostingId) {
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
          message: 'Your files have been successfully uploaded.',
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

  onFinishUploading() {
    HostingUploadDialogActions.dismissDialog();
    this.data.filesToUpload = [];
    this.data.errorResponses = [];
    this.data.isUploading = false;
    this.refreshData();
  }
});
