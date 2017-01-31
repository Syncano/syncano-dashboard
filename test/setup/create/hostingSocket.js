import connection from './connection';

const createHostingSocket = () => {
  const hosting = { name: `hosting${Date.now()}`, domains: [] };

  return connection.get()
    .Hosting
    .please()
    .create(hosting)
    .then((response) => response.name)
    .catch((error) => console.log(error));
};

export default createHostingSocket;
