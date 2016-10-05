import React, { Component, PropTypes } from 'react';

export default (ComposedComponent) => (
  class DialogBindShortcutsHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasBindShortcutsEnabled: true
      };
    }

    static childContextTypes = {
      hasBindShortcutsEnabled: PropTypes.bool,
      enableBindShortcuts: PropTypes.func,
      disableBindShortcuts: PropTypes.func
    }

    getChildContext = () => {
      const { hasBindShortcutsEnabled } = this.state;

      return {
        hasBindShortcutsEnabled,
        enableBindShortcuts: this.enableBindShortcuts,
        disableBindShortcuts: this.disableBindShortcuts
      };
    }

    enableBindShortcuts = () => {
      this.setState({ hasBindShortcutsEnabled: true });
    }

    disableBindShortcuts = () => {
      this.setState({ hasBindShortcutsEnabled: false });
    }

    render() {
      return <ComposedComponent />;
    }
  }
);
