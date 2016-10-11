import dedent from 'dedent';

const baseScripts = {
  base_nodejs: {
    source: `
      // ARGS, CONFIG and META are three default dictionaries you
      // have access to from within the script. Click 'RUN' to see what
      // they contain. CONFIG is empty because you'd need to add key/values
      // in the right pane or in the Global CONFIG.
      // ARGS dictionary contains payload passed when running a script.
      // META contains additional script environment info.

      console.log('ARGS:', ARGS, 'META:', META , 'CONFIG:', CONFIG);

      // When Script is executed by a Script endpoint, then accessing ARGS
      // is a bit different:
      // ARGS.POST is for post http requests
      // ARGS.GET is for get http requests

      // Code below uses Syncano JS Library and adds random users.
      // You can find the ACCOUNT_KEY in the account dropdown (avatar icon)

      // var Syncano = require('syncano');
      // var connection = Syncano({accountKey: 'ACCOUNT_KEY'});
      // var User = connection.User;

      // var options = {
      //   username: Date.now().toString(),
      //   password: 'PASSWORD',
      //   instanceName: META.instance
      // };

      // User.please()
      //     .create(options)
      //     .then((res) => console.log('USERNAME:', res.username))
      //     .catch((err) => console.log(err));`
  },
  base_python: {
    source: `
      # ARGS, CONFIG and META are three default dictionaries you
      # have access to from within the script. Click 'RUN' to see what
      # they contain. CONFIG is empty because you'd need to add key/values
      # in the right pane or in the Global CONFIG.
      # ARGS dictionary contains payload passed when running a script.
      # META contains additional script environment info.

      print ('ARGS:', ARGS, 'META:', META , 'CONFIG:', CONFIG)

      # When Script is executed by a Script endpoint, then accessing ARGS
      # is a bit different:
      # ARGS.POST is for post http requests
      # ARGS.GET is for get http requests

      # Code below uses Syncano Python Library and adds random users.
      # You can find the ACCOUNT_KEY in the account dropdown (avatar icon)

      # import syncano
      # import time
      # from syncano.models import User

      # connection = syncano.connect(instance_name=META['instance'], api_key='ACCOUNT_KEY')

      # new_user = User.please.create(
      #    username=int(time.time()),
      #    password="password"
      # )

      # print (new_user)`
  }
};

export default baseScripts;

const getBaseScript = scriptName => dedent(baseScripts[scriptName].source);

export { getBaseScript };
