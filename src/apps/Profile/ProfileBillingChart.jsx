import 'd3';
import 'c3/c3.css';
import c3 from 'c3';
import _ from 'lodash';

import React from 'react';
import Radium from 'radium';

import './ProfileBillingChart.css';

export default Radium(React.createClass({
  componentDidUpdate() {
    this.charts = true;

    _.map(this.props.charts, (config, name) => {
      config.bindto = this.refs[`chart-${name}`];
      config.size = { height: 300 };
      this.chart = c3.generate(config);
    });
  },

  getStyles() {
    return {
      holder: {
        paddingTop: 16,
        paddingBottom: 8,
        paddingRight: 10,
        background: '#F5F5F5'
      },
      heading: {
        fontSize: '1.3em',
        padding: '24px 12px'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const charts = _.map(this.props.charts, (config, name) => (
      <div key={`chart-${name}`}>
        <div style={styles.heading}>
          {config.title}
        </div>
        <div
          ref={`chart-${name}`}
          className="col chart"
        />
      </div>
    ));

    return <div>{charts}</div>;
  }
}));
