import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

import HostingFilesStore from './HostingFilesStore';
import HostingFilesActions from './HostingFilesActions';
import HostingUploadDialogStore from './HostingUploadDialogStore';

import { ColumnList, Dialog, DirectoryNavigation, Lists, Loading } from '../../common';
import HostingFilesEmptyView from './HostingFilesEmptyView';
import HostingUploadDialog from './HostingUploadDialog';
import ListItem from './HostingFilesListItem';
import DotsListItem from './DotsListItem';

const Column = ColumnList && ColumnList.Column;

const HostingFilesList = React.createClass({
  mixins: [
    Reflux.connect(HostingUploadDialogStore),
    DialogsMixin
  ],

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
    const { items, directoryDepth } = this.props;
    const depthToCheck = directoryDepth + 1;
    const fileFoldersToCheck = _.take(file.folders, depthToCheck);
    const folderFiles = _.filter(items, (item) => {
      const itemFolders = item.path.split('/');
      const itemFoldersToCheck = _.take(itemFolders, depthToCheck);
      const isFileInCurrentFolder = _.isMatch(itemFoldersToCheck, fileFoldersToCheck);

      return isFileInCurrentFolder;
    });

    return folderFiles;
  },

  isSupportedBrowser() {
    return !!window.chrome && !!window.chrome.webstore;
  },

  handleCheckFolder(folder) {
    const { directoryDepth, currentFolderName } = this.props;

    HostingFilesActions.checkFolder(folder, directoryDepth, currentFolderName);
  },

  handleUploadFiles(event) {
    const { handleUploadFiles, previousFolders } = this.props;
    const currentPath = previousFolders.join('/');

    return handleUploadFiles(currentPath, event);
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

  filterByCurrentDirectoryDepth(items) {
    const { currentFolderName, directoryDepth, previousFolders } = this.props;
    const filteredItems = _.filter(items, (item) => {
      const isInFolder = directoryDepth < item.folders.length;
      const isInRootFolder = currentFolderName === '';
      const isInSubfolder = _.isMatch(item.folders, previousFolders);

      return isInFolder && isInSubfolder || isInRootFolder;
    });

    return filteredItems;
  },

  filterFolders(items) {
    const { directoryDepth } = this.props;
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
    const { previousFolders, directoryDepth, moveDirectoryUp } = this.props;

    return (
      <DirectoryNavigation
        previousFolders={previousFolders}
        directoryDepth={directoryDepth}
        moveDirectoryUp={moveDirectoryUp}
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
    const { moveDirectoryUp } = this.props;

    return <DotsListItem onDotsClick={moveDirectoryUp} />;
  },

  renderItems() {
    const { checkItem, directoryDepth, items, moveDirectoryDown } = this.props;
    const filteredItems = this.filterFolders(items);
    const listItems = _.map(filteredItems, (item) => {
      const filesToRemove = item.isFolder ? item.files : item;
      const showDeleteDialog = () => this.showDialog('removeHostingFilesDialog', filesToRemove);

      return (
        <ListItem
          key={`hosting-file-list-item-${item.id}`}
          onFolderEnter={moveDirectoryDown}
          onIconClick={item.isFolder ? () => this.handleCheckFolder(item) : checkItem}
          item={item}
          showDeleteDialog={showDeleteDialog}
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
    const {
      currentFileIndex,
      currentInstanceName,
      errorResponses,
      filesCount,
      handleCancelUploading,
      handleErrorsButtonClick,
      hasFiles,
      isCanceled,
      isDeleting,
      isUploading,
      lastFileIndex,
      ...other
    } = this.props;

    return (
      <HostingFilesEmptyView
        {...other}
        currentFileIndex={currentFileIndex}
        currentInstanceName={currentInstanceName}
        errorResponses={errorResponses}
        filesCount={filesCount}
        handleCancelUploading={handleCancelUploading}
        handleErrorsButtonClick={handleErrorsButtonClick}
        handleUploadFiles={this.handleUploadFiles}
        hasFiles={hasFiles}
        isCanceled={isCanceled}
        isDeleting={isDeleting}
        isUploading={isUploading}
        lastFileIndex={lastFileIndex}
      />
    );
  },

  render() {
    const {
      currentFileIndex,
      currentInstanceName,
      errorResponses,
      filesCount,
      handleCancelUploading,
      handleErrorsButtonClick,
      hasFiles,
      items,
      isCanceled,
      isDeleting,
      isUploading,
      isLoading,
      lastFileIndex,
      ...other
    } = this.props;

    const { _dialogVisible } = this.state;
    const hasItemsAndErorrs = (items.length && errorResponses.length && !_dialogVisible && !isCanceled);

    if (!items.length || isDeleting || hasItemsAndErorrs) {
      return (
        <Loading show={isLoading}>
          {this.renderEmptyView()}
        </Loading>
      );
    }

    return (
      <div>
        <HostingUploadDialog
          {...other}
          currentFileIndex={currentFileIndex}
          currentInstanceName={currentInstanceName}
          errorResponses={errorResponses}
          filesCount={filesCount}
          handleCancelUploading={handleCancelUploading}
          handleErrorsButtonClick={handleErrorsButtonClick}
          handleUploadFiles={this.handleUploadFiles}
          hasFiles={hasFiles}
          isCanceled={isCanceled}
          isDeleting={isDeleting}
          isUploading={isUploading}
          lastFileIndex={lastFileIndex}
        />
        {this.getDialogs()}
        {this.renderDirectoryNavigation()}
        {this.renderHeader()}
        <Lists.List
          {...other}
          isLoading={isLoading}
          key="hosting-files-list"
        >
          {this.renderItems()}
        </Lists.List>
      </div>
    );
  }
});

export default withRouter(HostingFilesList);
