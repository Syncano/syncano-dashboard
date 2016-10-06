import Reflux from 'reflux';
import _ from 'lodash';

import {
  CheckListStoreMixin,
  WaitForStoreMixin,
  StoreLoadingMixin
} from '../../mixins';

import Actions from './HostingFilesActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      filesToUpload: [],
      isLoading: true,
      isUploading: false
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
    const isChecked = folder.checked;

    _.forEach(items, item => {
      if (_.some(folder.files, { id: item.id })) {
        item.checked = !isChecked;
      }
    });

    this.trigger(this.data);
  },

  refreshData() {
    console.debug('HostingStore::refreshData');
    Actions.fetchFiles(this.data.currentHostingId);
  },

  setHostingId(hostingId) {
    this.data.currentHostingId = hostingId;
  },

  onUploadFilesCompleted(uploadingStatus) {
    if (uploadingStatus.isFinished) {
      this.data.filesToUpload = [];
      this.data.isUploading = false;
      this.refreshData();
    }
    this.data.isUploading = !uploadingStatus.isFinished;
    this.data.currentFileIndex = uploadingStatus.currentFileIndex;
    this.data.lastFileIndex = uploadingStatus.lastFileIndex;
    this.trigger(this.data);
  },

  onUploadFilesFailure() {
    this.data.isUploading = false;
    this.refreshData();
  },

  onFetchFilesCompleted(data) {
    console.debug('HostingStore::onFetchHostigCompleted');
    this.data.items = data.files;
    this.data.hostingDetails = data.hostingDetails;
    this.trigger(this.data);
  },

  onFetchFilesFailure() {
    SessionActions.handleInvalidURL();
  },

  onRemoveHostingFilesCompleted() {
    this.refreshData();
  }
});
