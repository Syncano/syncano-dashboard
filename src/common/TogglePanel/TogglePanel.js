import React, { Component } from 'react';

class TogglePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.initialOpen
    };
  }

  getStyles() {
    return {
      root: {
        padding: '3px 0',
        width: '100%'
      },
      title: {
        flex: 1,
        lineHeight: '48px',
        color: '#aaa',
        fontSize: 10,
        fontWeight: 800,
        textTransform: 'uppercase'
      },
      rightContent: {
        lineHeight: '48px'
      },
      panel: {
        padding: '0 20px 20px',
        flex: 1,
        display: 'flex',
        height: '100%',
        overflowY: 'scroll'
      }
    };
  }

  render() {
    const { open } = this.state;
    const { children, title, rightContent, style } = this.props;
    const styles = this.getStyles();

    return (
      <div style={{ ...styles.root, ...style }}>
        <div style={{ display: 'flex', padding: '0 20px' }}>
          <div
            style={styles.title}
          >
            {title}
          </div>
          <div style={styles.rightContent}>
            {rightContent}
          </div>
        </div>
        <div style={styles.panel}>
          {open ? children : null}
        </div>
      </div>
    );
  }
}

TogglePanel.defaultProps = {
  initialOpen: true
};

export default TogglePanel;
