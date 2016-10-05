import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { colors as Colors } from 'material-ui/styles/';
import sortObj from 'sort-object';

export default Radium(React.createClass({
  displayName: 'UserInfo',

  getStyles() {
    return {
      base: {
        backgroundColor: Colors.grey100,
        borderRight: '1px solid #DDD',
        borderLeft: '1px solid #DDD',
        color: '#9B9B9B'
      },
      infoVisible: {
        maxHeight: '500px',
        transition: 'max-height 450ms ease-in',
        overflow: 'auto',
        borderBottom: '1px solid #DDD'
      },
      infoHidden: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 450ms ease-out'
      },
      container: {
        padding: 20
      },
      item: {
        paddingBottom: 10
      },
      itemValue: {
        color: '#777',
        fontWeight: 600
      }
    };
  },

  renderContent(value) {
    if (_.isObject(value)) {
      const typeMap = {
        geopoint: `latitude: ${value.latitude}, longitude: ${value.longitude}`,
        relation: `target: ${value.target}, ids: ${JSON.stringify(value.value)}`,
        reference: `target: ${value.target}, id: ${value.value}`,
        array: JSON.stringify(value),
        file: `url: ${value.value}`,
        default: JSON.stringify(value, null, 2)
      };

      return typeMap[value.type || 'default'];
    }

    if (!value) {
      return 'none';
    }

    return value;
  },

  renderCustomFields() {
    const styles = this.getStyles();
    const { profile, user_key } = this.props.user;
    const userProfile = { user_key, ..._.omit(profile, 'links') };

    const sortedUserProfile = sortObj(userProfile, {
      sort(a, b) {
        if (a === 'user_key') return -1;
        if (b === 'user_key') return 1;

        return a < b ? -1 : 1;
      }
    });

    return _.map(sortedUserProfile, (value, key) => (
      <div
        key={key}
        style={styles.item}
      >
        {key}
        <div style={styles.itemValue}>{this.renderContent(value)}</div>
      </div>
    ));
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={[styles.base, styles.infoHidden, this.props.visible && styles.infoVisible]}>
        <div style={styles.container}>
          {this.renderCustomFields()}
        </div>
      </div>
    );
  }
}));
