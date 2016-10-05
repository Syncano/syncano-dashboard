const createTestClasses = (tempAccount, classAmount) => {
  const classes = [];
  const classesNames = [];

  for (let i = 0; i < classAmount; i++) {
    const name = 'class_' + Date.now() + i;
    classesNames.push(name);
    classes.push(tempAccount.connection.Class({
      name,
      schema: [
        { type: 'string', name }
      ]
    }));
  }

  return tempAccount.connection.Class
    .please()
    .bulkCreate(classes)
    .then(() => {
      tempAccount.tempClassNames = classesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
};

export default createTestClasses;
