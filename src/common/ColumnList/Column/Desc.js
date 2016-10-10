import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

export default Radium(React.createClass({
  displayName: 'ColumnDesc',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.DESC
    };
  },

  getStyles() {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 14,
      padding: ColumnListConstans.DEFAULT_CELL_PADDING,
      wordBreak: 'break-all',
      color: '#4a4a4a'
    };
  },

  render() {
    const { className, children, style } = this.props;
    const styles = this.getStyles();

    return (
      <div
        className={`description-field ${className}`}
        style={{ ...styles, ...style }}
        data-e2e={this.props['data-e2e']}
      >
        {children}
      </div>
    );
  }
}));
