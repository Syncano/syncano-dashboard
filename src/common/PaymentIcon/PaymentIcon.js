import React from 'react';
import AmericanExpress from './AmericanExpress';
import DinersClub from './DinersClub';
import Discover from './Discover';
import Jcb from './Jcb';
import MasterCard from './MasterCard';
import Visa from './Visa';

const PaymentIcon = ({ niceType, style }) => {
  switch (niceType) {
    case 'American Express':
      return <AmericanExpress style={style} />;
    case 'Diners Club':
      return <DinersClub style={style} />;
    case 'Discover':
      return <Discover style={style} />;
    case 'JCB':
      return <Jcb style={style} />;
    case 'MasterCard':
      return <MasterCard style={style} />;
    case 'Visa':
      return <Visa style={style} />;
    default:
      return null;
  }
};

export default PaymentIcon;
