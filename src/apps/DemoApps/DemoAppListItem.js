import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { Paper, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

class DemoAppListItem extends Component {
  getStyles = () => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px 16px',
      width: 320,
      height: 320,
      margin: '32px 16px'
    },
    title: {
      fontSize: 22,
      fontWeight: 500,
      paddingBottom: 20
    },
    demoAppImage: {
      height: 130
    },
    description: {
      textAlign: 'center',
      color: Colors.grey500,
      maxHeight: 180,
      overflowY: 'hidden',
      padding: '20px 0'
    },
    buttonsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    installButton: {
      margin: '0 8px'
    },
    moreButton: {
      position: 'absolute',
      justifySelf: 'flex-end'
    }
  })

  render() {
    const { item, handleOpenDemoApp } = this.props;
    const styles = this.getStyles();
    const appImageSrc = `/img/static/${item.name}.png`;
    const truncatedDesc = _.truncate(item.description, { length: 100 });

    return (
      <Paper
        zDepth={2}
        style={styles.container}
      >
        <div style={styles.title}>
          {item.metadata.appTitle}
        </div>
        <img
          src={appImageSrc}
          alt="demo app"
          style={styles.demoAppImage}
        />
        <div style={styles.description}>
          {truncatedDesc}
        </div>
        <div style={styles.buttonsContainer}>
          <RaisedButton
            style={styles.installButton}
            onTouchTap={handleOpenDemoApp}
            primary={true}
            label="More"
            data-e2e={`demo-app-${item.name}-more-button`}
          />
        </div>
      </Paper>
    );
  }
}

export default withRouter(DemoAppListItem);
