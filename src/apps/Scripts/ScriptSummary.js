import React from 'react';

import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

const ScriptSummary = ({ createdScript }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              Script is a piece of code that can be run in the cloud. Technology used for the environments
              created during the code execution is powered by Docker. Scripts can be run directly, by Triggers,
              Schedules and Script Endpoint Sockets.
            </p>
          </div>
        </div>
      </Dialog.ContentSection>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <Card>
            <CardTitle title="Use in your App" />
            <CardText>
              <p>Choose your favorite language below and copy the code.</p>
              <CodePreview>
                <CodePreview.Item
                  title="cURL"
                  languageClassName="markup"
                  code={`curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-Type: application/json" \\\n` +
                  `-d '{"payload":{"KEY":"VALUE"}}' \\\n"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/` +
                  `${currentInstance.name}/snippets/scripts/${createdScript.id}/run/"`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={`import syncano\nfrom syncano.models import Script\n\nconnection = syncano.connect` +
                  `(api_key="${token}")\n\ntrace = Script.please.run(\n  ` +
                  `instance_name="${currentInstance.name}",\n  ` +
                  `id="${createdScript.id}",\n  payload={'KEY': 'VALUE'}\n)`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                  `'${token}'});\nvar Script = connection.Script;\n\n` +
                  `var payload = {"payload": {"KEY":"VALUE"}};\n\nScript\n  .please()\n  ` +
                  `.run({instanceName: '${currentInstance.name}', id: ${createdScript.id}}, payload)\n` +
                  '  .then(calback);'}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

export default ScriptSummary;
