import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import pluralize from 'pluralize';

import Store from './DetailsDialogStore';

import { DialogMixin } from '../../../mixins';
import { Dialog, Color } from '../../../common/';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

export default React.createClass({
  displayName: 'DetailsDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  renderDetails() {
    const { details } = this.state;
    const iconsMap = {
      gcm_device: { title: 'Android Devices', className: 'synicon-android' },
      apns_device: { title: 'iOS Devices', className: 'synicon-apple' },
      data_object: { title: 'Data Objects', className: 'synicon-table-large' },
      data_endpoint: { title: 'Data Endpoints', className: 'synicon-socket-data' },
      script_endpoint: { title: 'Script Endpoints', className: 'synicon-socket-script-endpoint' },
      schedule: { title: 'Schedules', className: 'synicon-earth' },
      script: { title: 'Scripts', className: 'synicon-code-tags' },
      response_template: { title: 'Templates', className: 'synicon-arrow-up-bold' },
      class: { title: 'Data Classes', className: 'synicon-layers' },
      default: { className: 'synicon-hexagon-outline' }
    };

    return _.map(details, (value, key) => (
      <ListItem
        key={key}
        primaryText={iconsMap[key] ? iconsMap[key].title : _.startCase(pluralize(key, value.count))}
        secondaryText={`count: ${value.count}`}
        disabled={true}
        innerDivStyle={{ paddingLeft: 51 }}
        leftIcon={
          <FontIcon
            className={iconsMap[key] ? iconsMap[key].className : iconsMap.default.className}
            style={{ margin: '12px 0', left: 8 }}
          />
        }
        nestedItems={value.list && this.renderDetailList(value.list)}
      />
    ));
  },

  renderDetailList(list) {
    return _.map(list, (value, key) => (
      <ListItem
        key={key}
        style={{ color: '#777', fontWeight: 400, marginLeft: 35, padding: '5px 16px' }}
        primaryText={value}
        disabled={true}
      />
    ));
  },

  render() {
    const { open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={
          <Dialog.TitleWithIcon
            iconClassName="synicon-backup-restore"
            circleIcon={true}
            backgroundIconColor={Color.getColorByName('blue', 'xlight')}
            iconColor="#fff"
          >
            Full Backup Details
          </Dialog.TitleWithIcon>
        }
        onRequestClose={this.handleCancel}
        open={open}
        contentSize="small"
      >
        <List style={{ fontWeight: 800 }}>
          {this.renderDetails()}
        </List>
      </Dialog.FullPage>
    );
  }
});
