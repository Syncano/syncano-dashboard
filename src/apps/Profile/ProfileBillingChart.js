import 'c3/c3.css';
import c3 from 'c3';
import _ from 'lodash';

import React, { Component } from 'react';
import Radium from 'radium';

import './ProfileBillingChart.css';

class ProfileBillingChart extends Component {
  componentDidMount() {
    this.drawCharts();
  }

  componentDidUpdate() {
    this.drawCharts();
  }

  getStyles = () => ({
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
  });

  drawCharts = () => {
    this.charts = true;

    _.map(this.props.charts, (config, name) => {
      config.bindto = this.refs[`chart-${name}`];
      config.size = { height: 300 };
      this.chart = c3.generate(config);
    });
  };

  renderChart = (config, name) => {
    const styles = this.getStyles();

    return (
      <div key={`chart-${name}`}>
        <div style={styles.heading}>
          {config.title}
        </div>
        <div
          ref={`chart-${name}`}
          className="col chart"
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        {_.map(this.props.charts, this.renderChart)}
      </div>
    );
  }
}

export default Radium(ProfileBillingChart);
