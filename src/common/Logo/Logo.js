import React from 'react';
import Isvg from 'react-inlinesvg';

import './Logo.sass';

const Logo = ({ style, className }) => (
  <Isvg
    wrapper={React.DOM.div}
    wrapperStyle={style}
    src={require('../../assets/img/syncano-logo.svg')}
    className={className}
  />
);

export default Logo;
