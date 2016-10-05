import React from 'react';
import dedent from 'dedent';
import SessionStore from '../../Session/SessionStore';
import { CodePreview, Dialog } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

const APNSDeviceSummary = ({ item, hasEditMode }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const headingText = !hasEditMode ? 'iOS Device you just created can always be modified later. ' : '';
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
                    -d '{"content": {"environment": "development","aps": {"alert": "hello"}}'
                    "${SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/push_notifications/` +
                    `apns/devices/${item.registration_id}/send_message/"
                  `)}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={dedent(`
                    import syncano
                    from syncano.models import APNSDevice

                    syncano.connect(api_key='${token}')

                    device = APNSDevice.please.get(
                      instance_name='${currentInstance.name}',
                      registration_id='${item.registration_id}'
                    )
                      device.send_message(
                        content={
                          'environment': 'development',
                          'aps': {'alert': 'hello'}
                        }
                      )
                    `)}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={dedent(`
                    var Syncano = require('syncano');
                    var connection = Syncano({accountKey:'${token}'});
                    var APNSDevice = connection.APNSDevice;
                    
                    var query = {
                      instanceName: "${currentInstance.name}",
                      registration_id: "${item.registration_id}"
                    };
                    var content = {
                      environment: "development",
                      aps: {alert: "hello"}
                    };
                    
                    APNSDevice
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

export default APNSDeviceSummary;
