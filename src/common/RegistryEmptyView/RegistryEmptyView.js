import React from 'react';

const RegistryEmptyView = ({
  title,
  description,
  altText,
  src,
  ...other
}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'left',
      padding: '70px 60px'
    },
    mainContainer: {
      width: 1000,
      height: 510,
      display: 'flex',
      flexDirection: 'row',
      margin: '10px auto 0 auto'
    },

    title: {
      marginBottom: 20,
      fontSize: 26,
      fontWeight: 600,
      lineHeight: '32px'
    },
    description: {
      marginTop: 40,
      lineHeight: '28px',
      fontSize: 18
    }
  };

  return (
    <div
      style={styles.mainContainer}
      data-e2e={other['data-e2e']}
    >
      <div style={styles.container}>
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.description}>
          {description}
        </div>
      </div>
      <div style={styles.container}>
        <img
          alt={altText}
          src={src}
        />
      </div>
    </div>
  );
};

export default RegistryEmptyView;
