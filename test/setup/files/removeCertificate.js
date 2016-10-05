import fs from 'fs';

const removeCert = () => {
  fs.exists('./cert.p12', (exists) => {
    exists && fs.unlink('./cert.p12');
  });
  console.log('Deleted file: ./cert.p12');
};

removeCert();
