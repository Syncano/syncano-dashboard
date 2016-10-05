import fs from 'fs';

const saveAccountsToFile = (data) => {
  const fileName = 'tempAccounts.js';
  const path = `${__dirname}/../../e2e/${fileName}`;
  const configFile = fs.createWriteStream(path);
  const json = JSON.stringify(data);
  const prefix = 'export default ';
  const suffix = ';';

  configFile.write(prefix + json + suffix);

  return console.log(`\n> File saved at ./test/e2e/${fileName}\n`);
};

export default saveAccountsToFile;
