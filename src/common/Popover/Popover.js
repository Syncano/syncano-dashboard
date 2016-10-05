import React from 'react';
import { Popover } from 'material-ui';

export default React.createClass({
  displayName: 'Popover',

  getDefaultProps() {
    return {
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom'
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top'
      }
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  hide() {
    this.setState({
      open: false
    });
  },

  toggle(event) {
    this.setState({
      open: !this.state.open,
      anchorElement: event.currentTarget
    });
  },

  render() {
    const { open, anchorElement } = this.state;
    const { children, ...other } = this.props;

    return (
      <Popover
        {...other}
        onRequestClose={this.hide}
        open={open}
        anchorEl={anchorElement}
      >
        {children}
      </Popover>
    );
  }
});
