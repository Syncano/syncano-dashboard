import React from 'react';
import Radium from 'radium';
import { Paper } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import ColumnListConstans from './ColumnListConstans';
import _ from 'lodash';

export default Radium(React.createClass({
  displayName: 'Item',

  getDefaultProps() {
    return {
      zDepth: 1
    };
  },

  getStyles() {
    return {
      base: {
        display: 'flex',
        marginBottom: 0,
        justifyContent: 'center',
        height: ColumnListConstans.DEFAULT_ITEM_HEIGHT,
        background: '#fff'
      },
      noBackground: {
        background: 'none',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        marginTop: '-1px'
      },
      checked: {
        background: Colors.lightBlue50
      },
      hoverable: {
        cursor: 'pointer',
        ':hover': {
          background: Colors.grey100
        }
      }
    };
  },

  renderClickableItem() {
    const { style } = this.props;
    const styles = this.getStyles();

    return (
      <Paper
        {...this.props}
        onTouchTap={this.props.handleClick}
        zDepth={this.props.zDepth}
        style={_.merge(
          {},
          styles.base,
          styles.hoverable,
          style,
          this.props.checked === true && styles.checked
        )}
        rounded={false}
      >
        {this.props.children}
      </Paper>
    );
  },

  renderItem() {
    const { style } = this.props;
    const styles = this.getStyles();

    return (
      <Paper
        {...this.props}
        zDepth={0}
        style={_.merge(
          {},
          styles.base,
          styles.noBackground,
          style,
          this.props.checked === true && styles.checked
        )}
        rounded={false}
      >
        {this.props.children}
      </Paper>
    );
  },

  render() {
    const isClickable = this.props.handleClick;

    return isClickable ? this.renderClickableItem() : this.renderItem();
  }
}));
