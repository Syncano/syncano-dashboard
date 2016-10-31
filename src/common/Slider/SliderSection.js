import React from 'react';

const SliderSection = ({ style, title, slider, sliderSummary }) => {
  const styles = {
    title: {
      fontSize: '1.2em'
    },
    slider: {
      marginTop: 10,
      padding: 10
    },
    sliderSummary: {
      paddingLeft: 35
    }
  };

  return (
    <div
      className="row"
      style={style}
    >
      <div className="col-md-24">
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.slider}>
          {slider}
        </div>
      </div>
      <div
        className="col-md-11"
        style={styles.sliderSummary}
      >
        {sliderSummary}
      </div>
    </div>
  );
};

export default SliderSection;
