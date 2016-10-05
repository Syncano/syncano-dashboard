import React from 'react';
import Socket from '../Socket';

export default React.createClass({
  displayName: 'EmptyListItem',

  getStyles() {
    return {
      listItem: {
        fontSize: 16,
        marginBottom: 14
      },
      socketIconContainer: {
        width: 60,
        height: 60,
        padding: 0
      },
      socketIcon: {
        fontSize: 60,
        cursor: 'default'
      },
      leadingText: {
        fontSize: 18,
        fontWeight: 600
      },
      addIcon: {
        fontSize: 36
      },
      addIconContainer: {
        width: 36,
        height: 36,
        padding: '0 0 0 6px'
      }
    };
  },

  renderText() {
    const styles = this.getStyles();

    return (
      <div className="col-xs-12">
        <span style={styles.leadingText}>{`${this.props.title} `}</span>
        {this.props.children}
      </div>
    );
  },

  renderSocketIcon(socketName) {
    const styles = this.getStyles();

    return React.createElement(Socket[socketName], {
      tooltip: null,
      style: styles.socketIconContainer,
      iconStyle: styles.socketIcon
    });
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        style={styles.listItem}
        className="row align-middle"
      >
        <div className="col-xs-9" />
        <div className="col-xs-3">
          {this.renderSocketIcon(this.props.socketName)}
        </div>
        {this.renderText()}
        <div className="col-xs-2">
          <Socket
            tooltip={this.props.addTooltip}
            tooltipPosition="bottom-center"
            onTouchTap={this.props.handleAdd}
            style={styles.addIconContainer}
            iconStyle={styles.addIcon}
          />
        </div>
      </div>
    );
  }
});
