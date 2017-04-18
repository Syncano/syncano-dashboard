import React, { Component } from 'react';
import _ from 'lodash';
import shortId from 'shortid';
import { Events, scroller, animateScroll } from 'react-scroll';

import Actions from '../SocketsActions';

import { colors as Colors } from 'material-ui/styles';
import { RaisedButton, ListItem } from 'material-ui';
import Sticky from 'react-stickydiv';

import { Sidebar, MethodLabel } from '../../../common';

class SocketsRegistryInfoBar extends Component {
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
      endpointIcon: {
        color: Colors.grey100
      },
      endpointIconLabel: {
        marginLeft: 16,
        color: Colors.grey400
      },
      sidebarContent: {
        left: 0,
        position: 'absolute',
        top: 80
      }
    }
  )

  scrollTop = () => {
    animateScroll.scrollToTop();
  }

  scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      offset: -80,
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
    const { currentSocket } = this.props;
    const styles = this.getStyles();

    return (
      <Sidebar contentStyle={styles.sidebarContent}>
        <Sticky offsetTop={80}>
          <div className="hm-2-l">
            <RaisedButton
              label="install Socket"
              backgroundColor={Colors.amber400}
              onTouchTap={() => Actions.showDialog({ ...currentSocket, installMode: true })}
            />
          </div>
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
