import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { Paper } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'ColumnIconName',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    handleIconClick: React.PropTypes.func,
    handleNameClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: 'black',
      hoverColor: Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.ICON_NAME
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
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        padding: ColumnListConstans.DEFAULT_CELL_PADDING
      },
      name: {
        fontSize: 16,
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        color: this.state.color,
        ':hover': {
          color: this.props.hoverColor
        }
      },
      icon: {
        margin: 12,
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: this.props.background
      }
    };
  },

  handleIconClick(id, state) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleIconClick(id, state);
  },

  handleNameClick() {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleNameClick(this.props.id);
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles.container}
      >
        <Paper
          circle={true}
          style={styles.icon}
        />
        <div
          style={styles.name}
          onClick={this.handleNameClick}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}));
