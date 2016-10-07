import React from 'react';

import { colors as Colors } from 'material-ui/styles';

const CustomSocketAuthorInfo = ({ author, runtimes }) => {
  const styles = {
    container: {
      padding: '32px 24px',
      fontSize: 16,
      lineHeight: 1.8,
      color: Colors.grey300,
      backgroundColor: '#444',
      height: '100%',
      borderBottom: `1px solid ${Colors.grey200}`
    },
    link: {
      cursor: 'pointer',
      color: Colors.blue400
    },
    name: {
      color: Colors.grey300
    }
  };

  return (
    <div style={styles.container}>
      <div>
        {'Github: '}
        <a
          href={author.socketLink}
          style={styles.link}
          target="_blank"
        >
          {author.subLink}
        </a>
      </div>
      <div>
        {'Author: '}
        <a
          href={author.authorLink}
          style={styles.link}
          target="_blank"
        >
          {author.name}
        </a>
      </div>
      <div>
        Runtime languages: {runtimes.join(', ')}
      </div>
      <div>
        Licence: {author.license}
      </div>
    </div>
  );
};

export default CustomSocketAuthorInfo;
