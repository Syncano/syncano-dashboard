import React from 'react';
import { RaisedButton } from 'material-ui';

export default (props) => (
  <RaisedButton
    data-e2e={props['data-e2e']}
    backgroundColor="#ffcc01"
    labelColor="#1d2228"
    labelStyle={{ fontWeight: 700 }}
    label="Upgrade"
    {...props}
  />
);
