import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'ColumnName',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.NAME
    };
  },

  getStyles() {
    return {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 12,
      padding: ColumnListConstans.DEFAULT_CELL_PADDING,
      alignSelf: 'center',
      cursor: 'pointer',
      color: this.state.color,
      ':hover': {
        color: this.state.hoverColor
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles}
      >
        {this.props.children}
      </div>
    );
  }
}));
