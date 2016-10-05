import React from 'react';

import { Paper } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, TraceResult, TraceBigResult } from '../../common/';

const Column = ColumnList.Column;

const TracesListItem = ({ item, onToggle, onLoadMore, visible = true }) => {
  const styles = {
    traceResult: {
      maxHeight: 500,
      overflow: 'auto',
      transition: 'max-height 450ms ease-in'
    }
  };

  const status = {
    blocked: {
      background: 'rgba(0, 0, 0, .2)',
      icon: 'alert',
      duration: 'not executed'
    },
    processing: {
      background: Colors.lightBlue500,
      icon: 'play',
      duration: 'processing'
    },
    pending: {
      background: Colors.lightBlue500,
      icon: 'timelapse',
      duration: 'pending'
    },
    success: {
      background: Colors.green400,
      icon: 'check',
      duration: `${item.duration}ms`
    },
    failure: {
      background: Colors.red400,
      icon: 'alert',
      duration: `${item.duration}ms`
    },
    timeout: {
      background: Colors.red400,
      icon: 'alert',
      duration: `${item.duration}ms`
    }
  }[item.status];

  if (item.executed_at && item.duration === null) {
    status.duration = 'execution problem';
  }

  if (!visible) {
    styles.traceResult = {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 450ms ease-out'
    };
    styles.trace = {
      margin: 0
    };
  }

  const { stdout, stderr, __error__ } = item.result;
  const emptyResultText = item.status === 'processing' ? 'still running...' : 'no response';
  let result = stdout || emptyResultText;
  let error = stderr || __error__;
  const handleLoadMore = (event) => {
    event.stopPropagation();
    onLoadMore(item.scriptId, item.id);
  };

  if (error === 'Result is too big to show in trace.') {
    result = <TraceBigResult onClick={handleLoadMore} />;
    error = null;
  }

  return (
    <Paper
      key={item.id}
      zDepth={1}
      style={styles.trace}
      visible={visible}
    >
      <ColumnList.Item
        checked={item.checked}
        id={item.id}
        zDepth={0}
        handleClick={onToggle}
      >
        <Column.CheckIcon
          id={item.id.toString()}
          className="col-flex-1"
          iconClassName={status.icon}
          background={status.background}
          checkable={false}
          primaryText={item.status}
          secondaryText={`ID: ${item.id}`}
        />
        <Column.Desc className="col-sm-6">
          {status.duration}
        </Column.Desc>
        <Column.Date
          date={item.executed_at}
          ifInvalid={item.status}
        />
      </ColumnList.Item>
      <div style={styles.traceResult}>
        <TraceResult
          result={result}
          error={error}
          onLoadMore={handleLoadMore}
        />
      </div>
    </Paper>
  );
};

export default TracesListItem;
