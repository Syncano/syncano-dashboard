import React from 'react';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'ColNameDesc',

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: '#999',
      hoverColor: Colors.blue600
    };
  },

  getInitialState() {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor
    };
  },

  handleMouseOver() {
    this.setState({ color: this.props.hoverColor });
  },

  handleMouseLeave() {
    this.setState({ color: this.props.color });
  },

  handleClick() {
    this.props.handleClick(this.props.id);
  },

  render() {
    return (
      <div
        style={{ color: this.state.color }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <div style={{ fontSize: '16px' }}>{this.props.name}</div>
        <div style={{ fontSize: '13px', opacity: '0.7' }}>{this.props.description}</div>
      </div>
    );
  }
});
