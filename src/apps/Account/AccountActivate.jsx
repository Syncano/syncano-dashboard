import React from 'react';
import Reflux from 'reflux';

import Store from './AuthStore';
import Actions from './AuthActions';

import AccountContainer from './AccountContainer';

export default React.createClass({
  displayName: 'AccountActivate',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    const { uid, token } = this.context.params;

    Actions.activate({ uid, token });
  },

  render() {
    const { status } = this.state;

    return (
      <AccountContainer ref="loginPage">
        <div className="account-container__content__header">
          <p className="vm-0-b">{status}</p>
        </div>
      </AccountContainer>
    );
  }
});
