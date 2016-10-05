import connection from './connection';
import utils from '../../e2e/utils';

const createGCMSocket = () => (
  connection.get()
    .GCMConfig
    .please()
    .update({}, {
      production_api_key: utils.randomString(32),
      development_api_key: utils.randomString(32)
    })
    .then((response) => [response.production_api_key, response.development_api_key])
);

export default createGCMSocket;
