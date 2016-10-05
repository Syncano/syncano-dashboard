exports.command = function runScriptAndClickReloadButton(scriptEditPage, connection, query) {
  connection
    .Script
    .please()
    .run(query)
    .then((resp) => {
      scriptEditPage
        .clickElement('@tracesRefresh')
        .waitForElementPresent('@scriptSuccess');
      return resp;
    })
    .catch((err) => console.error(err));
  return this;
};
