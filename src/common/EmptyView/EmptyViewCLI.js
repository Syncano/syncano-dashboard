import React from 'react';
import _ from 'lodash';

import Show from '../Show';
import {
  FontIcon,
  FlatButton,
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
  docsUrl,
  description,
  handleClick,
  handleErrorsButtonClick,
  hostingDocsUrl,
  hostingDocsButtonLabel,
  iconClassName,
  iconColor,
  isUploadFinished,
  mainTitle,
  showDocsUrl = true,
  uploadErrors,
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
    },
    errorsBackButton: {
      marginTop: 15
    }
  };

  const renderSnippets = (
    _.map(bashSnippets, (item) => (
      <BashSnippet
        description={item.description}
        snippet={item.snippet}
      />
      )
    )
  );

  const renderErrors = (
    _.map(uploadErrors, (error) => (
      <TableRow style={styles.tableRow}>
        <TableRowColumn style={{ ...styles.tableRowColumnLeft, ...styles.alignCenter }}>
          {error.file.path}
        </TableRowColumn>
        <TableRowColumn style={{ ...styles.tableRowColumnRight, ...styles.alignCenter }}>
          {error.errors.path || error.errors.file || error.responseText}
        </TableRowColumn>
      </TableRow>
    ))
  );

  const renderErrorsView = (
    <div>
      <div style={styles.title}>
        <FontIcon
          className="synicon-alert-circle-outline"
          color={Colors.red500}
          style={styles.errorIcon}
        />
        <span>Errors</span>
      </div>
      <div style={styles.description}>
        The following {uploadErrors.length} files had problems while uploading.
      </div>
      <Table style={styles.table}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow style={styles.tableRow}>
            <TableHeaderColumn
              style={{ ...styles.tableHeaderColumnLeft, ...styles.alignCenter }}
            >
              Path
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{ ...styles.tableHeaderColumnRight, ...styles.alignCenter }}
            >
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
      <FlatButton
        label="Back"
        primary={true}
        style={styles.errorsBackButton}
        onTouchTap={handleErrorsButtonClick}
        disabled={!isUploadFinished}
      />
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
          href="https://github.com/Syncano/syncano-cli"
          target="_blank"
        >
          Syncano CLI.
        </a>
      </div>
      {renderSnippets}
      <FlatButton
        label={hostingDocsButtonLabel}
        primary={true}
        href={hostingDocsUrl}
        target="_blank"
        style={styles.docsButton}
      />
    </div>
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
        {!uploadErrors.length ? renderCLIUsage : renderErrorsView}
      </div>
    </div>
  );
};

export default EmptyViewCLI;
