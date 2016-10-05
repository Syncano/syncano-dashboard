import React from 'react';
import classNames from 'classnames';

export default ({ className, noMargin, title, last, children, style }) => {
  const styles = {
    title: {
      color: '#aaa',
      fontSize: 11,
      textTransform: 'uppercase'
    }
  };

  const rootClassName = classNames({
    'vm-3-b': !last && !noMargin
  }, className);

  return (
    <div className={rootClassName}>
      {title && <div style={styles.title}>{title}</div>}
      <div
        className="row"
        style={style}
      >
        {children}
      </div>
    </div>
  );
};
