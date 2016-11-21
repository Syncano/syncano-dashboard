import React from 'react';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

const ToolbarTitle = React.createClass({
  getStyles() {
    return {
      titleWrapper: {
        display: 'flex',
        flex: 1,
        marginRight: 10,
        minWidth: 0,
        whiteSpace: 'nowrap',
        fontSize: 20,
        color: 'rgba(0, 0, 0, .4)',
        lineHeight: '56px',
        width: '100%'
      },
      toolbarTooltip: {
        top: 26
      },
      tooltipRootStyle: {
        flex: 1,
        minWidth: 0
      }
    };
  },

  renderId(id) {
    return <span>(id: {id})</span>;
  },

  render() {
    const { id, title } = this.props;
    const styles = this.getStyles();

    return (
      <Tooltip
        label={title}
        style={styles.toolbarTooltip}
        rootStyle={styles.tooltipRootStyle}
        touch={true}
      >
        <div className="test_div" style={styles.titleWrapper}>
          <Truncate
            text={title}
          />
          {id && this.renderId(id)}
        </div>
      </Tooltip>
    );
  }
});

export default ToolbarTitle;
