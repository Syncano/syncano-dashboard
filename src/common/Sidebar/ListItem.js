import React from 'react';
import { ListItem, FontIcon } from 'material-ui';

export default React.createClass({
  displayName: 'ListItem',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getStyles() {
    return {
      base: {
        fontSize: 14,
        lineHeight: '18px',
        color: '#4a4a4a'
      },
      innerDivStyle: {
        padding: '11px 20px 9px'
      },
      withIcon: {
        padding: '11px 20px 9px 48px'
      },
      iconStyle: {
        color: '#949CAD',
        fontSize: 18,
        margin: '10px 20px',
        width: 18,
        height: 18,
        left: 0
      },
      nestedListStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'transparent'
      }
    };
  },

  renderIcon() {
    const styles = this.getStyles();
    const { iconClassName, iconColor, iconStyle } = this.props;

    if (iconClassName) {
      return (
        <FontIcon
          color={iconColor}
          style={{ ...styles.iconStyle, ...iconStyle }}
          className={iconClassName}
        />
      );
    }

    return null;
  },

  render() {
    const styles = this.getStyles();
    const { style, iconClassName, ...other } = this.props;

    return (
      <ListItem
        style={{ ...styles.base, ...style }}
        innerDivStyle={{ ...styles.innerDivStyle, ...(iconClassName && styles.withIcon) }}
        leftIcon={this.renderIcon()}
        nestedListStyle={styles.nestedListStyle}
        {...other}
      />
    );
  }
});
