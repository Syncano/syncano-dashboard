import React from 'react';

const SearchResultsCountBox = ({ className, children }) => {
  const getStyles = () => ({
    root: {
      border: '1px dashed #dedede',
      padding: 12,
      textAlign: 'center',
      lineHeight: 1
    }
  });

  const styles = getStyles();

  return (
    <div
      className={className}
      style={styles.root}
    >
      {children}
    </div>
  );
};

export default SearchResultsCountBox;
