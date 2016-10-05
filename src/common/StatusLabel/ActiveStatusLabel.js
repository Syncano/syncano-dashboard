import React from 'react';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const StatusLabel = ({ style }) => (
  <FontIcon
    style={style}
    className="synicon-check"
    color={Colors.green500}
  />
);

export default StatusLabel;
