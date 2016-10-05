import React from 'react';
import { Avatar, IconButton } from 'material-ui';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const SolutionVersionsListItem = ({ item, onInstallClick }) => {
  const handleDownloadVersion = () => {
    window.open(item.data.url, '_blank');
  };

  return (
    <ColumnList.Item
      key={item.id}
      id={item.id}
    >
      <Column.Desc className="col-xs-5 col-md-5">
        <div style={{ marginLeft: 10 }}>
          <Avatar style={{ fontSize: '1rem' }}>
            {item.number}
          </Avatar>
        </div>
      </Column.Desc>

      <Column.Date date={item.created_at} />

      <Column.Desc>
        {item.type}
      </Column.Desc>

      <Column.ID className="col-xs-5 col-md-5">
        {item.installations_count}
      </Column.ID>

      <Column.ID className="col-xs-4 col-md-4">
        <IconButton
          iconClassName="synicon-cloud-download"
          tooltip="Download this Solution version file"
          onClick={handleDownloadVersion}
        />
      </Column.ID>

      <Column.ID className="col-xs-4 col-md-4">
        <IconButton
          iconClassName="synicon-download"
          tooltip="Install this Solution version"
          onClick={() => onInstallClick(item.id)}
        />
      </Column.ID>

    </ColumnList.Item>
  );
};

export default SolutionVersionsListItem;
