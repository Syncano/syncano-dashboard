import React from 'react';
import Radium from 'radium';
import { FontIcon, ListItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'SocialAuthButtonsList',

  getDefaultProps() {
    return {
      mode: 'login'
    };
  },

  getStyles() {
    return {
      listItem: {
        color: Colors.blue700,
        ':hover': {
          backgroundColor: Colors.blue700,
          color: '#fff'
        }
      },
      listItemIcon: {
        color: 'inherit',
        transition: 'none',
        left: 12
      }
    };
  },

  renderIcon() {
    const styles = this.getStyles();

    return (
      <FontIcon
        style={styles.listItemIcon}
        className={`synicon-${this.props.network}`}
      />
    );
  },

  render() {
    const styles = this.getStyles();
    const { network, onTouchTap, mode } = this.props;
    const buttonLabel = mode === 'signup' ? 'Sign up with ' : 'Login with ';

    return (
      <ListItem
        style={styles.listItem}
        primaryText={buttonLabel + network}
        onTouchTap={onTouchTap}
        leftIcon={this.renderIcon()}
      />
    );
  }
}));
