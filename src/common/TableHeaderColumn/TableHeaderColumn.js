import React from 'react';

import { colors as Colors } from 'material-ui/styles';
import { FontIcon, TableHeaderColumn as MaterialUITableHeaderColumn } from 'material-ui';

const TableHeaderColumn = ({ id, sortable, clickHandler, currentOrderBy, children, ...other }) => {
  const styles = {
    children: {
      color: Colors.blue500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end'
    },
    fontIcon: {
      fontSize: 14,
      marginLeft: 10,
      position: 'relative',
      top: 3
    }
  };

  const renderSortingIcon = () => {
    if (!sortable) {
      return null;
    }

    let className = null;

    if (currentOrderBy === id) className = 'synicon-sort-ascending';
    if (currentOrderBy === `-${id}`) className = 'synicon-sort-descending';

    if (!className) {
      return null;
    }

    return (
      <FontIcon
        className={className}
        style={styles.fontIcon}
      />
    );
  };

  const renderChildren = () => {
    if (sortable) {
      return (
        <div
          style={styles.children}
          onClick={clickHandler}
        >
          {children}
          {renderSortingIcon()}
        </div>
      );
    }

    return children;
  };

  return (
    <MaterialUITableHeaderColumn {...other}>
      {renderChildren()}
    </MaterialUITableHeaderColumn>
  );
};

export default TableHeaderColumn;
