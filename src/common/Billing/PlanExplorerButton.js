import React from 'react';
import Radium from 'radium';
import { FlatButton } from 'material-ui';
import { UpgradeButton } from '../../common';

export default Radium(React.createClass({
  displayName: 'PlanExplorerButton',

  propTypes: {
    isNewSubscription: React.PropTypes.bool,
    onDeleteSubscription: React.PropTypes.func,
    onPlanDialog: React.PropTypes.func
  },

  render() {
    const { style, isNewSubscription, onDeleteSubscription, onPlanDialog } = this.props;

    if (isNewSubscription) {
      return (
        <div className="row" style={{ flexDirection: 'column' }}>
          <div style={style}>
            <FlatButton
              primary={true}
              label={'Cancel Change'}
              onTouchTap={onDeleteSubscription}
            />
            <FlatButton
              primary={true}
              style={{ marginLeft: 8 }}
              label={'Upgrade'}
              onTouchTap={onPlanDialog}
            />
          </div>
        </div>
      );
    }

    return (
      <UpgradeButton onTouchTap={this.handleShowPlanDialog} />
    );
  }
}));
