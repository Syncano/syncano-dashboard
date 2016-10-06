import React from 'react';

import { Avatar, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'ColumnAvatarCheck',

  propTypes: {
    id: React.PropTypes.string,
    handleIconClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: '#000',
      hoverColor: Colors.blue600
    };
  },

  getInitialState() {
    return {
      checked: this.props.checked
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({ checked: newProps.checked });
  },

  getStyles() {
    return {
      icon: {
        margin: 0
      }
    };
  },

  getIconState() {
    const GREY = 'rgba(0,0,0,0.2)';

    // If icon is checked - background is grey and icon is 'check'
    if (this.state.checked) {
      return { icon: 'checkbox-marked-outline', color: GREY };
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered) {
      return { icon: 'checkbox-blank-outline', color: GREY };
    }

    // Otherwise we have original colorful icon
    return { icon: this.props.icon, color: this.props.background };
  },

  handleIconClick() {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked);
  },

  handleMouseOver() {
    this.setState({
      hovered: true
    });
  },
  handleMouseLeave() {
    this.setState({
      hovered: false
    });
  },

  renderIcon() {
    const styles = this.getStyles();
    const iconState = this.getIconState();

    return (
      <FontIcon
        className={`synicon-${iconState.icon}`}
        style={styles.icon}
      />
    );
  },

  render() {
    const iconState = this.getIconState();

    return (
      <Avatar
        icon={this.renderIcon()}
        style={this.props.style}
        backgroundColor={iconState.color}
        onClick={this.handleIconClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseLeave}
      />
    );
  }
});
