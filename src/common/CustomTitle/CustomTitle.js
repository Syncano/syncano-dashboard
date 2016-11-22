import React from 'react';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

const CustomTitle = React.createClass({
  getStyles() {
    return {
      id: {
        paddingRight: 5
      },
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
    const styles = this.getStyles();

    return <span style={styles.id}>(id: {id})</span>;
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
        <div style={styles.titleWrapper}>
          <Truncate
            text={title}
          />
          {id && this.renderId(id)}
        </div>
      </Tooltip>
    );
  }
});

export default CustomTitle;
