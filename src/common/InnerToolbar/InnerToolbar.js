import React from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router';
import Sticky from 'react-stickydiv';

import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';

const InnerToolbar = Radium(React.createClass({
  displayName: 'InnerToolbar',

  propTypes: {
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      backButton: false,
      backButtonTooltipPosition: 'bottom-right',
      forceBackFallback: false
    };
  },

  getStyles() {
    return {
      toolbar: {
        background: 'rgba(243,243,243,0.90)',
        padding: '0px 24px 0 24px',
        zIndex: 6,
        justifyContent: 'flex-start'
      },
      toolbarRight: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end'
      }
    };
  },

  isHistory() {
    // it has to be fixed
    // return History.length > 1;
    return false;
  },

  handleBackButtonTouchTap() {
    const { backFallback, forceBackFallback, router } = this.props;

    if (this.isHistory() && !forceBackFallback) {
      return router.goBack();
    }

    return backFallback();
  },

  renderBackButton() {
    const { backButtonTooltip, backButtonTooltipPosition } = this.props;

    return (
      <ToolbarGroup style={{ paddingRight: 24 }}>
        <IconButton
          iconClassName="synicon-arrow-left"
          tooltip={backButtonTooltip}
          tooltipPosition={backButtonTooltipPosition}
          onClick={this.handleBackButtonTouchTap}
          touch={true}
          style={{ marginTop: 4 }}
          iconStyle={{ color: 'rgba(0,0,0,.4)' }}
        />
      </ToolbarGroup>
    );
  },

  renderChildren(children) {
    const styles = this.getStyles();

    return (
      <ToolbarGroup style={styles.toolbarRight}>
        {children}
      </ToolbarGroup>
    );
  },

  renderMenu(menu) {
    return (
      <ToolbarGroup>
        {menu}
      </ToolbarGroup>
    );
  },

  renderTitle(title) {
    return (
      <ToolbarGroup>
        <ToolbarTitle
          text={title}
          style={{ paddingRight: 0 }}
        />
      </ToolbarGroup>
    );
  },

  render() {
    const styles = this.getStyles();
    const { children, menu, title, backButton, backFallback } = this.props;

    return (
      <Sticky offsetTop={50} zIndex={12}>
        <Toolbar
          style={styles.toolbar}
          data-e2e="inner-toolbar"
        >
          {(this.isHistory() || backFallback) && backButton ? this.renderBackButton() : null}
          {title ? this.renderTitle(title) : null}
          {menu ? this.renderMenu(menu) : null}
          {children ? this.renderChildren(children) : null}
        </Toolbar>
      </Sticky>
    );
  }
}));

export default withRouter(InnerToolbar);
