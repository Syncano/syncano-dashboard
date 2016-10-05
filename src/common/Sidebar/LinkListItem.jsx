import React from 'react';
import { withRouter } from 'react-router';
import ListItem from './ListItem';
import { colors as Colors } from 'material-ui/styles/';

const LinkListItem = React.createClass({
  displayName: 'LinkListItem',

  getStyles() {
    return {
      active: {
        color: Colors.blue400
      }
    };
  },

  getMenuItemHref(routeName) {
    const { router, params } = this.props;

    return router.createHref({ name: routeName, params });
  },

  handleTouchTap(routeName) {
    const { router, params } = this.props;

    router.push({ name: routeName, params });
  },

  render() {
    const styles = this.getStyles();
    const { routeName, style, router, params, ...other } = this.props;
    const isActive = router.isActive({ name: routeName, params }, true);

    return (
      <ListItem
        style={{ ...style, ...(isActive && styles.active) }}
        onTouchTap={() => this.handleTouchTap(routeName)}
        href={this.getMenuItemHref(routeName)}
        iconColor={isActive ? styles.active.color : null}
        {...other}
      />
    );
  }
});

export default withRouter(LinkListItem);
