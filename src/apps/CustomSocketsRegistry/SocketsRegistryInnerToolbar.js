import React from 'react';
import { withRouter } from 'react-router';

import Actions from './CustomSocketsRegistryActions';

import { InnerToolbar } from '../../common/';
import { RaisedButton, FlatButton } from 'material-ui';

import { colors as Colors } from 'material-ui/styles';
import Sticky from 'react-stickydiv';

const CustomSocketsRegistryToolbar = ({ filter, filterBySyncano, router }) => {
  const styles = {
    toolbar: {
      display: 'flex',
      justifyContent: 'space-around',
      minWidth: '100%',
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
    },
    innerToolbar: {
      background: 'rgba(243, 243, 243, 1)'
    }
  };
  const handleBackClick = () => {
    router.push('/custom-sockets-registry');
  };

  const setFilterAll = () => {
    Actions.setFilter('all');
  };

  const setFilterTrue = () => {
    Actions.setFilter(true);
  };

  const setFilterFalse = () => {
    Actions.setFilter(false);
  };

  const setSearchFilterAll = () => {
    Actions.setSearchFilter('all');
  };

  const setSearchFilterName = () => {
    Actions.setSearchFilter('name');
  };

  const setSearchFilterAuthor = () => {
    Actions.setSearchFilter('author');
  };

  const setSearchFilterDescription = () => {
    Actions.setSearchFilter('description');
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
  const isRegistryListRouteActive = router.getCurrentLocation().pathname === '/custom-sockets-registry';

  return (
    <Sticky
      offsetTop={50}
      zIndex={99}
    >
      <InnerToolbar
        style={styles.innerToolbar}
        backButton={!isRegistryListRouteActive}
        backFallback={handleBackClick}
        backButtonTooltip="Go back to Custom Sockets Registry List"
      >
        <div style={styles.toolbar}>
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
              label="ALL"
              onTouchTap={setFilterAll}
            />
            <RaisedButton
              backgroundColor={defaultAuthorColorConfig(true).button}
              style={styles.border}
              buttonStyle={styles.button}
              labelColor={defaultAuthorColorConfig(true).label}
              label="SYNCANO"
              onTouchTap={setFilterTrue}
            />
            <RaisedButton
              backgroundColor={defaultAuthorColorConfig(false).button}
              style={styles.border}
              buttonStyle={styles.button}
              labelColor={defaultAuthorColorConfig(false).label}
              label="COMMUNITY"
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
              label="ALL"
              onTouchTap={setSearchFilterAll}
            />
            <RaisedButton
              backgroundColor={defaultFilterByColorConfig('name').button}
              style={styles.border}
              buttonStyle={styles.button}
              labelColor={defaultFilterByColorConfig('name').label}
              label="NAME"
              onTouchTap={setSearchFilterName}
            />
            <RaisedButton
              backgroundColor={defaultFilterByColorConfig('author').button}
              style={styles.border}
              buttonStyle={styles.button}
              labelColor={defaultFilterByColorConfig('author').label}
              label="AUTHOR"
              onTouchTap={setSearchFilterAuthor}
            />
            <RaisedButton
              backgroundColor={defaultFilterByColorConfig('description').button}
              style={styles.border}
              buttonStyle={styles.button}
              labelColor={defaultFilterByColorConfig('description').label}
              label="DESCRIPTION"
              onTouchTap={setSearchFilterDescription}
            />
          </div>
        </div>
      </InnerToolbar>
    </Sticky>
  );
};

export default withRouter(CustomSocketsRegistryToolbar);
