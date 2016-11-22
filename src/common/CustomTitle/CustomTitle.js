import React from 'react';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

const CustomTitle = ({ title, id, style }) => {
  const styles = {
    id: {
      padding: '0 5px'
    },
    titleWrapper: {
      display: 'flex',
      flex: 1,
      marginRight: 10,
      minWidth: 0,
      whiteSpace: 'nowrap',
      fontSize: 20,
      color: 'rgba(0, 0, 0, .4)',
      lineHeight: '56px',
      width: '100%'
    },
    toolbarTooltip: {
      top: 26
    },
    tooltipRootStyle: {
      flex: 1,
      minWidth: 0
    }
  };

  const renderId = () => {
    if (!id) {
      return null;
    }

    return <span style={styles.id}>(id: {id})</span>;
  };

  if (!title) {
    return null;
  }

  return (
    <Tooltip
      label={title}
      style={styles.toolbarTooltip}
      rootStyle={{ ...styles.tooltipRootStyle, ...style }}
      touch={true}
    >
      <div style={styles.titleWrapper}>
        <Truncate text={title} />
        {renderId()}
      </div>
    </Tooltip>
  );
};

CustomTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default CustomTitle;
