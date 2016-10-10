import React from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui';

import HostingDialogDomainRow from './HostingDialogDomainRow';
import HostingDialogDomainsList from './HostingDialogDomainsList';

const HostingDialogDomainTable = ({
  handleAddNewDomain,
  handleRemoveDomain,
  handleChangeDomains,
  domains,
  handleChangeNewDomain,
  newDomain
}) => {
  const styles = {
    tableBody: {
      display: 'block',
      maxHeight: 240
    },
    tableRow: {
      display: 'flex',
      justifyContent: 'space-between',
      border: 'none'
    },
    tableHeaderColumn: {
      display: 'flex',
      alignItems: 'center'
    },
    tableHeaderColumnButton: {
      justifyContent: 'center',
      width: 140
    }
  };

  const renderTableHeader = () => (
    <TableHeader
      adjustForCheckbox={false}
      displaySelectAll={false}
    >
      <TableRow style={styles.tableRow}>
        <TableHeaderColumn style={styles.tableHeaderColumn}>
          Domain
        </TableHeaderColumn>
        <TableHeaderColumn style={{ ...styles.tableHeaderColumn, ...styles.tableHeaderColumnButton }}>
          Action
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );

  return (
    <div>
      <Table>
        {renderTableHeader()}
        <TableBody
          displayRowCheckbox={false}
          style={styles.tableBody}
        >
          <HostingDialogDomainsList
            domains={domains}
            handleAddNewDomain={handleAddNewDomain}
            handleRemoveDomain={handleRemoveDomain}
            handleChangeDomains={handleChangeDomains}
          />
        </TableBody>
      </Table>
      <HostingDialogDomainRow
        domain={newDomain}
        handleAddNewDomain={handleAddNewDomain}
        handleRemoveDomain={handleRemoveDomain}
        handleChangeNewDomain={handleChangeNewDomain}
      />
    </div>
  );
};

export default HostingDialogDomainTable;
