import React from 'react';
import classNames from 'classnames';
import { colors as Colors } from 'material-ui/styles';
import { FontIcon, TableHeaderColumn } from 'material-ui';

const TableHeaderSortableColumn = ({ id, sortable, onLabelClick, currentOrderBy, children, ...other }) => {
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
    if (!sortable || !onLabelClick) {
      return null;
    }

    const className = classNames({
      'synicon-sort-ascending': currentOrderBy === id,
      'synicon-sort-descending': currentOrderBy === `-${id}`
    });

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
    if (!sortable || !onLabelClick) {
      return children;
    }

    const handleClick = () => {
      onLabelClick(id);
    };

    return (
      <div
        style={styles.children}
        onClick={handleClick}
      >
        {children}
        {renderSortingIcon()}
      </div>
    );
  };

  return (
    <TableHeaderColumn {...other}>
      {renderChildren()}
    </TableHeaderColumn>
  );
};

export default TableHeaderSortableColumn;
