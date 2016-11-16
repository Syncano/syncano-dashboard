import React from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router';
import Sticky from 'react-stickydiv';

import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';

const InnerToolbar = Radium(React.createClass({
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
        background: 'rgba(243, 243, 243, .90)',
        padding: '0 24px',
        zIndex: 6,
        justifyContent: 'flex-start'
      },
      backButtonToolbarGroup: {
        alignItems: 'center',
        marginLeft: -16,
        marginRight: 10
      },
      toolbarRight: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end'
      },
      icon: {
        color: 'rgba(0, 0, 0, .4)'
      }
    };
  },

  handleBackButtonTouchTap() {
    const { backFallback, forceBackFallback, router } = this.props;

    if (!forceBackFallback) {
      return router.goBack();
    }

    return backFallback();
  },

  renderBackButton() {
    const styles = this.getStyles();
    const { backButtonTooltip, backButtonTooltipPosition } = this.props;

    return (
      <ToolbarGroup style={styles.backButtonToolbarGroup}>
        <IconButton
          iconClassName="synicon-arrow-left"
          tooltip={backButtonTooltip}
          tooltipPosition={backButtonTooltipPosition}
          onClick={this.handleBackButtonTouchTap}
          iconStyle={styles.icon}
          data-e2e="innertoolbar-back-button"
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
        <ToolbarTitle text={title} />
      </ToolbarGroup>
    );
  },

  render() {
    const styles = this.getStyles();
    const { children, menu, title, backButton, backFallback, style } = this.props;

    return (
      <Sticky offsetTop={50} zIndex={12}>
        <Toolbar
          style={{ ...styles.toolbar, ...style }}
          data-e2e="inner-toolbar"
        >
          {backFallback && backButton ? this.renderBackButton() : null}
          {title ? this.renderTitle(title) : null}
          {menu ? this.renderMenu(menu) : null}
          {children ? this.renderChildren(children) : null}
        </Toolbar>
      </Sticky>
    );
  }
}));

export default withRouter(InnerToolbar);
