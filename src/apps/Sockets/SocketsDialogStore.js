import Reflux from 'reflux';

// Utils & Mixins
import { DialogStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './SocketsActions';

export default Reflux.createStore({
  listenables: [Actions],

  mixins: [DialogStoreMixin]
});
