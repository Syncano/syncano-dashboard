import React from 'react';

import ListItem from './VersionsListItem';
import { ColumnList, Lists } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SolutionVersionsList',

  renderItem(item) {
    return <ListItem onInstallClick={this.props.onInstall} item={item} />;
  },

  render() {
    return (
      <Lists.Container>
        <ColumnList.Header>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-5"
          >
            <span style={{ fontSize: '1.2rem' }}>{this.props.name}</span>
          </Column.ColumnHeader>

          <Column.ColumnHeader columnName="DATE">
            Created
          </Column.ColumnHeader>

          <Column.ColumnHeader columnName="DESC">
            Type
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-5"
          >
            Installations
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-4"
          >
            Download
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-4"
          >
            Install
          </Column.ColumnHeader>

        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="versions-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});

