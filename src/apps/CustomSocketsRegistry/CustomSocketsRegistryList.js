import React from 'react';
import pluralize from 'pluralize';

import { DialogsMixin } from '../../mixins';

import Actions from './CustomSocketsRegistryActions';
import Store from './CustomSocketsRegistryStore';

import ListItem from './CustomSocketsRegistryListItem';
import { ColumnList, Dialog, Lists, Container, RegistryEmptyView } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsRegistryList = React.createClass({

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Custom Socket',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem
    };
  },

  componentWillUpdate(nextProps) {
    console.info('customSocket::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getStyles() {
    return {
      container: {
        margin: '0 200px'
      },
      ammount: {
        textAlign: 'center',
        fontSize: '1em'
      },
      children: {
        paddingTop: 24
      },
      textZeroState: {
        fontSize: 30
      },
      noResultsState: {
        fontSize: 28,
        textAlign: 'center',
        width: '100%'
      },
      noResultsTitle: {
        fontSize: 40,
        lineHeight: '30px',
        marginTop: 20
      },
      noResultsText: {
        marginTop: 30,
        fontStyle: 'italic'
      }
    };
  },

  initDialogs() {
    const { items, isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeCustomSocketsDialog',
        ref: 'removeCustomSocketsDialog',
        title: 'Delete Custom Sockets',
        handleConfirm: Actions.removeCustomSockets,
        items,
        groupName: 'Custom Sockets',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const { checkItem } = this.props;
    const showDeleteDialog = () => this.showDialog('removeCustomSocketsDialog', item);

    return (
      <ListItem
        key={`custom-sockets-registry-list-item-${item.name}`}
        item={item}
        onIconClick={checkItem}
        showDeleteDialog={showDeleteDialog}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick } = this.props;

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          className="col-xs-10"
          primary={true}
          columnName="CHECK_ICON"
          handleClick={handleTitleClick}
        >
          Custom Sockets
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          registry={true}
          className="col-xs-5"
        >
          Author
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          registry={true}
          className="col-flex-2"
        >
          Description
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-sm-5"
          registry={true}
        >
          Details
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  render() {
    const {
      items,
      isLoading,
      style,
      changeListView,
      ...other
    } = this.props;
    const styles = this.getStyles();
    const customSocketImageDir = '/img/custom-socket-assemble.svg';
    const pluralizedResults = pluralize('result', items.length);
    const containsItems = (!items || !items.length) && !isLoading;

    if (containsItems && changeListView) {
      return (
        <div style={styles.noResultsState}>
          <div style={styles.noResultsTitle}>
            No Sockets found
          </div>
          <div style={styles.noResultsText}>
            {`Sorry, but nothing matched your search criteria.
            Please try again with some different keywords.`}
          </div>
        </div>
      );
    }
    if (containsItems && !changeListView) {
      return (
        <RegistryEmptyView
          style={styles.zeroStateContainer}
          title="Supercharge your project with Sockets from the community"
          description={`Think of Sockets Registry a package manager for Syncano Sockets. You can search for Custom
            Sockets created by community and add them to your projects.`}
          src={customSocketImageDir}
          altText="No Custom Socket"
        />
      );
    }

    return (
      <Lists.Container style={style && styles.list}>
        <div style={styles.ammount}>
          Found <strong>{items.length}</strong> {pluralizedResults}
        </div>
        <Container style={styles.container}>
          {this.getDialogs()}
          {this.renderHeader()}
          <Lists.List
            {...other}
            isLoading={isLoading}
            items={items}
            renderItem={this.renderItem}
          />
        </Container>
      </Lists.Container>
    );
  }
});

export default CustomSocketsRegistryList;
