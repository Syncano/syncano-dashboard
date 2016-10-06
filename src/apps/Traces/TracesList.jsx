import React, { Component } from 'react';
import _ from 'lodash';
import { ColumnList, Loading, Lists } from '../../common/';
import TracesListItem from './TracesListItem';
import TracesEmptyView from './TracesEmptyView';

const Column = ColumnList.Column;

class TracesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTraceId: _.compact(_.map(props.items, (item) => (item.result.stderr || item.result.stdout) && item.id))
    };
  }

  handleToggleTrace(traceId) {
    console.info('ScriptsTraces::toggleTrace', traceId);
    const { visibleTraceId } = this.state;
    const isVisible = _.includes(visibleTraceId, traceId);
    const newVisibleTraceId = isVisible ? _.without(visibleTraceId, traceId) : [...visibleTraceId, traceId];

    this.setState({ visibleTraceId: newVisibleTraceId });
  }

  renderList() {
    const { items, onLoadMore } = this.props;
    const { visibleTraceId } = this.state;

    return (
      <Lists.List key="traces-list">
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="ICON_NAME"
            className="col-flex-1"
          >
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6"
          >
            Duration
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Executed</Column.ColumnHeader>
        </ColumnList.Header>
        {_.map(items, (item) => (
          <TracesListItem
            item={item}
            key={item.id}
            visible={_.includes(visibleTraceId, item.id)}
            onToggle={() => this.handleToggleTrace(item.id)}
            onLoadMore={onLoadMore}
          />
        ))}
      </Lists.List>
    );
  }

  render() {
    const { items, isLoading, tracesFor } = this.props;

    return (
      <Lists.Container>
        <Loading show={isLoading}>
          {items.length ? this.renderList() : <TracesEmptyView tracesFor={tracesFor} />}
        </Loading>
      </Lists.Container>
    );
  }
}

export default TracesList;
