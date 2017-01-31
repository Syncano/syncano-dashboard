import connection from './connection';
import _ from 'lodash';

const createTestClasses = (classAmount = 1) => {
  const classes = _.times(classAmount, (index) => {
    const name = `class_${Date.now()}${index}`;

    return connection.get().Class({
      name,
      schema: [
        { type: 'string', name }
      ]
    });
  });

  return connection.get().Class
    .please()
    .bulkCreate(classes)
    .then((response) => {
      const classNames = response.map((createdClass) => createdClass.name);

      return classNames;
    })
    .catch((error) => console.log(error));
};

export default createTestClasses;
