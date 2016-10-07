import React from 'react';

import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody } from 'material-ui';

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
    tableRow: {
      display: 'flex'
    },
    tableHeaderColumn: {
      display: 'flex',
      alignItems: 'center'
    },
    tableHeaderColumnButton: {
      justifyContent: 'center'
    },
    tableBody: {
      display: 'block',
      maxHeight: 240
    }
  };

  return (
    <div>
      <Table>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow style={styles.tableRow}>
            <TableHeaderColumn
              className="col-flex-2"
              style={styles.tableHeaderColumn}
            >
              Domain
            </TableHeaderColumn>
            <TableHeaderColumn
              className="col-flex-2"
              style={styles.tableHeaderColumn}
            >
              Link
            </TableHeaderColumn>
            <TableHeaderColumn
              className="col-flex-1"
              style={{ ...styles.tableHeaderColumn, ...styles.tableHeaderColumnButton }}
            >
              Action
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
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
