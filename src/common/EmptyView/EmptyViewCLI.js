import React from 'react';
import _ from 'lodash';

import Show from '../Show';
import { FontIcon, FlatButton, RaisedButton } from 'material-ui';
import { BashSnippet } from '../../common';

const EmptyViewCLI = ({
  bashSnippets,
  buttonLabel,
  CLITitle,
  CLIDescription,
  docsUrl,
  description,
  handleClick,
  hostingDocsUrl,
  hostingDocsButtonLabel,
  iconClassName,
  iconColor,
  mainTitle,
  showDocsUrl = true,
  urlLabel,
  actionButton = (
    <RaisedButton
      label={buttonLabel}
      primary={true}
      onTouchTap={handleClick}
      data-e2e="zero-state-add-button"
    />
  ),
  ...other
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '40px 60px'
    },
    mainContainer: {
      width: 640,
      height: 770,
      border: '2px #dedede dashed',
      borderRadius: 5,
      margin: '50px auto 0 auto',
      color: '#000'
    },
    icon: {
      fontSize: 72
    },
    title: {
      marginTop: 40,
      fontSize: 26,
      fontWeight: 400,
      lineHeight: '34px'
    },
    description: {
      lineHeight: '26px',
      fontSize: 18
    },
    docsButton: {
      marginTop: 10
    }
  };

  const renderSnippets = (items) => (
    _.map(items, (item) => (
      <BashSnippet
        description={item.description}
        snippet={item.snippet}
      />
      )
    )
  );

  return (
    <div
      data-e2e={other['data-e2e']}
      style={styles.mainContainer}
    >
      <div style={styles.container}>
        <FontIcon
          className={iconClassName}
          color={iconColor}
          style={styles.icon}
        />
        <div style={styles.title}>
          {mainTitle}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        <Show if={showDocsUrl}>
          <div style={styles.description}>
            Read our
            <a
              href={docsUrl}
              target="_blank"
            >
              {` ${urlLabel} docs `}
            </a>
            to learn more.
          </div>
        </Show>
        {actionButton}
        <div style={styles.title}>
          {CLITitle}
        </div>
        <div style={styles.description}>
          {CLIDescription}
          <a
            href="https://github.com/Syncano/syncano-cli"
            target="_blank"
          >
            Syncano CLI.
          </a>
        </div>
        {renderSnippets(bashSnippets)}
        <FlatButton
          label={hostingDocsButtonLabel}
          primary={true}
          href={hostingDocsUrl}
          target="_blank"
          style={styles.docsButton}
        />
      </div>
    </div>
  );
};

export default EmptyViewCLI;
