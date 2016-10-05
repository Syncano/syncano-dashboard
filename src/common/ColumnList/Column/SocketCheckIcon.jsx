import React from 'react';

import CheckIcon from './CheckIcon';
import SocketCheckIcon from '../../CheckIcon/SocketCheckIcon';

const ColumnSocketCheckIcon = (props) => (
  <CheckIcon
    {...props}
    iconElement={SocketCheckIcon}
  />
);

export default ColumnSocketCheckIcon;
