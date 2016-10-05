import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'ColumnText',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.TEXT
    };
  },

  getInitialState() {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor
    };
  },

  getStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: '12px',
      lineHeight: '16px',
      padding: ColumnListConstans.DEFAULT_CELL_PADDING,
      color: this.props.color
    };
  },

  handleClick() {
    this.props.handleClick(this.props.id);
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
