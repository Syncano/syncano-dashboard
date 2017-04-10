import React from 'react';
import { withRouter } from 'react-router';
import ListItem from './ListItem';

const LinkListItem = React.createClass({
  displayName: 'LinkListItem',

  getStyles() {
    return {
      active: {
        color: '#040b1a'
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
        href={routeName && this.getMenuItemHref(routeName)}
        iconColor={isActive ? styles.active.color : null}
        onTouchTap={() => this.handleTouchTap(routeName)}
        {...other}
      />
    );
  }
});

export default withRouter(LinkListItem);
