const createTestScripts = (tempAccount, classAmount) => {
  const scripts = [];
  const scriptsNames = [];

  for (let i = 0; i < classAmount; i++) {
    const label = 'script_' + Date.now() + i;
    scriptsNames.push(label);
    scripts.push(tempAccount.connection.Script({
      label,
      source: 'print "Hellow World!"',
      runtime_name: 'python_library_v5.0'
    }));
  }

  return tempAccount.connection.Script
    .please()
    .bulkCreate(scripts)
    .then(() => {
      tempAccount.tempScriptNames = scriptsNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
};

export default createTestScripts;
