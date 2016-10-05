import React from 'react';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const InactiveStatusLabel = ({ style }) => (
  <FontIcon
    style={style}
    className="synicon-close"
    color={Colors.red400}
  />
);

export default InactiveStatusLabel;
