import connection from './connection';
import _ from 'lodash';

const createTestScripts = (classAmount) => {
  const scripts = _.times(classAmount, (index) => {
    const label = `script_${Date.now()}${index}`;

    return connection.get().Script({
      label,
      source: 'print "Hellow World!"',
      runtime_name: 'python_library_v5.0'
    });
  });

  return connection.get().Script
    .please()
    .bulkCreate(scripts)
    .then((response) => {
      const scriptsNames = response.map((createdScripts) => createdScripts.label);

      return scriptsNames;
    })
    .catch((error) => console.log(error));
};

export default createTestScripts;
