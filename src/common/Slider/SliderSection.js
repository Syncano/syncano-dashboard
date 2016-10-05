import React from 'react';

export default React.createClass({
  displayName: 'SliderSection',

  getStyles() {
    return {
      sectionTopic: {
        fontSize: '1.3em'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { style, title, suggestion, slider, sliderSummary } = this.props;

    return (
      <div
        className="row"
        style={style}
      >
        <div className="col-sm-8">
          <div className="row">
            <div
              className="col-sm-6"
              style={styles.sectionTopic}
            >
              {title}
            </div>
            <div
              className="col-sm-6"
              style={{ color: '#9B9B9B', textAlign: 'right' }}
            >
              {suggestion ? `suggestion based on usage: ${suggestion}` : null}
            </div>
          </div>
          <div style={{ marginTop: 10, padding: 10 }}>
            {slider}
          </div>
        </div>
        <div
          className="col-sm-4"
          style={{ paddingLeft: 35 }}
        >
          {sliderSummary}
        </div>
      </div>
    );
  }
});
