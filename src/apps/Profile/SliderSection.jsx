import React from 'react';

const SliderSection = React.createClass({
  getStyles() {
    return {
      sectionTopic: {
        fontSize: '1.3em'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { style } = this.props;

    return (
      <div
        className="row"
        style={style}
      >
        <div className="col-md-24">
          <div className="row">
            <div
              className="col-flex-1"
              style={styles.sectionTopic}
            >
              {this.props.title}
            </div>
            <div
              className="col-flex-1"
              style={{ color: '#9B9B9B', textAlign: 'right' }}
            >
              {this.props.suggestion ? `suggestion based on usage: ${this.props.suggestion}` : null}
            </div>
          </div>
          <div style={{ marginTop: 10, padding: 10 }}>
            {this.props.slider}
          </div>
        </div>
        <div
          className="col-md-11"
          style={{ paddingLeft: 35 }}
        >
          {this.props.sliderSummary}
        </div>
      </div>
    );
  }
});

export default SliderSection;
