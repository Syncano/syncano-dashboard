import React from 'react';
import { colors as Colors } from 'material-ui/styles';

const styles = {
  link: {
    color: Colors.blue300
  }
};

const TraceBigResult = ({ onClick }) => (
  <div>
    The result was too large to view instantly. Click
    <a
      style={styles.link}
      onClick={onClick}
    >
      {' here '}
    </a>
    to load it.
  </div>
);

export default TraceBigResult;
