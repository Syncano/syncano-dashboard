import React from 'react';
import Tooltip from '../Tooltip';

const Truncate = React.createClass({
  getStyles() {
    return {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  },

  renderContent() {
    const styles = this.getStyles();
    const { text, style, ...other } = this.props;

    return (
      <div
        style={{ ...style, ...styles }}
        {...other}
      >
        {text}
      </div>
    );
  },

  render() {
    const { text, withTooltip } = this.props;

    if (withTooltip) {
      return (
        <Tooltip
          label={withTooltip && text}
          verticalPosition="bottom"
          horizontalPosition="center"
        >
          {this.renderContent()}
        </Tooltip>
      );
    }

    return this.renderContent();
  }
});

export default Truncate;
