import React from 'react';
import Radium from 'radium';

import ListItem from './ChannelHistoryListItem';
import { FontIcon } from 'material-ui';
import { ColumnList, Loading, Lists } from '../../common/';

const Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'ChannelHistoryList',

  getStyles() {
    return {
      noHistoryContainer: {
        padding: '96px 0',
        textAlign: 'center'
      },
      noHistoryIcon: {
        fontSize: 96,
        lineHeight: 1,
        marginBottom: 16,
        color: 'rgba(0, 0, 0, 0.24)'
      },
      noHistoryText: {
        color: 'rgba(0, 0, 0, 0.67)',
        fontSize: 34,
        margin: 0
      }
    };
  },

  renderItem(item) {
    return (
      <ListItem
        key={`channels--history-list-item-${item.id}`}
        item={item}
      />
    );
  },

  renderList() {
    return (
      <div>
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-sm-11"
            primary={true}
            columnName="ICON_NAME"
          >
            Real-time Channel History
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-sm-3"
            columnName="ID"
          >
            ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-sm-6"
            columnName="Desc"
          >
            Room
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-sm-4"
            columnName="Desc"
          >
            Action
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-sm-6"
            columnName="Desc"
          >
            Metadata
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="Date"
          >
            Created
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="channels-list"
          renderItem={this.renderItem}
        />
      </div>
    );
  },

  renderEmptyContent() {
    const styles = this.getStyles();

    return (
      <div style={styles.noHistoryContainer}>
        <FontIcon
          style={styles.noHistoryIcon}
          className="synicon-bullhorn"
        />
        <p style={styles.noHistoryText}>There is no message history for this Channel yet</p>
      </div>
    );
  },

  render() {
    const { items, isLoading } = this.props;

    return (
      <Lists.Container>
        <Loading show={isLoading}>
          {items.length ? this.renderList() : this.renderEmptyContent()}
        </Loading>
      </Lists.Container>
    );
  }
}));
