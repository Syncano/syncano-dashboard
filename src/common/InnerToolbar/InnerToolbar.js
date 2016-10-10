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
        background: 'rgba(243, 243, 243, .90)',
        padding: '0px 24px',
        zIndex: 6,
        justifyContent: 'flex-start'
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
      },
      iconButton: {
        width: 36,
        margin: '4px 6px 0 0',
        paddingLeft: 0
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
    const { backButtonTooltip, backButtonTooltipPosition } = this.props;
    const styles = this.getStyles();

    return (
      <ToolbarGroup>
        <IconButton
          iconClassName="synicon-arrow-left"
          tooltip={backButtonTooltip}
          tooltipPosition={backButtonTooltipPosition}
          onClick={this.handleBackButtonTouchTap}
          style={styles.iconButton}
          iconStyle={styles.icon}
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
