import React from 'react';

import { Table, TableBody } from 'material-ui';

import HostingDialogDomainRow from './HostingDialogDomainRow';
import HostingDialogDomainsList from './HostingDialogDomainsList';

const HostingDialogDomainTable = ({
  domains,
  handleAddNewDomain,
  handleRemoveDomain,
  handleChangeDomains,
  handleChangeNewDomain,
  isDefault,
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

  return (
    <div>
      <Table>
        <TableBody
          displayRowCheckbox={false}
          style={styles.tableBody}
        >
          <HostingDialogDomainsList
            domains={domains}
            handleAddNewDomain={handleAddNewDomain}
            handleRemoveDomain={handleRemoveDomain}
            handleChangeDomains={handleChangeDomains}
            isDefault={isDefault}
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
