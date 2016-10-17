import React from 'react';
import _ from 'lodash';
import shortId from 'shortid';
import dedent from 'dedent';

import SessionStore from '../../Session/SessionStore';

import { colors as Colors } from 'material-ui/styles';
import { CodePreview } from '../../../common';

const CustomSocketCodeExamples = ({ socketName, currentLanguage, endpointName, methodType, codeExamples }) => {
  const getCurrentLanguageExample = (language) => {
    const isGetMethod = methodType === 'GET';
    const accountKey = SessionStore.getToken();
    const baseUrl = `${SYNCANO_BASE_URL}/v1.1/`;
    const examplesLang = {
      curl: `curl -X ${methodType} \\\n` +
        `-H "X-API-KEY: ${accountKey}" \\\n` +
        `-H "Content-type: application/json" \\\n` +
        `${!isGetMethod ? "-d '{ \"data\": \"something\"}' \\\n" : ''}` +
        `"${baseUrl}instances/your_instance/endpoints/sockets/${socketName}/${endpointName}/"`,
      javascript: dedent(`
        var Syncano = require('syncano');
        var connection = Syncano({
          accountKey: '${accountKey}'
        });

        var params = {
          name: '${endpointName}',
          instanceName: 'your_instance',
          socket_name: '${socketName}'
        };

        var endpoint = connection.Endpoint(params);

        endpoint.run(${!isGetMethod ? `'${methodType}', { data: 'something' }` : ''});
      `),
      python: dedent(`
        import syncano
        from syncano.models import CustomSocket

        syncano.connect(api_key="${accountKey}")

        custom_socket = CustomSocket.please.get(instance_name="your_instance", name="${socketName}")
        result = custom_socket.run("${endpointName}"${!isGetMethod ? `, method="${methodType}", data="something"` : ''})
        print result
      `),
      cli: dedent(`
        syncano sockets run ${socketName}/${endpointName} ${!isGetMethod ? `${methodType} -d data=something` : ''}
      `)
    };

    const formatedExample = examplesLang[language];

    return formatedExample;
  };

  const styles = {
    codeExamplesContainer: {
      lineHeight: 1.8,
      width: '100%',
      color: Colors.grey300
    },
    editorContainer: {
      margin: '16px 24px',
      padding: '8px 24px',
      maxHeight: '400px',
      overflow: 'scroll',
      backgroundColor: '#383838',
      wordBreak: 'break-all',
      whiteSpace: 'normal'
    },
    codePreview: {
      wordBreak: 'break-all',
      whiteSpace: 'normal'
    }
  };

  const renderExampleRequest = () => {
    const language = currentLanguage === 'nodejs' ? 'javascript' : currentLanguage;

    return (
      <div className="vm-2-b hm-3-l hm-3-r vm-3-t">
        Example Request:
        <div>
          <CodePreview.Item
            languageClassName={language}
            code={getCurrentLanguageExample(language)}
          />
        </div>
      </div>
    );
  };

  const renderExampleResponses = () => {
    const responses = _.map(codeExamples, (code) => (
      <div
        className="vm-4-t"
        key={shortId.generate()}
      >
        <div className="vm-2-b hm-3-l">
          Example response: {code.description}
        </div>
        <div className="vm-2-b hm-3-l">
          Exit code: {code.exit_code}
        </div>
        <div style={styles.editorContainer}>
          <pre>
            {code.example}
          </pre>
        </div>
      </div>
    ));

    return responses;
  };

  return (
    <div style={styles.codeExamplesContainer}>
      {renderExampleRequest()}
      {renderExampleResponses()}
    </div>
  );
};

export default CustomSocketCodeExamples;
