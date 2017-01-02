import React from 'react';
import _ from 'lodash';

import { colors as Colors } from 'material-ui/styles';

const SocketParametersList = ({ parameters }) => {
  const styles = {
    name: {
      display: 'inline-block',
      padding: '3px 6px',
      borderRadius: 4,
      backgroundColor: '#e5e5e5',
      fontWeight: 600
    },
    parametersHeader: {
      backgroundColor: Colors.indigo500,
      color: Colors.grey100,
      marginBottom: 32,
      padding: 2
    },
    parametersWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    type: {
      display: 'inline-block',
      paddingRight: 6,
      color: Colors.grey500
    },
    description: {
      padding: '2px 24px'
    }
  };
  const paramatersList = _.map(parameters, (info, parameterName) => (
    <div
      className="row vm-2-b"
      key={parameterName}
    >
      <div
        className="col-sm-8"
        style={styles.parametersWrapper}
      >
        <div
          style={styles.name}
          className="align-right row"
        >
          {parameterName}
        </div>
        <div
          style={styles.type}
          className="align-right row"
        >
          {info.type}
        </div>
      </div>
      <div
        style={styles.description}
        className="col-sm-27"
      >
        {info.description}
      </div>
    </div>
  ));

  return (
    <div>
      <div
        className="row"
        style={styles.parametersHeader}
      >
        <div className="col-sm-8">
          <div className="align-right row">
            Name
          </div>
        </div>
        <div
          style={styles.description}
          className="col-sm-27"
        >
          Description
        </div>
      </div>
      {paramatersList}
    </div>
  );
};

export default SocketParametersList;
