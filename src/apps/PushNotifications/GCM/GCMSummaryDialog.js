import React from 'react';
import Reflux from 'reflux';

import Store from './GCMSummaryDialogStore';
import GCMPushNotificationsStore from './GCMPushNotificationsStore';
import SessionStore from '../../Session/SessionStore';

import { DialogMixin } from '../../../mixins';
import { CodePreview, Dialog, Loading } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'GCMSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(GCMPushNotificationsStore, 'GCMs'),
    DialogMixin
  ],

  render() {
    const { open, GCMs } = this.state;
    const token = SessionStore.getToken();
    const item = GCMPushNotificationsStore.data.items[0];
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || GCMs.isLoading);

    return (
      <Dialog.FullPage
        data-e2e-close-button="gcm-push-nofitication-dialog-close-button"
        key="dialog"
        ref="dialog"
        title={!showSummaryDialog ? "You've just configured Google Push Notification Socket!" : ''}
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={GCMs.isLoading}
        open={open}
      >
        {!showSummaryDialog && (
          <div style={{ position: 'absolute', top: 0, left: 24 }}>
            <span
              className="synicon-socket-push"
              style={{ color: Colors.indigo300, fontSize: 32 }}
            />
          </div>
        )}
        {showSummaryDialog ? <Loading show={true} /> : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Push Notification Sockets allow for sending messages directly to your users devices.
                    Thanks to this functionality, your users can be quickly informed about changes taking place
                    within your application.
                  </p>
                </div>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Dialog.SummaryRedirect
                  title="Add a device"
                  text="Now you can go to the Android devices list and add a mobile device."
                  buttonLabel="Go to Devices list"
                  linkTo={{
                    pathname: `instances/${currentInstance.name}/push-notifications/devices/gcm`
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
                        '"registration_id": REGISTRATION_ID, "device_id": DEVICE_ID}\'\\\n' +
                        `"${SYNCANO_BASE_URL}/v1.1/instances/` +
                        `${currentInstance.name}/push_notifications/gcm/devices/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`my_trigger = Trigger.please.get(id=${item.id}, instance_name=` +
                        `"${currentInstance.name}")\n\nprint(my_trigger.label)`}
                        code={`import syncano\n` +
                              `from syncano.models import GCMDevice\n\n` +
                              `syncano.connect(api_key="${token}")\n\n` +
                              `device = GCMDevice.please.create(instance_name="${currentInstance.name}"\n` +
                              '                                 label=DEVICE_NAME\n' +
                              '                                 registration_id=DEVICE_REGGISTRATION_ID,\n' +
                              '                                 user=USER_ID\n' +
                              '                                 device_id=DEVICE_ID)'}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={'var Syncano = require("syncano");\n' +
                              `var connection = Syncano({accountKey: '${token}'});\n` +
                              'var GCMDevice = connection.GCMDevice;\n\n' +
                              'var device = { \n' +
                              `  instanceName: \'${currentInstance.name}\',\n` +
                              '  label=DEVICE_NAME\n' +
                              '  registration_id=REGISTRATION_ID,\n' +
                              '  user=USER_ID\n' +
                              '  device_id=DEVICE_ID\n' +
                              '};\n\n' +
                              'GCMDevice.please().create(device).then(function(device) { \n' +
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
                        '-d \'{ "content": { "environment": "development",' +
                        '"registration_ids":[ID, ID, ID], "data": {"message":"sample message"}}}\' \\\n' +
                        `"${SYNCANO_BASE_URL}/v1.1/instances/` +
                        `${currentInstance.name}/push_notifications/gcm/messages/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`import syncano\n` +
                              `from syncano.models import GCMMessage\n\n` +
                              `syncano.connect(api_key="${token}")\n\n` +
                              `message = GCMMessage.please.create(instance_name="${currentInstance.name}",\n` +
                              '                                   content={\n' +
                              '                                        \'registration_ids\': [ID, ID],\n' +
                              '                                        \'data\': {\'message\': \'hello\'}\n' +
                              '                                    })'}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={'var Syncano = require("syncano");\n' +
                              `var connection = Syncano({accountKey: '${token}'});\n` +
                              'var GCMDevice = connection.GCMDevice;\n\n' +
                              `var query = {instanceName: \'${currentInstance.name}\'} \n` +
                              'var message = { \n' +
                              '    content: {\n' +
                              '    registration_ids: [ID, ID],\n' +
                              '    environment: \'development\',\n' +
                              '    data: {message: "hello"}\n' +
                              '  }\n' +
                              '};\n\n' +
                              'GCMDevice.please().sendMessage(query, content).then(function(message) { \n' +
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
