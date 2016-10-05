import React from 'react';
import _ from 'lodash';
import { List, ListItem, Subheader } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import Show from '../Show';

export default React.createClass({
  displayName: 'TagsList',

  getStyles() {
    return {
      listItemChecked: {
        background: Colors.lightBlue50
      },
      tagsCounter: {
        marginTop: 12,
        color: 'grey'
      }
    };
  },

  handleOnTouchTap(name) {
    const { toggleTagSelection } = this.props;

    if (toggleTagSelection) {
      toggleTagSelection(name);
    }
  },

  handleResetActiveTagsList() {
    const { resetTagsSelection } = this.props;

    if (resetTagsSelection) {
      resetTagsSelection();
    }
  },

  renderAllTagsListItem() {
    const styles = this.getStyles();
    const { selectedItems } = this.props;

    return (
      <ListItem
        key="all-tags"
        primaryText="All tags"
        innerDivStyle={_.isEmpty(selectedItems) ? styles.listItemChecked : {}}
        onTouchTap={this.handleResetActiveTagsList}
      />
    );
  },

  renderTagsListItems() {
    const { items, selectedItems } = this.props;
    const styles = this.getStyles();

    return _.map(items, (item) => {
      /* eslint-disable */
      {/*
       temporary disabled tags count because of counter bug in backend
       const itemsCount = (
       <div style={styles.tagsCounter}>
       {item.count}
       </div>
       );
       */}

      return (
        <ListItem
          key={item.name}
          primaryText={item.name}
          innerDivStyle={selectedItems.indexOf(item.name) > -1 ? styles.listItemChecked : {}}
          onTouchTap={() => this.handleOnTouchTap(item.name)}/>
      );
    });
  },

  render() {
    const {items} = this.props;

    return (
      <Show if={!_.isEmpty(items)}>
        <List
          className="tags-list">
          <Subheader>Tags</Subheader>
          {this.renderAllTagsListItem()}
          {this.renderTagsListItems()}
        </List>
      </Show>
    );
  }
});
