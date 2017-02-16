import React from 'react';

import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

export default ({ item, hasEditMode }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const headingText = !hasEditMode ? 'Script Endpoint you just created can always be modified later. ' : '';

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              {`${headingText}You can find list of your Script Endpoints, under Sockets tab in our Dashboard.
              If a Script Endpoint is public, you can see a clip icon in the Public column.`}
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
                  code={`curl -X GET \\\n-H "X-API-KEY: ${token}" \\\n"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/` +
                  `${currentInstance.name}/endpoints/scripts/${item.name}/run/"`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={`import syncano\nfrom syncano.models import ScriptEndpoint\n\nsyncano.connect(api_key=` +
                  `'${token}')\n\nscript_endpoint = ScriptEndpoint.please.run(\n  instance_name='` +
                  `${currentInstance.name}',\n  name='${item.name}'\n)`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: '${token}'});` +
                  `\nvar ScriptEndpoint = connection.ScriptEndpoint;\n\nScriptEndpoint\n  .please()\n  ` +
                  `.run({name: '${item.name}', instanceName: ` +
                  `'${currentInstance.name}'})\n  .then(function(trace) {});`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};
