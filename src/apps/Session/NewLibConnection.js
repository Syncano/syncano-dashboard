import Syncano from 'syncano';

let connection = new Syncano({ baseUrl: SYNCANO_BASE_URL });

export default {
  Syncano,

  get() {
    return connection;
  },

  set(_connection) {
    connection = _connection;
  },

  reset() {
    connection.setAccountKey(null);
  }
};
