import React from 'react';

import {
  FlatButton,
  TableRow,
  TableRowColumn,
  TextField } from 'material-ui';

import SessionStore from '../Session/SessionStore';

const HostingDialogDomainRow = ({
  domain,
  handleChangeCurrentDomain,
  handleChangeNewDomain,
  handleAddNewDomain,
  handleRemoveDomain
}) => {
  const currentInstance = SessionStore.getInstance();
  const currentInstanceName = currentInstance && currentInstance.name;
  const styles = {
    tableRow: {
      display: 'flex',
      borderBottom: 'none',
      flex: 1
    },
    tableRowColumn: {
      display: 'flex',
      alignItems: 'center'
    },
    tableRowColumnLink: {
      overflowX: 'scroll',
      marginLeft: 0
    },
    tableRowColumnButton: {
      justifyContent: 'center'
    }
  };

  const handleDomainChange = handleChangeCurrentDomain || handleChangeNewDomain;
  const handleDomainRemove = () => handleRemoveDomain(domain);
  const renderActionButton = () => (
    handleChangeNewDomain ?
      <FlatButton
        label="Add"
        secondary={true}
        disabled={!domain}
        onClick={handleAddNewDomain}
      /> :
      <FlatButton
        label="Remove"
        secondary={true}
        onClick={handleDomainRemove}
      />
  );

  return (
    <TableRow style={styles.tableRow}>
      <TableRowColumn
        className="col-flex-2"
        style={styles.tableRowColumn}
      >
        <TextField
          name="domain"
          hintText="Domain"
          fullWidth={true}
          value={domain}
          onChange={handleDomainChange}
        />
      </TableRowColumn>
      <TableRowColumn
        className="col-flex-2"
        style={{ ...styles.tableRowColumn, ...styles.tableRowColumnLink }}
      >
        <a href={`https://${currentInstanceName}--${domain}.syncano.site`} target="_blank">
          https://{currentInstanceName}--{domain}.syncano.site/
        </a>
      </TableRowColumn>
      <TableRowColumn
        className="col-flex-1"
        style={{ ...styles.tableRowColumn, ...styles.tableRowColumnButton }}
      >
        {renderActionButton()}
      </TableRowColumn>
    </TableRow>
  );
};

export default HostingDialogDomainRow;
