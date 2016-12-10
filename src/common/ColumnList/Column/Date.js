import React from 'react';
import Moment from 'moment';

import ColumnListConstans from '../ColumnListConstans';

const ColumnDate = ({
  date,
  invalidDateText = '',
  className = ColumnListConstans.DEFAULT_CLASSNAME.DATE
}) => {
  const getStyles = () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: 12,
      lineHeight: 16,
      padding: ColumnListConstans.DEFAULT_CELL_PADDING,
      color: 'rgba(0, 0, 0, .54)'
    }
  });

  const styles = getStyles();
  const momentDate = Moment(date);
  const isValid = momentDate.isValid();
  const format = isValid ? momentDate.format('DD/MM/YYYY') : invalidDateText;
  const lts = isValid ? momentDate.format('LTS') : '';

  return (
    <div
      className={className}
      style={styles.root}
      title={`${format} ${lts}`}
    >
      {format}
    </div>
  );
};

export default ColumnDate;
