import React from 'react';
import Reflux from 'reflux';

import Store from './APNSPushNotificationsSummaryDialogStore';
import APNSPushNotificationsStore from './APNSPushNotificationsStore';
import SessionStore from '../../Session/SessionStore';

import { DialogMixin } from '../../../mixins';
import { CodePreview, Dialog, Loading } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'APNSPPushNotificationsSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(APNSPushNotificationsStore, 'APNSPPushNotifications'),
    DialogMixin
  ],

  render() {
    const { open, APNSPPushNotifications } = this.state;
    const item = APNSPushNotificationsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || APNSPPushNotifications.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just configured Apple Push Notification Socket!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={APNSPPushNotifications.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-push"
            style={{
              color: Colors.indigo300,
              fontSize: 32
            }}
          />
        </div>
        {showSummaryDialog ? <Loading show={true} /> : (
        <div>
          <Dialog.ContentSection>
            <div className="col-flex-1">
              <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                <p>
                    Apple Push Notification you just configured can always be modified later. Push Notification
                    Sockets allow for sending messages directly to your users devices. Thanks to this functionality,
                    your users can be quickly informed about changes taking place within your application.
                  </p>
              </div>
            </div>
          </Dialog.ContentSection>
          <Dialog.ContentSection>
            <div className="col-flex-1">
              <Dialog.SummaryRedirect
                title="Add a device through the Dashboard"
                text="Now you can go to the iOS devices list and add a mobile device."
                buttonLabel="Go to Devices list"
                linkTo={{
                  pathname: `instances/${currentInstance.name}/push-notifications/devices/apns`
                }}
              />
              <Card style={{ marginBottom: 28 }}>
                <CardTitle title="Add a device through your App" />
                <CardText>
                  <p>Choose your favorite language below and copy the code.</p>
                  <CodePreview>
                    <CodePreview.Item
                      title="cURL"
                      languageClassName="markup"
                      code={`curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n` +
                        '-H "Content-Type: application/json" \\\n' +
                        '-d \'{"label": DEVICE_NAME, "user": USER_ID, ' +
                        '"registration_id": REGISTRATION_ID, "device_id": DEVICE_ID}\' \\\n' +
                        `"${SYNCANO_BASE_URL}/v1.1/instances/` +
                        `${currentInstance.name}/push_notifications/apns/devices/"`}
                    />
                    <CodePreview.Item
                      title="Python"
                      languageClassName="python"
                      code={`import syncano\n` +
                              `from syncano.models import APNSDevice\n\n` +
                              `syncano.connect(api_key="${token}")\n\n` +
                              `device = APNSDevice.please.create(instance_name="${currentInstance.name}"\n` +
                              '                                  registration_id=DEVICE_REGGISTRATION_ID,\n' +
                              '                                  user=USER_ID\n' +
                              '                                  device_id=DEVICE_ID)'}
                    />
                    <CodePreview.Item
                      title="JavaScript"
                      languageClassName="javascript"
                      code={'var Syncano = require("syncano");\n' +
                              `var connection = Syncano({accountKey: '${token}'});\n` +
                              'var APNSDevice = connection.APNSDevice;\n\n' +
                              'var device = { \n' +
                              `  instanceName: '${currentInstance.name}',\n` +
                              '  label=DEVICE_NAME\n' +
                              '  registration_id=REGISTRATION_ID,\n' +
                              '  user=USER_ID\n' +
                              '  device_id=DEVICE_ID\n' +
                              '};\n\n' +
                              'APNSDevice.please().create(device).then(function(device) { \n' +
                              '  console.log(\'Device\', device); \n});'
                            }
                    />
                  </CodePreview>
                </CardText>
              </Card>
              <Card>
                <CardTitle title="Send a notification message from your App." />
                <CardText>
                  <p>Choose your favorite language below and copy the code.</p>
                  <CodePreview>
                    <CodePreview.Item
                      title="cURL"
                      languageClassName="markup"
                      code={`curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n` +
                        '-H "Content-Type: application/json" \\\n' +
                        '-d \'{"content": {"environment": "development", "aps": {"alert": "hello"},' +
                        '"registration_ids": [ID, ID, ID]}\' \\\n' +
                        `"${SYNCANO_BASE_URL}/v1.1/instances/` +
                        `${currentInstance.name}/push_notifications/apns/messages/"`}
                    />
                    <CodePreview.Item
                      title="Python"
                      languageClassName="python"
                      code={`import syncano\n` +
                              `from syncano.models import APNSMessage\n\n` +
                              `syncano.connect(api_key="${token}")\n\n` +
                              `message = APNSMessage.please.create(instance_name="${currentInstance.name}",\n` +
                              '                                    content={\n' +
                              '                                        \'registration_ids\': [\'ID\'],\n' +
                              '                                        \'aps: {\'alert\': \'hello\'},\n' +
                              '                                        \'environment: \'development\'\n' +
                              '                                    })'}
                    />
                    <CodePreview.Item
                      title="JavaScript"
                      languageClassName="javascript"
                      code={'var Syncano = require("syncano");\n' +
                              `var connection = Syncano({accountKey: '${token}'});\n` +
                              'var APNSMessage = connection.APNSMessage;\n\n' +
                              'var message = { \n' +
                              `  instanceName: '${currentInstance.name}',\n` +
                              '  content: {\n' +
                              '    registration_ids: [ID, ID],\n' +
                              '    environment: \'development\',\n' +
                              '    aps: {alert: "hello"}\n' +
                              '  }\n' +
                              '};\n\n' +
                              'APNSDevice.please().create(message).then(function(message) { \n' +
                              '  console.log(\'Message\', message); \n});'
                            }
                    />
                  </CodePreview>
                </CardText>
              </Card>
            </div>
          </Dialog.ContentSection>
        </div>
        )}
      </Dialog.FullPage>
    );
  }
});
