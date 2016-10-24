import React from 'react';

const NotificationCloseButton = ({ isVisible, onClick }) => {
  const styles = {
    root: {
      position: 'absolute',
      top: 4,
      right: 8,
      cursor: 'pointer',
      fontWeight: 700
    }
  };

  if (isVisible) {
    return (
      <div
        style={styles.root}
        onClick={onClick}
      >
        x
      </div>
    );
  }

  return null;
};

export default NotificationCloseButton;
