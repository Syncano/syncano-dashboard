import React from 'react';
import Radium from 'radium';
import { FontIcon, Avatar, ListItem } from 'material-ui';

export default Radium(React.createClass({
  displayName: 'Item',

  getStyles() {
    const styles = {
      listItem: {
        display: 'flex',
        marginBottom: 0,
        border: '1px dashed #ddd',
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14
      },
      icon: {
        margin: 0,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
        transform: 'translateY(-50%)'
      }
    };

    return { ...styles, ...this.props.style };
  },

  getIcon() {
    const styles = this.getStyles();

    return (
      <FontIcon
        className="synicon-plus"
        style={styles.icon}
      />
    );
  },

  getAvatar() {
    const styles = this.getStyles();

    return (
      <Avatar
        icon={this.getIcon()}
        style={styles.avatar}
      />
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <ListItem
        className="empty-list-item"
        onTouchTap={this.props.handleClick}
        style={styles.listItem}
        leftAvatar={this.getAvatar()}
      >
        {this.props.children}
      </ListItem>
    );
  }
}));
