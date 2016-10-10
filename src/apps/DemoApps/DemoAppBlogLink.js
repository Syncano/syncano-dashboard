import React from 'react';

const DemoAppBlogLink = ({ linkSrc }) => {
  const styles = {
    listItem: {
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 1.4
    },
    icon: {
      fontSize: 36,
      height: 32,
      paddingRight: 10,
      display: 'inline-flex'
    }
  };

  return (
    <li>
      <div style={styles.listItem}>
        <img
          src="/img/syncano-symbol.svg"
          alt="demo app"
          style={styles.icon}
        />
        <div>
          {'Full Tutorial: '}
          <a
            href={linkSrc}
            target="_blank"
          >
            {linkSrc}
          </a>
        </div>
      </div>
    </li>
  );
};

export default DemoAppBlogLink;
