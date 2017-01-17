import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import DataObjectsActions from './DataObjectsActions';
import ChannelsStore from '../Channels/ChannelsStore';
import ChannelsActions from '../Channels/ChannelsActions';

export default Reflux.createStore({
  listenables: DataObjectsActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      isLoading: false,
      channels: [
        { payload: '', text: 'Loading...' }
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ChannelsActions.setChannels, this.getChannelsDropdown);
  },

  getChannelsDropdown() {
    console.debug('DataViewDialogStore::getChannelsDropdown');
    let channels = ChannelsStore.getChannelsDropdown();

    if (channels.length === 0) {
      channels = [{ payload: '', text: 'No channels, add one first' }];
    }

    this.trigger({ channels });
  },

  onCreateDataObject() {
    this.trigger({ isLoading: true });
  },

  onCreateDataObjectCompleted() {
    console.debug('DataObjectDialogStore::onCreateDataObjectCompleted');
    this.dismissDialog();
  },

  onRemoveDataObjectsCompleted() {
    this.dismissDialog();
  },

  onCreateDataObjectFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateDataObject() {
    this.trigger({ isLoading: true });
  },

  onUpdateDataObjectCompleted() {
    console.debug('DataObjectDialogStore::onUpdateDataObjectCompleted');
    this.dismissDialog();
  },

  onUpdateDataObjectFailure() {
    this.trigger({ isLoading: false });
  }
});
