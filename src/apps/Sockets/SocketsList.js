import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import pluralize from 'pluralize';

import Actions from './SocketsActions';
import Store from './SocketsStore';

import CustomSocketsList from '../CustomSockets/CustomSocketsList';
import DataEndpointsList from '../DataEndpoints/DataEndpointsList';
import ScriptEndpointsList from '../ScriptEndpoints/ScriptEndpointsList';
import TriggersList from '../Triggers/TriggersList';
import SchedulesList from '../Schedules/SchedulesList';
import ChannelsList from '../Channels/ChannelsList';
import { Show, ShowMore } from '../../common/';

const SocketsList = ({ router, params, sockets, handleTitleClick, visibleItems = 3 }) => {
  const listsMap = {
    data: {
      component: DataEndpointsList,
      routeName: 'data-endpoints'
    },
    scriptEndpoints: {
      component: ScriptEndpointsList,
      routeName: 'script-endpoints'
    },
    triggers: {
      component: TriggersList,
      routeName: 'triggers'
    },
    schedules: {
      component: SchedulesList,
      routeName: 'schedules'
    },
    channels: {
      component: ChannelsList,
      routeName: 'channels'
    },
    customSockets: {
      component: CustomSocketsList,
      routeName: 'custom-sockets'
    }
  };

  const onClickTitle = (pathName) => {
    if (_.isFunction(handleTitleClick)) {
      return handleTitleClick();
    }

    return router.push(`/instances/${params.instanceName}/${pathName}/`);
  };

  return (
    <div>
      {_.map(listsMap, (list, socketName) => {
        const itemsCount = sockets[socketName].length;
        const shouldApplyListStyle = itemsCount <= visibleItems;
        const pluralizedItemName = pluralize(_.startCase(list.routeName), itemsCount);
        const label = `Show all ${itemsCount} ${pluralizedItemName}`;

        return (
          <Show
            key={`${socketName}SocketsList`}
            if={itemsCount}
          >
            {React.createElement(list.component, {
              style: shouldApplyListStyle && { marginBottom: 48 },
              getCheckedItems: () => Store.getCheckedItems(socketName),
              checkItem: (checkId, value, itemKeyName) => Actions.checkItem(checkId, value, itemKeyName, socketName),
              handleSelectAll: () => Actions.selectVisible(socketName, visibleItems),
              handleUnselectAll: () => Actions.uncheckAll(socketName),
              items: sockets[socketName].slice(0, visibleItems),
              handleTitleClick: () => onClickTitle(list.routeName)
            })}
            <ShowMore
              label={label}
              style={{ marginBottom: 40 }}
              visible={itemsCount > visibleItems}
              onTouchTap={() => onClickTitle(_.kebabCase(list.routeName))}
            />
          </Show>
        );
      })}
    </div>
  );
};

export default withRouter(SocketsList);
