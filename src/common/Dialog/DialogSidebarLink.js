import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  displayName: 'DialogSidebarLink',

  contextTypes: {
    params: React.PropTypes.object
  },

  getStyles() {
    return {
      root: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: 'rgba(68,68,68,.5)'
      }
    };
  },

  render() {
    const { params } = this.context;
    const styles = this.getStyles();
    const { to, children } = this.props;

    if (to.indexOf('http') > -1) {
      return (
        <a
          href={to}
          style={styles.root}
          target="_blank"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        to={{
          name: to,
          params
        }}
        style={styles.root}
      >
        {children}
      </Link>
    );
  }
});
