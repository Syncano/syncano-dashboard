import React from 'react';
import { Dialog, CodePreview, Loading } from '../../common';
import { Card, CardTitle, CardText } from 'material-ui';

import SessionStore from '../Session/SessionStore';

export default ({ message, isLoading }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();

  return (
    <Loading show={isLoading || !message}>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              Users that polled for changes in the <strong>{message.name}</strong> Channel will receive
              a notification message. Also, if a Channel has its permissions set to <strong>publish</strong>, the users
              can respond to this message.
            </p>
          </div>
        </div>
      </Dialog.ContentSection>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <Dialog.SummaryRedirect
            title="Real-time Channel Messages History"
            text={`You can view this, and all the previous messages sent to ${message.name} Channel, in the Channel
              Messages History section.`}
            buttonLabel="View sent messages"
            linkTo={{
              pathname: `instances/${currentInstance.name}/channels/${message.name}/history`
            }}
          />
          <Dialog.SummaryRedirect
            title="Real-time Channel Messages documentation"
            text="To learn more about sending Channel Messages, please view our documentation on Real-time Channels."
            buttonLabel="Go to documentation"
            linkTo={{
              pathname: 'http://docs.syncano.io/docs/realtime-communication#publishing-custom-notification-messages'
            }}
          />
          <Card>
            <CardTitle title="Send Message to Channel" />
            <CardText>
              <p>Choose your favorite language below and copy the code.</p>
              <CodePreview>
                <CodePreview.Item
                  title="cURL"
                  languageClassName="markup"
                  code={'# Sending Message to Channel\n\n' +
                    `curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "X-USER-KEY: <user_key>" \\\n` +
                    `-H "Content-type: application/json" \\\n-d '{\n\t\t"payload": {\n\t\t\t` +
                    `"message": "${message.payload.content}",\n\t\t\t"type": "${message.metadata.type}"\n\t\t}` +
                    `${message.room ? `,\n\t\t"room": "${message.room}"\n\t}' \\\n` : `\n\t}' \\\n`}` +
                    `"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/channels/` +
                    `${message.name}/publish/"`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={'# Sending Message to Channel\n\nimport syncano\nfrom syncano.models import Channel\n\n' +
                    `syncano.connect(api_key="${token}", user_key="<user_key>")\n\n` +
                    `channel = Channel.please.get(\n\tinstance_name="${currentInstance.name}",\n\t` +
                    `name="${message.name}"\n)\n\nchannel.publish(payload={"message": "${message.payload.content}"}` +
                    `${message.room ? `, room="${message.room}")` : ')'}`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={'// Sending Message to Channel\n\n' +
                    `var Syncano = require('syncano');\nvar connection = Syncano({ accountKey: '${token}' });\n\n` +
                    `var Channel = connection.Channel;\n\nvar params = {\n\tinstanceName: '${currentInstance.name}'` +
                    `,\n\tname: '${message.name}'\n};\nvar message = {\n\tcontent: '${message.payload.content}'\n};` +
                    `${message.room ? `\nvar room = '${message.room}';\n` : '\n'}` +
                    `\nChannel.please().publish(params, message${message.room ? ', room);' : ');'}`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </Loading>
  );
};
