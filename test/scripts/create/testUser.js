const createTestUsers = (tempAccount, userAmount) => {
  const users = [];
  const usersNames = [];

  for (let i = 0; i < userAmount; i++) {
    const password = String(Date.now() + i);
    const username = `user_${password}`;

    usersNames.push(username);
    users.push(tempAccount.connection.User({
      username,
      password
    }));
  }

  return tempAccount.connection.User
    .please()
    .bulkCreate(users)
    .then(() => {
      tempAccount.tempUserNames = usersNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
};

export default createTestUsers;
