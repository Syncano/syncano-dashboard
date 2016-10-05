import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { colors as Colors } from 'material-ui/styles/';

export default Radium(React.createClass({
  displayName: 'ColumnHeader',

  propTypes: {
    handleClick: React.PropTypes.func,
    className: React.PropTypes.string,
    columnName: React.PropTypes.string.isRequired,
    styles: React.PropTypes.object,
    primary: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.node
    ])
  },

  getClassName() {
    if (this.props.className) {
      return this.props.className;
    }

    return ColumnListConstans.DEFAULT_CLASSNAME[this.props.columnName];
  },

  getStyles() {
    return {
      primary: {
        fontSize: 20,
        fontWeight: 500
      },
      iconName: {
        paddingLeft: 16
      },
      link: {
        cursor: 'pointer',
        display: 'inline-block',
        ':hover': {
          color: Colors.blue400
        }
      }
    };
  },

  handleClick() {
    if (typeof this.props.handleClick === 'function') {
      this.props.handleClick();
    }
  },

  render() {
    const headerStyles = this.getStyles();
    const { children, handleClick, primary, columnName, styles } = this.props;

    return (
      <div
        className={this.getClassName()}
        data-e2e={this.props['data-e2e']}
        style={[primary && headerStyles.primary, columnName === 'ICON_NAME' && headerStyles.iconName, styles]}
      >
        <div
          style={handleClick && headerStyles.link}
          onClick={this.handleClick}
        >
          {children}
        </div>
      </div>
    );
  }
}));
