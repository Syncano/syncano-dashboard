import React from 'react';
import { Link } from 'react-router';

import ClassesStore from './../Classes/ClassesStore';
import SessionStore from '../Session/SessionStore';

import { CodePreview, Dialog, Notification, Show } from '../../common/';
import { Card, CardTitle, CardText, RaisedButton } from 'material-ui';

const DataEndpointSummary = ({ item, hasEditMode }, { params }) => {
  const token = SessionStore.getToken();
  const currentInstance = SessionStore.getInstance();
  const itemClass = item && ClassesStore.getClassByName(item.class);
  const itemClassSchema = itemClass && itemClass.schema;
  const headingText = !hasEditMode ? 'Data Endpoint you just created can always be modified later. ' : '';

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
            <p>
              {`${headingText}You can change which Data Object fields should be hidden, which should stay visible and
              which reference fields to expand. You can also apply search queries on top of filtering.`}
            </p>
          </div>
        </div>
      </Dialog.ContentSection>
      <Show if={!itemClassSchema || !itemClassSchema.length}>
        <Dialog.ContentSection>
          <div className="col-flex-1">
            <Notification>
              {`You have chosen the "${item.class}" Data Class but it doesn't contain any custom fields in the
              Class schema. To use the full power of Data Endpoints, we suggest`}
              <Link
                to={{
                  name: 'classEdit',
                  params: { ...params, className: item.class, action: 'edit' }
                }}
                style={{ fontWeight: 700 }}
              >
                {' clicking here to add custom fields for your Data Objects.'}
              </Link>
            </Notification>
          </div>
        </Dialog.ContentSection>
      </Show>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <Card>
            <CardTitle title="Preview Data" />
            <CardText>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  Click the link on the right to open your Endpoint in a new browser tab.
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <RaisedButton
                    primary={true}
                    label="Open Endpoint in new tab"
                    target="_blank"
                    href={`
                      ${SYNCANO_BASE_URL}${item.links.get}?api_key=${token}
                    `}
                  />
                </div>
              </div>
            </CardText>
          </Card>
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
                  `${currentInstance.name}/endpoints/data/${item.name}/get/"`}
                />
                <CodePreview.Item
                  title="JavaScript"
                  languageClassName="javascript"
                  code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                  `'${token}'});\nvar DataEndpoint = connection.DataEndpoint;\n\n` +
                  `DataEndpoint\n  .please()\n  .fetchData({name: '${item.name}', instanceName: '` +
                  `${currentInstance.name}'})\n  .then(function(dataObjects) {});`}
                />
              </CodePreview>
            </CardText>
          </Card>
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

DataEndpointSummary.contextTypes = { params: React.PropTypes.object };

export default DataEndpointSummary;
