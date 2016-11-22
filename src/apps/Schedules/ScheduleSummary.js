import React from 'react';

import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

export default ({ item, hasEditMode }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const headingText = !hasEditMode ? 'Schedule you just created can always be modified later. ' : '';

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              {`${headingText}You can change which Script should be run and the time when it will be execute.
              You can also set timezone based on your needs.`}
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
                  code={`curl -X GET\n-H "X-API-KEY: ${token}"\n"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/` +
                  `${currentInstance.name}/schedules/${item.id}"`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={`import syncano\nfrom syncano.models import Schedule\n\nsyncano.connect(api_key=` +
                  `'${token}')\n\nschedule = Schedule.please.get(instance_name='${currentInstance.name}',` +
                  `id='${item.id}')\nprint(schedule.label)`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                  `'${token}'});\nvar Schedule = connection.Schedule;\n\n` +
                  `Schedule\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
                  `id: '${item.id}'})\n  .then(function(schedules) {});`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};
