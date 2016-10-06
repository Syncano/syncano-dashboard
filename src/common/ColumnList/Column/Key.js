import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import Clipboard from '../../Clipboard';

export default Radium(React.createClass({
  displayName: 'ColumnKey',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.KEY
    };
  },

  getStyles() {
    return {
      key: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: '16px',
        padding: ColumnListConstans.DEFAULT_CELL_PADDING
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { className, children, onCopy } = this.props;

    return (
      <div
        className={className}
        style={styles.key}
      >

        <div
          ref="key"
          className="col-xs-25"
        >
          {children}
        </div>

        <Clipboard
          type="button"
          text="COPY"
          copyText={children}
          onCopy={onCopy}
        />
      </div>
    );
  }
}));
