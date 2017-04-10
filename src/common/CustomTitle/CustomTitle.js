import React from 'react';
import Truncate from '../Truncate';

const CustomTitle = ({ title, id, ...other }) => {
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
      fontWeight: '100',
      opacity: '0.9',
      color: '#FFFFFF',
      lineHeight: '56px',
      width: '100%'
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
    <div style={styles.titleWrapper}>
      <Truncate
        data-e2e={other[`data-e2e`]}
        text={title}
      />
      {renderId()}
    </div>
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
