import React from 'react';
import _ from 'lodash';
import pluralize from 'pluralize';

import {
  FontIcon,
  RaisedButton,
  Table,
  TableBody,
  TableRowColumn,
  TableRow,
  TableHeader,
  TableHeaderColumn
} from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { BashSnippet } from '../../common';

const EmptyViewCLI = ({
  bashSnippets,
  buttonLabel,
  CLITitle,
  CLIDescription,
  description,
  errorResponses,
  handleClick,
  headerImageSrc,
  iconClassName,
  iconColor,
  mainTitle,
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
      border: '2px #dedede dashed',
      borderRadius: 5,
      margin: '50px auto 0 auto',
      color: '#000'
    },
    headerImage: {
      display: 'block'
    },
    icon: {
      fontSize: 72
    },
    title: {
      marginTop: 40,
      fontSize: 26,
      fontWeight: 400,
      lineHeight: '34px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    description: {
      lineHeight: '26px',
      fontSize: 18
    },
    docsButton: {
      marginTop: 10
    },
    errorIcon: {
      marginRight: 5,
      display: 'inline-flex',
      fontSize: 30
    },
    tableBody: {
      display: 'block',
      height: 250
    },
    tableRow: {
      display: 'flex'
    },
    tableRowColumnLeft: {
      flex: 2,
      textOverflow: 'clip',
      overflow: 'scroll',
      paddingLeft: 0
    },
    tableRowColumnRight: {
      flex: 1,
      color: Colors.red500
    },
    tableHeaderColumnLeft: {
      flex: 2
    },
    tableHeaderColumnRight: {
      flex: 1
    },
    alignCenter: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  };

  const renderHeaderImage = () => {
    if (iconClassName) {
      return (
        <FontIcon
          className={iconClassName}
          color={iconColor}
          style={styles.icon}
        />
      );
    }

    return (
      <img
        src={headerImageSrc}
        alt="sample hosting file icons"
        style={styles.headerImage}
      />
    );
  };

  const renderSnippets = (
    _.map(bashSnippets, (item) => (
      <BashSnippet
        snippet={item.snippet}
      />
     )
    )
  );

  const renderErrors = (
    _.map(errorResponses, (errorResponse) => {
      const fieldsErrors = errorResponse.errors && (errorResponse.errors.path || errorResponse.errors.file);

      errorResponse.message = errorResponse.message[0].toUpperCase() + errorResponse.message.slice(1);
      const error = fieldsErrors || errorResponse.message;

      return (
        <TableRow style={styles.tableRow}>
          <TableRowColumn style={{ ...styles.tableRowColumnLeft, ...styles.alignCenter }}>
            {errorResponse.file.path}
          </TableRowColumn>
          <TableRowColumn style={{ ...styles.tableRowColumnRight, ...styles.alignCenter }}>
            {error}
          </TableRowColumn>
        </TableRow>
      );
    })
  );
  const pluralizedFiles = pluralize('files', errorResponses.length);
  const renderErrorsView = (
    <div>
      <div style={styles.title}>
        <FontIcon
          className="synicon-alert-circle-outline"
          color={Colors.red500}
          style={styles.errorIcon}
          data-e2e="hosting-files-alert-icon"
        />
        <span>Errors</span>
      </div>
      <div style={styles.description}>
        The following {errorResponses.length} {pluralizedFiles} had problems while uploading.
      </div>
      <Table style={styles.table}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow style={styles.tableRow}>
            <TableHeaderColumn style={{ ...styles.tableHeaderColumnLeft, ...styles.alignCenter }}>
              Path
            </TableHeaderColumn>
            <TableHeaderColumn style={{ ...styles.tableHeaderColumnRight, ...styles.alignCenter }}>
              Error
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          style={styles.tableBody}
        >
          {renderErrors}
        </TableBody>
      </Table>
    </div>
  );

  const renderCLIUsage = (
    <div>
      <div style={styles.title}>
        {CLITitle}
      </div>
      <div style={styles.description}>
        {CLIDescription}
        <a
          href="https://syncano.github.io/syncano-node-cli/#/project/hosting"
          target="_blank"
        >
          Syncano CLI:
        </a>
      </div>
      {renderSnippets}
    </div>
  );

  return (
    <div
      data-e2e={other['data-e2e']}
      style={styles.mainContainer}
    >
      <div style={styles.container}>
        {renderHeaderImage()}
        {!errorResponses.length ? renderCLIUsage : renderErrorsView}
        <div style={styles.title}>
          {mainTitle}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        {actionButton}
      </div>
    </div>
  );
};

export default EmptyViewCLI;
