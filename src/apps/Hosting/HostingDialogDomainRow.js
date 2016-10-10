import React from 'react';

import {
  FlatButton,
  TableRow,
  TableRowColumn,
  TextField
} from 'material-ui';

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
      flex: 1,
      justifyContent: 'space-between'
    },
    tableRowColumn: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 14
    }
  };

  const handleDomainChange = handleChangeCurrentDomain || handleChangeNewDomain;
  const handleDomainRemove = () => handleRemoveDomain(domain);
  const addButton = (
    <FlatButton
      data-e2e="domain-add-button"
      label="Add"
      secondary={true}
      disabled={!domain}
      onClick={handleAddNewDomain}
    />
  );
  const deleteButton = (
    <FlatButton
      label="Remove"
      secondary={true}
      onClick={handleDomainRemove}
    />
  );
  const renderActionButton = handleChangeNewDomain ? addButton : deleteButton;

  return (
    <TableRow style={styles.tableRow}>
      <TableRowColumn style={styles.tableRowColumn}>
        {`https://${currentInstanceName}--`}
        <TextField
          name={handleChangeNewDomain ? 'newDomain' : `domain-${domain}`}
          hintText="domain"
          fullWidth={true}
          value={domain}
          onChange={handleDomainChange}
        />
        .syncano.site/
      </TableRowColumn>
      <TableRowColumn style={{ ...styles.tableRowColumn, ...styles.tableRowButtonColumn }}>
        {renderActionButton}
      </TableRowColumn>
    </TableRow>
  );
};

export default HostingDialogDomainRow;
