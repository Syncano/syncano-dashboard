import React from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router';
import fileSize from 'filesize';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const HostingFileListItem = Radium(({ item, onFolderEnter, onIconClick, showDeleteDialog }) => {
  const lastSlashIndex = item.path.lastIndexOf('/');
  const lastCommaIndex = item.path.lastIndexOf('.');
  const fileName = item.isFolder ? item.folderName : item.path.substring(lastSlashIndex + 1);
  const fileType = item.isFolder ? 'folder' : item.path.substring(lastCommaIndex + 1);

  const fileIconConfigs = {
    html: {
      icon: 'file-html-outline',
      color: Colors.orange500
    },
    css: {
      icon: 'file-css-outline',
      color: Colors.blue500
    },
    js: {
      icon: 'file-js-outline',
      color: Colors.yellow600
    },
    folder: {
      icon: 'folder',
      color: Colors.green500
    },
    default: {
      icon: 'file-document-outline',
      color: Colors.indigo400
    }
  };
  const iconConfig = fileIconConfigs[fileType] || fileIconConfigs.default;
  const styles = {
    folderName: {
      cursor: 'pointer',
      ':hover': {
        color: Colors.blue500
      }
    }
  };
  const handleClickFolderName = () => {
    onFolderEnter(fileName);
  };
  const getFolderName = () => {
    if (item.isFolder) {
      return (
        <div
          style={styles.folderName}
          onClick={handleClickFolderName}
        >
          {fileName}
        </div>
      );
    }

    return fileName;
  };

  return (
    <ColumnList.Item
      checked={item.checked}
      key={item.id}
    >
      <Column.CheckIcon
        className="col-flex-1"
        id={item.id}
        iconClassName={iconConfig.icon}
        background={iconConfig.color}
        checked={item.checked}
        handleIconClick={onIconClick}
        primaryText={getFolderName()}
      />
      <Column.Desc className="col-sm-4">
        {fileSize(item.size)}
      </Column.Desc>
      <Column.Menu data-e2e={`${fileName}-hosting-file-dropdown-icon`}>
        <MenuItem
          onTouchTap={showDeleteDialog}
          primaryText="Delete"
          data-e2e="dropdown-hosting-file-item-delete"
        />
      </Column.Menu>
    </ColumnList.Item>
  );
});

export default withRouter(HostingFileListItem);
