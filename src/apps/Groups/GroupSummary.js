import React from 'react';
import { Dialog, CodePreview } from '../../common';
import { Card, CardTitle, CardText } from 'material-ui';

import SessionStore from '../Session/SessionStore';

export default ({ group }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              Groups on Syncano are tightly coupled with permissions. They can be used to construct different levels of
               access to resources stored on the platform. After you create a group, you can add users to this group.
               Later on, during Data Object creation, you can decide which group of users will have access to it.
            </p>
          </div>
        </div>
      </Dialog.ContentSection>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <Dialog.SummaryRedirect
            title="Groups documentation"
            text={`To learn how to use Groups, add Users to Groups and manage permissions, please view our documentation
             on Groups management.`}
            buttonLabel="Go to documentation"
            linkTo={{
              pathname: 'http://docs.syncano.io/docs/groups'
            }}
          />
          <Card>
            <CardTitle title="Add Users to Group and control permissions" />
            <CardText>
              <p>Choose your favorite language below and copy the code.</p>
              <CodePreview>
                <CodePreview.Item
                  title="cURL"
                  languageClassName="markup"
                  code={'# Adding User to Group\n\n' +
                    `curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-type: application/json" \\\n` +
                    `-d '{"user": "<user_id>"}' \\\n` +
                    `"${SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/groups/` +
                    `${group.id}/users/" \n\n` +
                    '# Creating Data Object with Group permissions\n\n' +
                    `curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-type: application/json" \\\n` +
                    `-d '{"group": 1, "group_permissions": "full"}' \\\n` +
                    `"${SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/classes/<class_name>/objects/`}
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={'import syncano\nfrom syncano.models import Group, User, Object\n\n' +
                    `syncano.connect(api_key="${token}")\n\n` +
                    '# Adding User to Group\n\n' +
                    `user = User.please.get(id=<user_id>, instance_name="${currentInstance.name}")\n` +
                    `group = Group.please.get(id=${group.id}, instance_name="${currentInstance.name}")\n` +
                    `user.add_to_group(group_id=${group.id})\n\n` +
                    `# OR\n\n` +
                    'group.add_user(user_id=<user_id>)\n\n' +
                    '# Creating Data Object with Group permissions\n\n' +
                    `Object.please.create(\n\tinstance_name="${currentInstance.name}",\n\t` +
                    `class_name=<class_name>,\n\tgroup=${group.id},\n\tgroup_permissions="full"\n)`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={'// Adding User to Group\n\n' +
                    `var Syncano = require('syncano');\nvar connection = Syncano({ accountKey: '${token}' });\n\n` +
                    `connection.Group\n\t.please()\n\t.addUser({ id: ${group.id}, ` +
                    `instanceName: '${currentInstance.name}' }, { user: <user_id> })\n\t` +
                    `.then(function(response) {\n\t\tconsole.log(response);\n\t})\n\t` +
                    `.catch(function(error) {\n\t\tconsole.log(error);\n\t});\n\n` +
                    `// Creating Data Object with Group permissions\n\n` +
                    `var book = {\n\ttitle: 'Book Title',\n\tgroup: ${group.id},\n\tgroup_permissions: 'full',\n\t` +
                    `instanceName: '${currentInstance.name}',\n\tclassName: <class_name>\n};\n\n` +
                    `connection.DataObject\n\t.please()\n\t.create(book)\n\t` +
                    `.then(function(response) {\n\t\tconsole.log(response);\n\t})\n\t` +
                    `.catch(function(error) {\n\t\tconsole.log(error);\n\t});`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};
