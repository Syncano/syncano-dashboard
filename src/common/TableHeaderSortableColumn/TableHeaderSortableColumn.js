import React from 'react';
import classNames from 'classnames';
import { colors as Colors } from 'material-ui/styles';
import { FontIcon, TableHeaderColumn } from 'material-ui';

const TableHeaderSortableColumn = ({ id, sortable, onLabelClick, currentSortingField, children, ...other }) => {
  const styles = {
    root: {
      color: Colors.blue500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end'
    },
    childrenContainer: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    fontIconContainer: {
      flex: '0 0 18px',
      marginLeft: 10
    },
    fontIcon: {
      fontSize: 14,
      position: 'relative',
      top: 3
    }
  };

  const renderSortingIcon = () => {
    if (!sortable || !onLabelClick) {
      return null;
    }

    const className = classNames({
      'synicon-sort-ascending': currentSortingField === id,
      'synicon-sort-descending': currentSortingField === `-${id}`
    });

    if (!className) {
      return null;
    }

    return (
      <div style={styles.fontIconContainer}>
        <FontIcon
          className={className}
          style={styles.fontIcon}
        />
      </div>
    );
  };

  const renderChildrenOnly = () => (
    <div
      title={children}
      style={styles.childrenContainer}
    >
      {children}
    </div>
  );

  const renderContent = () => {
    if (!sortable || !onLabelClick) {
      return renderChildrenOnly();
    }

    const handleClick = () => {
      onLabelClick(id);
    };

    const title = `Sort by ${children} field`;

    return (
      <div
        title={title}
        style={styles.root}
        onClick={handleClick}
      >
        <div style={styles.childrenContainer}>
          {children}
        </div>
        {renderSortingIcon()}
      </div>
    );
  };

  return (
    <TableHeaderColumn {...other}>
      {renderContent()}
    </TableHeaderColumn>
  );
};

export default TableHeaderSortableColumn;
