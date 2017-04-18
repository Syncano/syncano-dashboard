import React from 'react';
import _ from 'lodash';
import { Element as ScrollHook } from 'react-scroll';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { MethodLabel, Show } from '../../../common';
import MethodDescription from './SocketMethodDescription';
import ParamsList from './SocketParametersList';
import DependenciesList from './SocketDependenciesList';
import CodeExample from './SocketCodeExample';
import AuthorInfo from './SocketAuthorInfo';

const SocketsRegistryContentSection = ({
  author,
  socketName,
  socketDescription,
  endpoints,
  dependencies,
  runtimes,
  handleChangeLanguage,
  currentLanguage
}) => {
  const styles = {
    methodLabel: {
      fontSize: 28,
      marginLeft: 24
    },
    socketName: {
      paddingTop: 4,
      fontSize: 26,
      marginLeft: 24
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    titleContainer: {
      borderBottom: `1px solid ${Colors.grey200}`
    },
    container: {
      minHeight: 350,
      flex: 1
    },
    description: {
      paddingLeft: 26,
      width: '100%',
      fontSize: 14,
      color: Colors.grey500
    },
    socketIcon: {
      fontSize: 52
    },
    header: {
      padding: '32px 24px'
    },
    authorInfoContainer: {
      backgroundColor: '#444',
      padding: 0
    },
    runtimeButtonsContainer: {
      backgroundColor: Colors.blueGrey900,
      display: 'flex',
      borderBottom: `2px solid ${Colors.grey900}`,
      padding: '8px 16px'
    },
    runtimeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '0 8px',
      color: Colors.grey300,
      borderRadius: 5,
      minWidth: 70,
      height: 30
    },
    activeLanguageButton: {
      backgroundColor: Colors.blue500
    }
  };
  const renderLanguageButtons = () => {
    const availableLanguages = ['cURL', 'NodeJS', 'Python', 'CLI'];
    const runtimeButtons = _.map(availableLanguages, (language) => {
      const languageName = language.toLowerCase();
      const isCurrentLanguage = languageName === currentLanguage;

      return (
        <div
          onClick={() => handleChangeLanguage(languageName)}
          style={{ ...styles.runtimeButton, ...(isCurrentLanguage && styles.activeLanguageButton) }}
          key={languageName}
        >
          {language}
        </div>
      );
    });

    return runtimeButtons;
  };
  const renderTitle = () => (
    <div
      className="row col-flex-1"
      style={styles.titleContainer}
    >
      <div className="col-sm-18">
        <div style={{ ...styles.nameContainer, ...styles.header }}>
          <FontIcon
            style={styles.socketIcon}
            className="synicon-socket--socket"
            color={Colors.purple400}
          />
          <div style={styles.socketName}>
            {socketName}
          </div>
        </div>
        <div style={styles.description}>
          {socketDescription}
        </div>
      </div>
      <div
        style={styles.authorInfoContainer}
        className="col-sm-17"
      >
        <div style={styles.runtimeButtonsContainer}>
          {renderLanguageButtons()}
        </div>
        <AuthorInfo
          runtimes={runtimes}
          author={author}
        />
      </div>
    </div>
  );
  const renderEndpoints = () => {
    const endpointsList = _.map(endpoints, (methods, endpointName) => (
      _.map(methods, (method) => (
        <div className="row col-flex-1">
          <div className="col-sm-18">
            <div style={{ ...styles.nameContainer, ...styles.header }}>
              <ScrollHook name={`${endpointName}-${method.type}`} />
              <MethodLabel method={method.type} />
              <div style={styles.methodLabel}>
                {endpointName}
              </div>
            </div>
            <MethodDescription
              style={styles.header}
              headerLabel="Definition"
            >
              {`${APP_CONFIG.SYNCANO_BASE_URL}/v1.1/instances/your_instance/sockets/${socketName}/${endpointName}/`}
            </MethodDescription>
            <Show if={method.info.description}>
              <MethodDescription
                style={styles.header}
                headerLabel="Description"
              >
                {method.info.description}
              </MethodDescription>
            </Show>
            <Show if={method.info.parameters}>
              <MethodDescription
                style={styles.header}
                headerLabel="Parameters"
              >
                <ParamsList parameters={method.info.parameters} />
              </MethodDescription>
            </Show>
            <Show if={dependencies}>
              <MethodDescription
                style={styles.header}
                headerLabel="Dependencies"
              >
                <DependenciesList dependencies={dependencies} />
              </MethodDescription>
            </Show>
          </div>
          <div
            style={styles.authorInfoContainer}
            className="col-sm-17"
          >
            <CodeExample
              methodType={method.type.toUpperCase()}
              currentLanguage={currentLanguage}
              endpointName={endpointName}
              socketName={socketName}
              codeExamples={method.info.response && method.info.response.examples}
            />
          </div>
        </div>
      ))
    ));

    return (
      <div>
        {endpointsList}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {renderTitle()}
      {renderEndpoints()}
    </div>
  );
};

export default SocketsRegistryContentSection;
