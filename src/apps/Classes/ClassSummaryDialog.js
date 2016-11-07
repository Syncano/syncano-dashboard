import React from 'react';

import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

const handleSchemaFields = (schemaArray) => {
  const schemaFormating = {
    curl: schemaArray,
    python: schemaArray.slice(1, -1).replace(/(},)/g, '},\n  ').replace(/:true/g, ':True').replace(/:false/g, ':False'),
    javascript: schemaArray.slice(1, -1).replace(/(},)/g, '},\n    ')
  };

  return schemaFormating;
};

const ClassSummaryDialog = ({ item, hasEditMode }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const stringSchemaFields = item && JSON.stringify(item.schema);
  const headingText = !hasEditMode ? 'Data Class you just created can always be modified later. ' : '';
  const formatedSchemaFields = handleSchemaFields(stringSchemaFields);

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              {`${headingText}You can update the schema of the Data Class or edit its permissions. To do this,
              open your Dashboard, click on "Classes" in the left sidebar, and click the three dot edit button
              on the right side of the Data Class row.`}
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
                  code={`curl -X PATCH \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-Type: application/json" ` +
                  `\\\n-d '{"schema":${formatedSchemaFields.curl}}' \\\n` +
                  `"${SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/classes/${item.name}"/`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={`import syncano\nfrom syncano.models import Class\n\nsyncano.connect(api_key=` +
                  `'${token}')\n\nclass_instance = Class.please.get(instance_name='${currentInstance.name}', ` +
                  `name='${item.name}') \n\nclass_instance.schema.add(\n` +
                  `  ${formatedSchemaFields.python}\n)\nclass_instance_save()`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                  `'${token}'});\nvar Class = connection.Class;\n\nvar update = {\n  "schema": [\n    ` +
                  `${formatedSchemaFields.javascript}\n  ]\n};\n\n` +
                  `Class\n  .please()\n  .update({name: '${item.name}', instanceName: '` +
                  `${currentInstance.name}'}, update)\n  .then(calback);`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

export default ClassSummaryDialog;
