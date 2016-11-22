import React from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router';
import Sticky from 'react-stickydiv';
import _ from 'lodash';

import { Toolbar, ToolbarGroup, IconButton } from 'material-ui';
import { CustomTitle } from '../../common/';

const InnerToolbar = Radium(React.createClass({
  propTypes: {
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ])
      })
    ])
  },

  getDefaultProps() {
    return {
      backButton: false,
      backButtonTooltipPosition: 'bottom-right',
      forceBackFallback: false
    };
  },

  getStyles() {
    const { menu } = this.props;

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
      toolbarLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        minWidth: 0,
        flex: 1,
        alignItems: 'center'
      },
      toolbarRight: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      icon: {
        color: 'rgba(0, 0, 0, .4)'
      },
      title: {
        flex: menu ? 'initial' : 'inherit'
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

  renderTitle(title) {
    const styles = this.getStyles();

    if (_.isString(title)) {
      return (
        <CustomTitle
          style={styles.title}
          title={title}
        />
      );
    }

    return (
      <CustomTitle
        style={styles.title}
        {...title}
      />
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
          <ToolbarGroup style={styles.toolbarLeft}>
            {this.renderTitle(title)}
            {menu}
          </ToolbarGroup>
          <ToolbarGroup style={styles.toolbarRight}>
            {children}
          </ToolbarGroup>
        </Toolbar>
      </Sticky>
    );
  }
}));

export default withRouter(InnerToolbar);
