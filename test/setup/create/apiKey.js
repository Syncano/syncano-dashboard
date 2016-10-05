import connection from './connection';
import _ from 'lodash';

const createTestApiKey = (keyAmount) => {
  const apiKey = _.times(keyAmount, (index) => {
    const description = `apiKey_${Date.now()}${index}`;

    return connection.get().ApiKey({ description });
  });

  return connection.get().ApiKey
    .please()
    .bulkCreate(apiKey)
    .then((response) => {
      const apiKeyNames = response.map((createdApiKey) => createdApiKey.description);

      return apiKeyNames;
    })
    .catch((error) => console.log(error));
};

export default createTestApiKey;
