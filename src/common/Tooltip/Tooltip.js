import React from 'react';
import Radium from 'radium';

import { FontIcon } from 'material-ui';
import Tooltip from 'material-ui/internal/Tooltip';

export default Radium(React.createClass({
  displayName: 'Tooltip',

  getInitialState() {
    return {
      tooltipShowed: false
    };
  },

  getDefaultProps() {
    return {
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    };
  },

  getStyles() {
    return {
      root: {
        position: 'relative',
        cursor: 'pointer'
      },
      name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      linkContainer: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      link: {
        fontSize: '0.8em',
        color: '#9B9B9B',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: 20,
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      icon: {
        position: 'absolute',
        top: 2,
        right: 0,
        fontSize: 15,
        verticalAlign: 'middle',
        color: '#9B9B9B'
      },
      tooltip: {
        top: 10,
        pointerEvents: 'none'
      }
    };
  },

  showTooltip() {
    this.setState({ tooltipShowed: true });
  },

  hideTooltip() {
    this.setState({ tooltipShowed: false });
  },

  renderDefaultIcon() {
    return (
      <FontIcon
        color="#b8c0c9"
        style={{ fontSize: 16 }}
        className="synicon-information"
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      />
    );
  },

  renderTooltip() {
    const styles = this.getStyles();
    const { tooltipShowed } = this.state;

    return (
      <Tooltip
        style={styles.tooltip}
        show={tooltipShowed}
        {...this.props}
      />
    );
  },

  renderChildren() {
    const { children } = this.props;

    return (
      <div
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      >
        {children}
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { children, label, rootStyle } = this.props;

    return (
      <div style={{ ...styles.root, ...rootStyle }}>
        {children ? this.renderChildren() : this.renderDefaultIcon()}
        {label && this.renderTooltip()}
      </div>
    );
  }
}));
