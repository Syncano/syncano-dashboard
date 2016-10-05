import React from 'react';
import Radium from 'radium';
import { LinearProgress, CircularProgress } from 'material-ui';

export default Radium(React.createClass({
  displayName: 'Loading',

  propTypes: {
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf(['circular', 'linear'])
  },

  getDefaultProps() {
    return {
      type: 'circular',
      size: 1,
      show: false
    };
  },

  getStyles() {
    const styles = {
      base: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        left: 0
      },
      top: {
        position: 'absolute',
        top: 0
      },
      bottom: {
        position: 'absolute',
        bottom: 0
      },
      center: {
        margin: '50% auto'
      }
    };

    if (this.props.show) {
      return [styles.base,
        this.props.position === 'top' && styles.top,
        this.props.position === 'bottom' && styles.bottom,
        this.props.position === 'center' && styles.center,
        this.props.style];
    }

    return styles;
  },

  renderItem() {
    if (this.props.show === false) {
      return this.props.children;
    }

    if (this.props.type === 'linear') {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <CircularProgress
        mode="indeterminate"
        size={this.props.size}
      />
    );
  },

  render() {
    const { style } = this.props;
    const styles = this.getStyles();

    return (
      <div style={[styles, style]}>
        {this.renderItem()}
      </div>
    );
  }
}));
