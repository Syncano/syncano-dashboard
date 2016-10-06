import React from 'react';
import Reflux from 'reflux';

import Actions from './CustomSocketsRegistryActions';
import Store from './CustomSocketsRegistryStore';

import { InnerToolbar } from '../../common/';
import { RaisedButton, FlatButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

import Sticky from 'react-stickydiv';

const CustomSocketsRegistryToolbar = React.createClass({

  mixins: [Reflux.connect(Store)],

  getStyles() {
    return {
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        alignItems: 'center'
      },
      filterlist: {
        marginLeft: '10%'
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
  },

  setFilterAll() {
    Actions.setFilter('all');
  },

  setFilterTrue() {
    Actions.setFilter(true);
  },

  setFilterFalse() {
    Actions.setFilter(false);
  },

  setSearchFilterAll() {
    Actions.setSearchFilter('all');
  },

  setSearchFilterName() {
    Actions.setSearchFilter('name');
  },

  setSearchFilterAuthor() {
    Actions.setSearchFilter('author');
  },

  setSearchFilterDescription() {
    Actions.setSearchFilter('description');
  },

  render() {
    const styles = this.getStyles();
    const { filter, filterBySyncano } = this.state;
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
      <Sticky
        offsetTop={50}
        zIndex={99}
        styles={styles.toolbar}
      >
        <InnerToolbar>
          <div style={styles.toolbar}>
            <div>
              <FlatButton
                label="Author:"
                disabled={true}
              />
              <RaisedButton
                backgroundColor={defaultAuthorColorConfig('all').button}
                style={styles.border}
                labelColor={defaultAuthorColorConfig('all').label}
                label="ALL"
                onTouchTap={this.setFilterAll}
              />
              <RaisedButton
                backgroundColor={defaultAuthorColorConfig(true).button}
                style={styles.border}
                labelColor={defaultAuthorColorConfig(true).label}
                label="SYNCANO"
                onTouchTap={this.setFilterTrue}
              />
              <RaisedButton
                backgroundColor={defaultAuthorColorConfig(false).button}
                style={styles.border}
                labelColor={defaultAuthorColorConfig(false).label}
                label="COMMUNITY"
                onTouchTap={this.setFilterFalse}
              />
            </div>
            <div style={styles.filterlist}>
              <FlatButton
                label="Filter by:"
                disabled={true}
              />
              <RaisedButton
                backgroundColor={defaultFilterByColorConfig('all').button}
                style={styles.border}
                labelColor={defaultFilterByColorConfig('all').label}
                label="ALL"
                onTouchTap={this.setSearchFilterAll}
              />
              <RaisedButton
                backgroundColor={defaultFilterByColorConfig('name').button}
                style={styles.border}
                labelColor={defaultFilterByColorConfig('name').label}
                label="NAME"
                onTouchTap={this.setSearchFilterName}
              />
              <RaisedButton
                backgroundColor={defaultFilterByColorConfig('author').button}
                style={styles.border}
                labelColor={defaultFilterByColorConfig('author').label}
                label="AUTHOR"
                onTouchTap={this.setSearchFilterAuthor}
              />
              <RaisedButton
                backgroundColor={defaultFilterByColorConfig('description').button}
                style={styles.border}
                labelColor={defaultFilterByColorConfig('description').label}
                label="DESCRIPTION"
                onTouchTap={this.setSearchFilterDescription}
              />
            </div>
          </div>
        </InnerToolbar>
      </Sticky>
    );
  }
});

export default CustomSocketsRegistryToolbar;
