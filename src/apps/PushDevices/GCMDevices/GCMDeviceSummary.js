import React from 'react';
import dedent from 'dedent';
import SessionStore from '../../Session/SessionStore';
import { CodePreview, Dialog } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

const GCMDeviceSummary = ({ item, hasEditMode }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const headingText = !hasEditMode ? 'Android Device you just created can always be modified later. ' : '';
  const dialogHeadingStyle = {
    fontSize: 16,
    lineHeight: 1.6,
    color: 'rgba(68, 68, 68, .8)'
  };

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={dialogHeadingStyle}>
            <p>
              {`${headingText}Now you can send Push Notification Messages to this device.`}
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
                  code={dedent(`
                    curl -X POST
                    -H "X-API-KEY: ${token}"
                    -H "Content-Type: application/json"
                    -d '{"content": {"data": {"title": "App name", "body": "Your push notif text"},` +
                    `"environment": "development"}}'
                    "${SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/push_notifications/` +
                    `gcm/devices/${item.registration_id}/send_message/"
                  `)}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={dedent(`
                    import syncano
                    from syncano.models import GCMDevice

                    syncano.connect(api_key='${token}')

                    gcm_device = GCMDevice.please.get(
                      instance_name='${currentInstance.name}',
                      registration_id='${item.registration_id}'
                    )

                    gcm_device.send_message(
                      content={
                        'environment': 'development',
                        data: {
                          'title': 'App name',
                          'body': 'Your push notification text would go here'
                        }
                      }
                  `)}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={dedent(`
                    var Syncano = require('syncano');
                    var connection = Syncano({accountKey:'${token}'});
                    var GCMDevice = connection.GCMDevice;

                    var query = {
                      instanceName: "${currentInstance.name}",
                      registration_id: "${item.registration_id}"
                    };
                    var content = {
                      environment: "development",
                      data: {
                        "title": "App name",
                        "body": "Your push notification text would go here"
                      }
                    };

                    GCMDevice
                      .please()
                      .sendMessage(query, content)
                      .then(calback);
                  `)}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

export default GCMDeviceSummary;

