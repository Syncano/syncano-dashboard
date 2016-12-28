import React from 'react';
import { IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

const CheckIcon = React.createClass({
  getDefaultProps() {
    return {
      checkedIcon: {
        className: 'checkbox-marked-outline',
        color: '#FFF',
        circleColor: Colors.lightBlue500
      },
      hoveredIcon: {
        className: 'checkbox-blank-outline',
        color: '#FFF',
        circleColor: 'rgba(0,0,0,0.2)'
      },
      icon: {
        className: 'cloud',
        color: '#FFF',
        circleColor: Colors.indigo700
      },
      checkable: true
    };
  },

  getInitialState() {
    return {
      hovered: false
    };
  },

  getStyles() {
    const { color, circleColor } = this.props.icon;

    return {
      icon: {
        color,
        display: 'block',
        fontSize: 24,
        lineHeight: '16px'
      },
      iconButton: {
        backgroundColor: circleColor,
        padding: 0,
        margin: '0 16px 0 8px',
        height: 40,
        width: 40,
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
      }
    };
  },

  getIconState() {
    const { checked, checkedIcon, hoveredIcon, icon } = this.props;
    const { hovered } = this.state;

    // If icon is checked - background is grey and icon is 'check'
    if (checked) {
      return checkedIcon;
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (hovered) {
      return hoveredIcon;
    }

    // Otherwise we have original colorful icon
    return icon;
  },

  handleClick(event) {
    const { handleClick, checkable, id, checked, keyName } = this.props;

    event.stopPropagation();
    if (handleClick && checkable) {
      handleClick(id, !checked, keyName);
    }
  },

  addHover() {
    this.setState({ hovered: true });
  },

  removeHover() {
    this.setState({ hovered: false });
  },

  render() {
    const { iconStyle, style, checkable } = this.props;
    const styles = this.getStyles();
    const icon = this.getIconState();

    styles.iconButton.backgroundColor = icon.circleColor !== 'none' ? icon.circleColor : '#FFF';
    styles.icon.color = icon.color;

    return (
      <IconButton
        data-e2e={this.props['data-e2e']}
        iconClassName={`synicon-${icon.className}`}
        iconStyle={{ ...styles.icon, ...iconStyle }}
        style={{ ...styles.iconButton, ...style }}
        onMouseEnter={checkable && this.addHover}
        onMouseLeave={checkable && this.removeHover}
        onTouchTap={this.handleClick}
      />
    );
  }
});

export default CheckIcon;
