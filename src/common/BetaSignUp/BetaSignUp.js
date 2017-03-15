import React from 'react';

import { Toolbar, ToolbarGroup } from 'material-ui';
import { Logo, CloseButton } from '../';

const BetaSignUp = React.createClass({
  displayName: 'BetaSignUp',

  contextTypes: {
    onApplyBeta: React.PropTypes.object
  },

  getStyles() {
    return {
      betaBadge: {
        color: '#fff',
        fontWeight: 600,
        backgroundColor: 'red',
        padding: '5px 7px',
        borderRadius: 3,
        fontSize: 16,
        marginRight: 5
      },
      topToolbar: {
        background: '#000',
        height: 60,
        padding: 0,
        justifyContent: 'center',
        fontSize: 18,
        color: '#9b9b9b'
      },
      logo: {
        height: 20
      },
      toolbarList: {
        padding: '0 12px'
      },
      applyBeta: {
        color: '#fff',
        borderBottom: '1px solid #fff',
        cursor: 'pointer'
      }
    };
  },

  onApplyBeta() {
    this.context.onApplyBeta();
    this.props.closeBanner();
  },

  renderBetaBadge() {
    const styles = this.getStyles();

    return (
      <span style={styles.betaBadge}>Beta</span>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <Toolbar style={styles.topToolbar}>
        <CloseButton
          style={{ top: 5 }}
          onTouchTap={this.props.closeBanner}
        />
        <ToolbarGroup style={styles.toolbarList}>
          Get ready for
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarList}>
          <Logo
            className="logo-white"
            style={styles.logo}
          />
        </ToolbarGroup>
        <ToolbarGroup style={{ ...styles.toolbarList, color: '#fff', letterSpacing: 2 }}>
          ASCEND
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarList}>
          {this.renderBetaBadge()}
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarList}>
          Get a sneak peek before anyone else:
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarList}>
          <div
            style={styles.applyBeta}
            onClick={this.onApplyBeta}
          >
            Apply for beta access
          </div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default BetaSignUp;
