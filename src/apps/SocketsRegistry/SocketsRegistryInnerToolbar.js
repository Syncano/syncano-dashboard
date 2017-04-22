import React from 'react';

import SocketsRegistryActions from './SocketsRegistryActions';

import { FlatButton, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const SocketsRegistryInnerToolbar = ({ filter, filterBySyncano }) => {
  const styles = {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      borderRadius: 0
    },
    border: {
      border: '1px solid #244273',
      borderRadius: 0,
      alignItems: 'center',
      boxShadow: 'none',
      fontSize: '26px',
      height: '100%',
      lineHeight: '100%',
      minWidth: '60px'
    }
  };

  const setFilterAll = () => {
    SocketsRegistryActions.setFilter('all');
  };

  const setFilterTrue = () => {
    SocketsRegistryActions.setFilter(true);
  };

  const setFilterFalse = () => {
    SocketsRegistryActions.setFilter(false);
  };

  const setSearchFilterAll = () => {
    SocketsRegistryActions.setSearchFilter('all');
  };

  const setSearchFilterName = () => {
    SocketsRegistryActions.setSearchFilter('name');
  };

  const setSearchFilterAuthor = () => {
    SocketsRegistryActions.setSearchFilter('author');
  };

  const setSearchFilterDescription = () => {
    SocketsRegistryActions.setSearchFilter('description');
  };

  const activeButtonColor = '#244273';
  const inactiveButtonColor = Colors.white;
  const activeTextColor = '#a8b5c7';
  const activeColorConfigObj = {
    button: activeButtonColor,
    label: activeTextColor
  };
  const inactiveColorConfigObj = {
    button: inactiveButtonColor,
    label: activeButtonColor
  };
  const defaultFilterByColorConfig = (currentFilterType) => {
    const isCurrentFilterType = currentFilterType === filterBySyncano;

    return isCurrentFilterType ? activeColorConfigObj : inactiveColorConfigObj;
  };
  const defaultAuthorColorConfig = (currentFilter) => {
    const isCurrentFilter = currentFilter === filter;

    return isCurrentFilter ? activeColorConfigObj : inactiveColorConfigObj;
  };

  return (
    <div
      className="vm-3-b"
      style={styles.root}
    >
      <div>
        <FlatButton
          label="Author:"
          disabled={true}
        />
        <RaisedButton
          backgroundColor={defaultAuthorColorConfig('all').button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultAuthorColorConfig('all').label}
          label="All"
          onTouchTap={setFilterAll}
        />
        <RaisedButton
          backgroundColor={defaultAuthorColorConfig(true).button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultAuthorColorConfig(true).label}
          label="Syncano"
          onTouchTap={setFilterTrue}
        />
        <RaisedButton
          backgroundColor={defaultAuthorColorConfig(false).button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultAuthorColorConfig(false).label}
          label="Community"
          onTouchTap={setFilterFalse}
        />
      </div>
      <div>
        <FlatButton
          label="Filter by:"
          disabled={true}
        />
        <RaisedButton
          backgroundColor={defaultFilterByColorConfig('all').button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultFilterByColorConfig('all').label}
          label="All"
          onTouchTap={setSearchFilterAll}
        />
        <RaisedButton
          backgroundColor={defaultFilterByColorConfig('name').button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultFilterByColorConfig('name').label}
          label="Name"
          onTouchTap={setSearchFilterName}
        />
        <RaisedButton
          backgroundColor={defaultFilterByColorConfig('author').button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultFilterByColorConfig('author').label}
          label="Author"
          onTouchTap={setSearchFilterAuthor}
        />
        <RaisedButton
          backgroundColor={defaultFilterByColorConfig('description').button}
          style={styles.border}
          buttonStyle={styles.button}
          labelColor={defaultFilterByColorConfig('description').label}
          label="Description"
          onTouchTap={setSearchFilterDescription}
        />
      </div>
    </div>
  );
};

export default SocketsRegistryInnerToolbar;
