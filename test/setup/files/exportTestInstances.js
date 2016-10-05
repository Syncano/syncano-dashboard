import fs from 'fs';

const exportTestInstances = (data) => {
  const fileName = 'tempInstances.js';
  const path = `${__dirname}/../../e2e/${fileName}`;
  const configFile = fs.createWriteStream(path);
  const json = JSON.stringify(data);

  configFile.write(`export default ${json};`);

  return console.log(`\n> File saved at ./test/e2e/${fileName}\n`);
};

export default exportTestInstances;
