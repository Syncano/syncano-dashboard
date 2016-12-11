import React from 'react';
import dedent from 'dedent';

import SessionStore from '../Session/SessionStore';

import { Card, CardTitle, CardText } from 'material-ui';
import { CodePreview, Dialog } from '../../common/';

const TemplateSummary = ({ createdTemplate }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              Templates are a bit like Snippets scripts. They are objects that contain code, that
              can be executed at certain conditions. The difference is that this code can be used
              in a another way. One of the examples would be to wrap your data in html tags and
              display it as a webpage. Or create csv documents. Possibilities are quite extensive
              and we will dive into them in a moment.
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
                  code={'# To add a new Template\n\n' +
                  `curl -X POST \\\n  -H "X-API-KEY: ${token}" \\\n  -H "Content-type: application/json" \\\n` +
                  `  -d '{ "name": "<template_name>",\n` +
                  `    "content": "<div>Hello {{ some_var }}</div>",\n` +
                  `    "content_type": "${createdTemplate.content_type}",\n` +
                  `    "context": {"some_var": "world!"}}' \\\n` +
                  `"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/snippets/templates/"\n\n` +
                  '# To see details\n\n' +
                  `curl -X POST \\\n  -H "X-API-KEY: ${token}" \\\n` +
                  `"${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/${currentInstance.name}/` +
                  `snippets/templates/${createdTemplate.name}/render/" `
                  }
                />
                <CodePreview.Item
                  title="Python"
                  languageClassName="python"
                  code={dedent(`
                    # To add a new Template

                    import syncano
                    from syncano.models import ResponseTemplate

                    syncano.connect(api_key="${token}")

                    new_template = ResponseTemplate.please.create(
                        instance_name="${currentInstance.name}",
                        name="<template_name>",
                        content="<div>Hello {{ some_var }}</div>",
                        context={"some_var": "world!"},
                        content_type="${createdTemplate.content_type}"
                    )

                    # To render created Template

                    import syncano
                    from syncano.models import ResponseTemplate

                    syncano.connect(api_key="${token}", instance_name="${currentInstance.name}")

                    template = ResponseTemplate.please.get(name="${createdTemplate.name}")
                    result = template.render()

                    print(result)
                    `
                  )}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={dedent(`
                    # To add a new Template

                    var Syncano = require("syncano");
                    var connection = Syncano({accountKey: "${token}"});
                    var Template = connection.Template;

                    var params = {
                      instanceName: "${currentInstance.name}",
                      name: "<template_name>",
                      content: "<div>Hello {{ some_var }}</div>",
                      content_type: "${createdTemplate.content_type}",
                      context: {"some_var": "world!"}
                    };

                    Template.please()
                      .create(params)
                      .then((response) => console.log(response))
                      .catch((error) => console.log(error));

                    # To render a Template

                    var Syncano = require("syncano");
                    var connection = Syncano({accountKey: "${token}"});
                    var Template = connection.Template;

                    var query = {name: '${createdTemplate.name}', instanceName: '${currentInstance.name}'};

                    Template.please()
                      .render(query)
                      .then((response) => console.log(response))
                      .catch((error) => console.log(error));
                    `
                  )}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

export default TemplateSummary;
