import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import { FlatButton } from 'material-ui';

const ShowMore = ({ style, label = 'SHOW MORE', visible = true, ...other }) => {
  if (visible) {
    return (
      <div className="row align-center">
        <FlatButton
          {...other}
          style={{ ...{ color: Colors.blue500 }, ...style }}
          label={label}
        />
      </div>
    );
  }

  return <span />;
};

export default ShowMore;
