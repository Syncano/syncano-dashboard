import React from 'react';
import _ from 'lodash';

import TraceBigResult from './TraceBigResult';

const styles = {
  root: {
    padding: '25px',
    color: 'white',
    whiteSpace: 'pre-wrap',
    font: '12px/normal \'Monaco\', monospace',
    backgroundColor: '#4C4A43'
  }
};

const TraceResult = ({ result, style, onLoadMore, ...other }) => {
  const loadFullTrace = (event) => {
    event.stopPropagation();
    if (_.isFunction(onLoadMore)) {
      onLoadMore();
    }
  };

  const renderResult = () => {
    if (result === 'Result is too big to show in trace.') {
      return (
        <TraceBigResult
          onClick={loadFullTrace}
        />
      );
    }
    return result;
  };

  return (
    <div
      {...other}
      style={{ ...styles.root, ...style }}
    >
      {renderResult()}
    </div>
  );
};

export default TraceResult;
