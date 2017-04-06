import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { colors as Colors } from 'material-ui/styles/';
import Truncate from '../../Truncate';
import _ from 'lodash';

export default Radium(React.createClass({
  displayName: 'ColumnCheckIcon',

  getDefaultProps() {
    return {
      color: '#4a4a4a',
      icon: ColumnListConstans.DEFAULT_ICON,
      background: ColumnListConstans.DEFAULT_BACKGROUND,
      hoverColor: Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
      checkable: true,
      checked: false,
      customStyles: {}
    };
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
      primaryText: {
        fontSize: 16,
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-all',
        flex: 1,
        color: this.state.color,
        cursor: 'pointer'
      },
      secondaryText: {
        color: '#9b9b9b'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {
      iconElement: Icon,
      primaryText,
      secondaryText,
      handleIconClick,
      className,
      customStyles,
      handleClick,
      ...other
      } = this.props;

    return (
      <div
        className={className}
        style={styles.container}
      >
        <Icon
          {...other}
          handleClick={handleIconClick}
          data-e2e={_.isString(primaryText) ? `${primaryText}-check-icon` : this.props['data-e2e']}
        />
        <div style={{ flex: 1, maxWidth: 'calc(100% - 66px)' }}>
          <div
            onClick={handleClick}
            data-e2e={`${primaryText}-list-item-name`}
            style={[styles.primaryText, customStyles.fileName]}
          >
            {typeof primaryText === 'string' ? <Truncate text={primaryText} /> : primaryText}
          </div>
          <div
            data-e2e={`${primaryText}-list-item-description`}
            style={[styles.secondaryText, customStyles.fileDescription]}
          >
            {typeof secondaryText === 'string' ? <Truncate text={secondaryText} /> : secondaryText}
          </div>
        </div>
      </div>
    );
  }
}));
