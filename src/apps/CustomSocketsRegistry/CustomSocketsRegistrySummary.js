import React from 'react';
import _ from 'lodash';

import { Dialog, MethodLabel } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

const styles = {
  endpointsTitle: {
    fontSize: 24,
    marginTop: 40
  },
  calls: {
    margin: '10px 0'
  },
  call: {
    display: 'flex',
    margin: '10px 0px',
    backgroundColor: 'rgb(244, 244, 244)',
    border: '1px solid rgb(228, 228, 228)',
    borderRadius: 5
  },
  callUrl: {
    padding: '8px 16px',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'scroll'
  },
  card: {
    margin: '40px 0'
  },
  cardTitle: {
    paddingBottom: 0
  },
  cardTitleText: {
    fontSize: 18
  },
  cardText: {
    paddingTop: 0
  },
  cardFooterText: {
    marginTop: 20
  },
  descriptionContainer: {
    fontSize: 16,
    lineHeight: 1.6,
    color: 'rgba(68,68,68, .8)'
  },
  callMethodLabel: {
    maxWidth: '100%'
  }
};

const CustomSocketsRegistrySummary = ({ item }) => {
  const renderCallMethodsLabel = call => {
    const methods = call.methods[0] === '*' ? ['get', 'post', 'put', 'patch'] : call.methods;

    return _.map(methods, (method, index) => (
      <div
        key={index}
        style={styles.call}
      >
        <MethodLabel method={method} />
        <div style={styles.callUrl}>
          {`${SYNCANO_BASE_URL}/v1.1/instances/${item.instanceName}/endpoints/sockets/${call.name}/`}
        </div>
      </div>
    ));
  };

  const renderCalls = (calls) => (
    _.map(calls, (call, index) => (
      <div
        key={index}
        style={styles.callMethodLabel}
      >
        {renderCallMethodsLabel(call)}
      </div>
    ))
  );

  return (
    <div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          <div style={styles.descriptionContainer}>
            {`Custom Socket you just created contains several endpoints that you can connect your frontend
              or mobile app to. Check out their dependencies to see how everything work under the hood.
            There's no need for that though since a socket should work out of the box (if configured properly).`}
          </div>
        </div>
      </Dialog.ContentSection>
      <div style={styles.endpointsTitle}>
        Available endpoints
      </div>
      <Dialog.ContentSection>
        <div className="col-flex-1">
          {_.map(item.endpoints, (endpoint, key) => (
            <Card
              key={key}
              style={styles.card}
            >
              <CardTitle
                title={`/${key}/`}
                style={styles.cardTitle}
                titleStyle={styles.cardTitleText}
              />
              <CardText style={styles.cardText}>
                {renderCalls(endpoint.calls)}
                <div style={styles.cardFooterText}>
                  {endpoint.metadata && endpoint.metadata.description}
                </div>
              </CardText>
            </Card>
          ))}
        </div>
      </Dialog.ContentSection>
    </div>
  );
};

export default CustomSocketsRegistrySummary;
