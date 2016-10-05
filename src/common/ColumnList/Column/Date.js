import React from 'react';
import Radium from 'radium';
import Moment from 'moment';
import ColumnListConstans from '../ColumnListConstans';

export default Radium(React.createClass({
  displayName: 'ColumnDate',

  getDefaultProps() {
    return {
      color: 'rgba(0,0,0,.54)',
      className: ColumnListConstans.DEFAULT_CLASSNAME.DATE
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

  render() {
    const styles = this.getStyles();
    const ifInvalid = this.props.ifInvalid || '';
    const date = Moment(this.props.date);
    const isValid = date.isValid();
    const format = isValid ? date.format('DD/MM/YYYY') : ifInvalid;
    const lts = isValid ? date.format('LTS') : '';

    return (
      <div
        className={this.props.className}
        style={styles}
      >
        <span>{format}</span>
        <span>{lts}</span>
      </div>
    );
  }
}));
