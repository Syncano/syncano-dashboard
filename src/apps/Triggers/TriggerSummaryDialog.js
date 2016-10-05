import React from 'react';

import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

export default ({ trigger }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              Trigger you just created can always be modified later. Trigger Sockets execute a Script when a
              Data Object inside selected Data Class is created, updated or deleted (depends on "signal" field value).
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
                  code={`curl -X GET\n-H "X-API-KEY: ${token}"\n"${SYNCANO_BASE_URL}/v1.1/instances/` +
                  `${currentInstance.name}/triggers/${trigger.id}/"`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={`import syncano\nfrom syncano.models import Trigger\n\nsyncano.connect(api_key=` +
                  `'${token}')\n\nmy_trigger = Trigger.please.get(id=${trigger.id}, instance_name=` +
                  `"${currentInstance.name}")\n\nprint(my_trigger.label)`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                  `'${token}'});\nvar Trigger = connection.Trigger;\n\n` +
                  `Trigger\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
                  ` id: ${trigger.id}})\n  .then(function(trigger) {});`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};
