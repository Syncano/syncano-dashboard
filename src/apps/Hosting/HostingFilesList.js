import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';

import { ColumnList, Dialog, DirectoryNavigation, Lists, Loading } from '../../common';
import HostingFilesEmptyView from './HostingFilesEmptyView';
import ListItem from './HostingFilesListItem';
import DotsListItem from './DotsListItem';

const Column = ColumnList.Column;

const HostingFilesList = React.createClass({
  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    const { directoryDepth } = this.state;
    const filteredItems = this.filterFolders(nextProps.items);

    if (directoryDepth > 0 && filteredItems < 1) {
      this.moveDirectoryUp();
    }
  },

  getInitialState() {
    return {
      directoryDepth: 0,
      currentFolderName: '',
      previousFolders: []
    };
  },

  getDefaultProps() {
    return {
      getCheckedItems: HostingFilesStore.getCheckedItems,
      checkItem: HostingFilesActions.checkItem,
      checkFolder: this.handleCheckFolder,
      handleUnselectAll: HostingFilesActions.uncheckAll
    };
  },

  getFolderFiles(file) {
    const { items } = this.props;
    const { directoryDepth } = this.state;
    const fileFolderName = file.path.split('/')[directoryDepth];
    const folderFiles = _.filter(items, (item) => {
      const itemFolders = item.path.split('/');
      const hasSubFolders = directoryDepth > itemFolders.length;
      const isFileInCurrentFolder = _.includes(itemFolders, fileFolderName);

      return !hasSubFolders && isFileInCurrentFolder;
    });

    return folderFiles;
  },

  isSupportedBrowser() {
    return !!window.chrome && !!window.chrome.webstore;
  },

  handleCheckFolder(folder) {
    const { directoryDepth, currentFolderName } = this.state;

    HostingFilesActions.checkFolder(folder, directoryDepth, currentFolderName);
  },

  handleUploadFiles(event) {
    const { handleUploadFiles } = this.props;
    const { currentFolderName } = this.state;

    return handleUploadFiles(currentFolderName, event);
  },

  handleSelectAll() {
    const { checkItem, items } = this.props;
    const filteredItems = this.filterFolders(items);

    _.forEach(filteredItems, (filteredItem) => {
      if (filteredItem.isFolder && !filteredItem.checked) {
        return this.handleCheckFolder(filteredItem);
      }

      return checkItem(filteredItem.id, true);
    });
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;
    const { hostingId } = this.props.params;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeHostingFilesDialog',
        ref: 'removeHostingFilesDialog',
        contentSize: 'medium',
        title: 'Delete Hosting Files',
        handleConfirmParam: hostingId,
        handleConfirm: HostingFilesActions.removeHostingFiles,
        itemLabelName: 'path',
        groupName: 'Hosting Files',
        items: getCheckedItems(),
        isLoading
      }
    }];
  },

  moveDirectoryUp(depth) {
    const { previousFolders, directoryDepth } = this.state;
    const depthLevel = _.isFinite(depth) ? depth : 1;

    this.setState({
      directoryDepth: directoryDepth - depthLevel,
      currentFolderName: previousFolders[directoryDepth - 1 - depthLevel] || '',
      previousFolders: _.dropRight(previousFolders, depthLevel)
    });
  },

  moveDirectoryDown(nextFolderName) {
    const { directoryDepth, previousFolders } = this.state;

    this.setState({
      directoryDepth: directoryDepth + 1,
      currentFolderName: nextFolderName,
      previousFolders: [...previousFolders, nextFolderName]
    });
  },

  filterByCurrentDirectoryDepth(items) {
    const { currentFolderName, directoryDepth, previousFolders } = this.state;

    const filteredItems = _.filter(items, (item) => {
      const isInFolder = directoryDepth < item.folders.length;
      const isInRootFolder = currentFolderName === '';
      const isInSubfolder = _.isMatch(item.folders, previousFolders);

      return isInFolder && isInSubfolder || isInRootFolder;
    });

    return filteredItems;
  },

  filterFolders(items) {
    const { directoryDepth } = this.state;
    let extendedItems = _.map(items, (item) => {
      const itemFolders = item.path.split('/');

      item.isFolder = _.isString(itemFolders[directoryDepth + 1]);
      item.folderName = itemFolders[directoryDepth];
      item.folders = itemFolders;
      item.files = item.isFolder ? this.getFolderFiles(item) : [];

      return item;
    });

    extendedItems = this.filterByCurrentDirectoryDepth(extendedItems);

    const splitedByType = _.partition(extendedItems, (item) => item.isFolder);
    const uniqueFolders = _.uniqBy(splitedByType[0], (item) => item.folderName);

    return [...uniqueFolders, ...splitedByType[1]];
  },

  showRemoveDialog() {
    this.showDialog('removeHostingFilesDialog');
  },

  renderDirectoryNavigation() {
    const { previousFolders, directoryDepth } = this.state;

    return (
      <DirectoryNavigation
        previousFolders={previousFolders}
        directoryDepth={directoryDepth}
        moveDirectoryUp={this.moveDirectoryUp}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick, handleUnselectAll, items, getCheckedItems } = this.props;

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-flex-1"
          primary={true}
          columnName="CHECK_ICON"
          handleClick={handleTitleClick}
          data-e2e="hosting-files-list-title"
        >
          File
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-4"
        >
          Size
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="MENU">
          <Lists.Menu
            checkedItemsCount={getCheckedItems().length}
            handleSelectAll={this.handleSelectAll}
            handleUnselectAll={handleUnselectAll}
            itemsCount={items.length}
          >
            <Lists.MenuItem onTouchTap={this.showRemoveDialog} />
          </Lists.Menu>
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  renderDotsListItem() {
    return <DotsListItem onDotsClick={this.moveDirectoryUp} />;
  },

  renderItems() {
    const { checkItem, items } = this.props;
    const { directoryDepth } = this.state;
    const filteredItems = this.filterFolders(items);
    const listItems = _.map(filteredItems, (item) => {
      const filesToRemove = item.isFolder ? item.files : item;

      return (
        <ListItem
          key={`hosting-file-list-item-${item.id}`}
          onFolderEnter={this.moveDirectoryDown}
          onIconClick={item.isFolder ? () => this.handleCheckFolder(item) : checkItem}
          item={item}
          showDeleteDialog={() => this.showDialog('removeHostingFilesDialog', filesToRemove)}
        />
      );
    });

    if (directoryDepth) {
      const dotsListItem = this.renderDotsListItem();

      listItems.unshift(dotsListItem);
    }

    return listItems;
  },

  renderEmptyView() {
    return (
      <HostingFilesEmptyView
        {...this.props}
        handleUploadFiles={this.handleUploadFiles}
      />
    );
  },

  render() {
    const { items, isLoading, hasFiles, isDeleting, isUploading, ...other } = this.props;

    if (!items.length || hasFiles || isUploading || isDeleting) {
      return (
        <Loading show={isLoading}>
          {this.renderEmptyView()}
        </Loading>
      );
    }

    return (
      <div>
        {this.getDialogs()}
        {this.renderDirectoryNavigation()}
        {this.renderHeader()}
        <Lists.List
          {...other}
          isLoading={isLoading}
          key="hosting-files-list"
        >
          {this.renderItems()}
          {this.renderEmptyView()}
        </Lists.List>
      </div>
    );
  }
});

export default withRouter(HostingFilesList);
