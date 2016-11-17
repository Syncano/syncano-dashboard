import React from 'react';
import _ from 'lodash';
import { colors as Colors } from 'material-ui/styles';

const SocketDependenciesList = ({ dependencies }) => {
  const styles = {
    name: {
      fontWeight: 600
    },
    dependenciesHeader: {
      backgroundColor: Colors.indigo500,
      color: Colors.grey100,
      margin: '0 0 32px 0',
      padding: 2
    },
    dependenciesRuntimeHeader: {
      padding: '0 24px'
    },
    runtimeName: {
      color: Colors.grey500
    }
  };
  const dependenciesList = _.map(dependencies.scripts, (dependencyData, dependencyName) => (
    <div
      className="row vm-2-b"
      key={dependencyName}
    >
      <div className="col-sm-8">
        <div
          style={styles.name}
          className="align-right row"
        >
          {dependencyName}
        </div>
      </div>
      <div
        style={{ ...styles.dependenciesRuntimeHeader, ...styles.runtimeName }}
        className="col-sm-27"
      >
        {dependencyData.runtime_name}
      </div>
    </div>
  ));

  return (
    <div>
      <div
        className="row"
        style={styles.dependenciesHeader}
      >
        <div className="col-sm-8">
          <div className="align-right row">
            Script name
          </div>
        </div>
        <div
          style={styles.dependenciesRuntimeHeader}
          className="col-sm-27"
        >
          Runtime name
        </div>
      </div>
      {dependenciesList}
    </div>
  );
};

export default SocketDependenciesList;
