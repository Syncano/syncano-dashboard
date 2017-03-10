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
      registry: {
        fontSize: 16,
        lineHeight: '2.5em'
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
    const { children, handleClick, primary, registry, columnName, styles } = this.props;
    const registryStyles = registry && headerStyles.registry;
    const primaryStyles = primary && headerStyles.primary;
    const columnNameStyles = columnName === 'ICON_NAME' && headerStyles.iconName;
    const containerStyles = [registryStyles, primaryStyles, columnNameStyles, styles];

    return (
      <div
        className={this.getClassName()}
        data-e2e={this.props['data-e2e']}
        style={containerStyles}
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
