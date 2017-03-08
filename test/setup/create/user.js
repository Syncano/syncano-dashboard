import connection from './connection';
import _ from 'lodash';

const createTestUsers = (userAmount = 1) => {
  const users = _.times(userAmount, (index) => {
    const password = `${Date.now()}${index}`;
    const username = `user_${password}`;

    return connection.get().User({
      username,
      password
    });
  });

  return connection.get().User
    .please()
    .bulkCreate(users)
    .then((response) => {
      const usersNames = response.map((createdUser) => createdUser.username);

      return usersNames;
    })
    .catch((error) => console.log(error));
};

export default createTestUsers;
