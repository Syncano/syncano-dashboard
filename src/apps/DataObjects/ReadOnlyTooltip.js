import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

const RadiumIcon = Radium(FontIcon);

export default Radium(({ className }) => {
  const styles = {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    textDecoration: 'underline',
    ':hover': {
      color: Colors.blue400
    }
  };

  return (
    <div>
      {_.startCase(className)} is read-only
      <a
        href="http://docs.syncano.io/docs/user-management#user-profiles"
        target="_blank"
      >
        <RadiumIcon
          className="synicon-book-open-page-variant"
          style={styles}
        />
      </a>
    </div>
  );
});
