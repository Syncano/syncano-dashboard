import React from 'react';

const MobileOnboardingSlide = ({ children, headline, imageSrc, text }) => {
  const styles = {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '30px 30px'
    },
    headline: {
      color: '#244273',
      fontSize: 24,
      fontWeight: 500,
      marginBottom: 30
    },
    text: {
      fontSize: 14,
      lineHeight: 1.4,
      color: '#000'
    },
    image: {
      width: '100%',
      marginTop: 30,
      maxWidth: 300,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.headline}>
        {headline}
      </div>
      <div style={styles.text}>
        {text}
      </div>
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt={headline}
            style={styles.image}
          />
        </div>
      )}
      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default MobileOnboardingSlide;
