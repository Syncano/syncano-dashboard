import React from 'react';

import { FontIcon } from 'material-ui';
import ListItem from './ListItem';

export default React.createClass({
  displayName: 'SolutionsList',

  getStyles() {
    return {
      listItem: {
        padding: '0 15px',
        marginBottom: 40,
        width: 346
      },
      noItemsContainer: {
        margin: '64px auto',
        textAlign: 'center'
      },
      noItemsIcon: {
        fontSize: 96,
        lineHeight: 1,
        marginBottom: 16,
        color: 'rgba(0, 0, 0, 0.24)'
      },
      noItemsText: {
        color: 'rgba(0, 0, 0, 0.67)',
        fontSize: 34,
        margin: 0
      }
    };
  },

  getListItems() {
    const styles = this.getStyles();

    if (this.props.items.length < 1) {
      return [
        <div style={styles.noItemsContainer}>
          <FontIcon
            style={styles.noItemsIcon}
            className="synicon-filter-remove-outline"
          />
          <p style={styles.noItemsText}>There are no Solutions matching this criteria</p>
        </div>
      ];
    }

    return this.props.items.map((item) => (
      <div
        key={item.id}
        style={this.getStyles().listItem}
      >
        <ListItem
          data={item}
          onInstall={this.props.onInstall}
          onSeeMore={this.props.onSeeMore}
          onTagClick={this.props.onTagClick}
          onUnstar={this.props.onUnstar}
          onStar={this.props.onStar}
        />
      </div>
    ));
  },

  render() {
    return (
      <div className="row">
        {this.getListItems()}
      </div>
    );
  }
});
