import React from 'react';
import { ColumnList, Loading } from '../';

export default React.createClass({
  displayName: 'List',

  propTypes: {
    children: React.PropTypes.node
  },

  renderList() {
    const { children, items, renderItem, emptyItemHandleClick, emptyView, emptyItemContent } = this.props;

    if (children) {
      return children;
    }

    if (items && items.length > 0) {
      return items.map((item, index) => renderItem(item, index));
    }

    if (emptyView) {
      return emptyView;
    }

    return (
      <ColumnList.EmptyItem handleClick={emptyItemHandleClick}>
        {emptyItemContent}
      </ColumnList.EmptyItem>
    );
  },

  render() {
    const { isLoading } = this.props;

    return (
      <Loading show={isLoading}>
        {this.renderList()}
      </Loading>
    );
  }
});
