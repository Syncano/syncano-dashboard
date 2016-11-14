import React from 'react';
import { FontIcon } from 'material-ui';

export default React.createClass({
  displayName: 'EmptyContainer',

  propTypes: {
    icon: React.PropTypes.string,
    text: React.PropTypes.string
  },

  getStyles() {
    return {
      container: {
        margin: '64px auto',
        textAlign: 'center'
      },
      icon: {
        fontSize: 96,
        lineHeight: 1,
        marginBottom: 16,
        color: 'rgba(0, 0, 0, 0.24)'
      },
      text: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 34,
        margin: 0
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { icon, text } = this.props;

    return (
      <div style={styles.container}>
        <FontIcon
          style={styles.icon}
          className={icon}
        />
        <p style={styles.text}>{text}</p>
      </div>
    );
  }
});
