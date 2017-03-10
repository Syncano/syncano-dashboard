import React, { Component } from 'react';
import _ from 'lodash';
import shortId from 'shortid';
import { Events, scroller, animateScroll } from 'react-scroll';

import { colors as Colors } from 'material-ui/styles';
import { ListItem } from 'material-ui';
import Sticky from 'react-stickydiv';

import { Sidebar, MethodLabel } from '../../../common';

class SocketsRegistryInfoBar extends Component {
  /* eslint-disable no-useless-constructor */
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    Events.scrollEvent.register('begin');
    Events.scrollEvent.register('end');
  }

  componentWillUnmount = () => {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  getStyles = () => (
    {
      leftBarItem: {
        color: Colors.grey400,
        padding: '8px 0 -8px 32px'
      },
      endpointIcon: {
        color: Colors.grey100
      },
      endpointIconLabel: {
        marginLeft: 16,
        color: Colors.grey400
      },
      methodItem: {
      },
      columnContainer: {
        display: 'flex'
      },
      sidebarContent: {
        left: 0,
        position: 'absolute',
        top: 106
      },
      sidebarBackground: {
        position: 'relative'
      }
    }
  )

  scrollTop = () => {
    animateScroll.scrollToTop();
  }

  scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      offset: -106,
      duration: 1500,
      delay: 100,
      smooth: true
    });
  }

  renderEndpoints = () => {
    const styles = this.getStyles();
    const { endpoints } = this.props;
    const endpointsLists = _.map(endpoints, (methods, endpointName) => {
      const methodItems = _.map(methods, (method, index) => (
        <ListItem
          key={shortId.generate()}
          onTouchTap={() => this.scrollTo(`${endpointName}-${method.type}`)}
          className={!index && 'vm-2-t'}
        >
          <div style={styles.endpointIconLabel}>
            <MethodLabel
              style={styles.endpointIcon}
              method={method.type}
            />
            <span className="hp-2-l">
              {endpointName}
            </span>
          </div>
        </ListItem>
      ));

      return methodItems;
    });

    return _.flatten(endpointsLists);
  }

  render = () => {
    const styles = this.getStyles();

    return (
      <Sidebar
        backgroundStyle={styles.sidebarBackground}
        contentStyle={styles.sidebarContent}
      >
        <Sticky offsetTop={106}>
          <Sidebar.List
            key="General Info"
            subheader="General Info"
          >
            <ListItem onTouchTap={this.scrollTop}>
              <div style={styles.endpointIconLabel}>
                Overview
              </div>
            </ListItem>
          </Sidebar.List>
          <Sidebar.List
            key="Endpoints"
            subheader="Endpoints"
          >
            {this.renderEndpoints()}
          </Sidebar.List>
        </Sticky>
      </Sidebar>
    );
  }
}

export default SocketsRegistryInfoBar;
