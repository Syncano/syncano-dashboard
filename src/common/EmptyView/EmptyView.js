import React from 'react';

import Show from '../Show';
import { FontIcon, RaisedButton } from 'material-ui';

const EmptyView = ({
  title,
  showDocsUrl = true,
  iconClassName,
  iconColor,
  buttonLabel,
  handleClick,
  docsUrl,
  description,
  urlLabel,
  shouldBeHidden,
  actionButton = (
    <RaisedButton
      label={buttonLabel}
      data-e2e="zero-state-add-button"
      primary={true}
      onTouchTap={handleClick}
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
      padding: '70px 60px'
    },
    mainContainer: {
      width: 640,
      height: 510,
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
    }
  };

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
          {title}
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
        {shouldBeHidden ? null : actionButton}
      </div>
    </div>
  );
};

export default EmptyView;
