import fs from 'fs';

const removeCert = () => {
  fs.exists('./cert.p12', (exists) => {
    if (exists) {
      fs.unlink('./cert.p12');
    }
  });
  return console.log('Deleted file: ./cert.p12');
};

export default removeCert;
