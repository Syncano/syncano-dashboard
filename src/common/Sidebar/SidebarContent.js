import React from 'react';
import { ScrollLockMixin } from '../../mixins';

export default React.createClass({
  displayName: 'SidebarContent',

  mixins: [ScrollLockMixin],

  componentDidMount() {
    this.scrollLock();
  },

  componentWillUnmount() {
    this.scrollRelease();
  },

  getStyles() {
    return {
      width: 256,
      paddingBottom: 56,
      maxHeight: 'calc(100% - 56px)',
      overflow: 'auto',
      position: 'fixed',
      left: 0
    };
  },

  render() {
    const { children, style } = this.props;
    const styles = this.getStyles();

    return (
      <div style={{ ...styles, ...style }}>
        {children}
      </div>
    );
  }
});
