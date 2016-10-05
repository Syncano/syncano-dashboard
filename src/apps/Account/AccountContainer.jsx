import React from 'react';
import { Link } from 'react-router';
import { Paper } from 'material-ui';
import { Logo } from '../../common/';
import Helmet from 'react-helmet';

import './AccountContainer.sass';

export default React.createClass({
  displayName: 'AccountContainer',

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles() {
    return {
      marginBottom: 50
    };
  },

  render() {
    const styles = this.getStyles();
    const { id, bottomContent, style, children } = this.props;

    return (
      <div>
        <Helmet
          meta={[{
            name: 'robots',
            content: 'noindex, nofollow'
          }]}
        />
        <div
          className="col-lg-15 account-container"
          id={id}
          style={{ ...styles, ...style }}
        >
          <div className="account-logo">
            <Link to="login"><Logo className="logo-blue" /></Link>
          </div>
          <Paper
            className="account-container__content"
            rounded={false}
          >
            {children}
          </Paper>
          {bottomContent}
        </div>
      </div>
    );
  }
});
