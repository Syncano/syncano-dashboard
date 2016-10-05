import React from 'react';
import CheckIcon from './CheckIcon';
import CircleCheckIcon from '../../CheckIcon/CircleCheckIcon';

const ColumnCircleCheckIcon = (props) => (
  <CheckIcon
    {...props}
    iconElement={CircleCheckIcon}
  />
);

export default ColumnCircleCheckIcon;
