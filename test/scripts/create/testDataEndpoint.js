const createTestDataEndpoints = (tempAccount, endpointsAmount) => {
  const dataEndpoints = [];
  const dataEndpointsNames = [];

  for (let i = 0; i < endpointsAmount; i++) {
    const name = `dataEndpoint_${Date.now() + i}`;
    const className = tempAccount.tempClassNames[0];

    dataEndpointsNames.push(name);
    dataEndpoints.push(tempAccount.connection.DataEndpoint({
      name,
      class: className
    }));
  }

  return tempAccount.connection.DataEndpoint
    .please()
    .bulkCreate(dataEndpoints)
    .then(() => {
      tempAccount.tempDataEndpointsNames = dataEndpointsNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
};

export default createTestDataEndpoints;
