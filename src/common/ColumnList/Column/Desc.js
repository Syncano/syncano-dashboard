import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

export default Radium(React.createClass({
  displayName: 'ColumnDesc',

  propTypes: {
    id: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },

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
    const { className, children } = this.props;
    const styles = this.getStyles();

    return (
      <div
        className={`description-field ${className}`}
        style={styles}
        data-e2e={this.props['data-e2e']}
      >
        {children}
      </div>
    );
  }
}));
