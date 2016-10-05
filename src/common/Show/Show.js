import React from 'react';

export default React.createClass({
  displayName: 'Show',

  render() {
    if (!this.props.if) {
      return null;
    }

    if (React.Children.count(this.props.children) > 1) {
      return <div {...this.props}>{this.props.children}</div>;
    }

    return this.props.children;
  }
});
