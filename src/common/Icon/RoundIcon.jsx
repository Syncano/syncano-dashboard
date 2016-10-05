import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({
  displayName: 'RoundIcon',

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    background: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  getStyles() {
    const styles = {
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: this.props.background,
      margin: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return { ...styles, ...this.props.style };
  },

  handleClick() {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id);
    }
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        style={styles}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  }
}));
