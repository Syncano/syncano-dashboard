import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

export default Radium(React.createClass({
  displayName: 'ChartLegend',

  getDefaultProps() {
    return {
      rows: [],
      showUsage: false
    };
  },

  getStyles() {
    const styles = {
      legendSquere: {
        marginTop: 3,
        height: 10,
        width: 10
      },
      legend: {
        fontSize: '1rem'
      },
      legendAmount: {
        textAlign: 'right'
      },
      legendPercent: {
        textAlign: 'right',
        paddingRight: 0
      }
    };

    return { ...styles, ...this.props.style };
  },

  renderPercent(row) {
    const styles = this.getStyles();

    return [
      <div className="col-md-5" style={styles.legendPercent}>
        <strong>{row.percent}%</strong>
      </div>,
      <div className="col-md-8">of plan usage</div>
    ];
  },

  renderRow(row) {
    const styles = this.getStyles();

    row.styles = row.styles || {};

    return (
      <div className="row vp-1-b" style={styles.legend}>
        <div className="col-xs-1">
          <div style={_.extend({}, styles.legendSquere, row.styles)} />
        </div>
        <div className="col-flex-1">
          <div className="row">
            <div className="col-md-8">{row.label}</div>
            <div className="col-md-10" style={styles.legendAmount}>
              <strong>{parseInt(row.amount, 10).toLocaleString()}</strong>  this month
            </div>
            {this.props.showPercents ? this.renderPercent(row) : null}
          </div>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="row">
        <div className="col-flex-1">
          {this.props.rows.map(this.renderRow)}
        </div>
      </div>
    );
  }
}));
