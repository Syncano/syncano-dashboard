import React from 'react';
import _ from 'lodash';

import { AutoComplete, MenuItem, FontIcon } from 'material-ui';
import { Color } from '../../common/';

export default ({ name, items, showDividers = true, ...other }) => {
  const titles = {
    script: 'Scripts',
    class: 'Data Classes',
    contentType: 'Content Type',
    instanceName: 'Instance Name'
  };
  const title = titles[name] || 'Data';
  const dividerStyles = {
    container: {
      width: '100%',
      cursor: 'default',
      fontSize: 13,
      borderTop: !_.isEmpty(items.userData) && '1px solid #ccc'
    },
    innerDivStyle: {
      height: 40,
      color: 'rgba(0, 0, 0, 0.4)',
      marginTop: _.isEmpty(items.userData) && '-10px'
    }
  };

  const userDataDivider = (
    <MenuItem
      primaryText={`My ${title}`}
      style={dividerStyles.container}
      innerDivStyle={{ ...dividerStyles.innerDivStyle, marginTop: '-10px' }}
      disabled={true}
    />
  );

  const sampleDataDivider = (
    <MenuItem
      primaryText={`Sample ${title}`}
      style={dividerStyles.container}
      innerDivStyle={dividerStyles.innerDivStyle}
      disabled={true}
    />
  );

  const sampleDataDividerItem = { text: '', value: sampleDataDivider, type: 'sampleDataDivider' };
  const userDataDividerItem = { text: '', value: userDataDivider, type: 'userDataDivider' };

  const getIconInfo = (item) => {
    const iconInfo = {
      instanceName: item.metadata && {
        icon: item.metadata.icon,
        color: Color.getColorByName(item.metadata.color)
      },
      class: item.metadata && {
        icon: item.metadata.icon,
        color: Color.getColorByName(item.metadata.color)
      }
    }[name];

    return iconInfo || null;
  };

  const renderIcon = (item) => {
    const iconInfo = getIconInfo(item);

    return iconInfo && (
      <FontIcon
        style={!item.description && { top: -8 }}
        className={`synicon-${iconInfo.icon}`}
        color={iconInfo.color}
      />
    );
  };

  const renderDataItems = (item, type) => ({
    type,
    text: item.name || item.text || '',
    item,
    value: (
      <MenuItem
        data-e2e={`${item.name || item.text}-${type}-option`}
        leftIcon={renderIcon(item)}
        style={{ cursor: 'pointer' }}
      >
        {item.name || item.text}
        <span style={{ float: 'right', fontSize: 13, color: '#AAA' }}>
          {_.isNumber(item.payload) && `ID: ${item.payload}`}
        </span>
        {item.description &&
          <div style={{ fontSize: 13, color: '#AAA', fontWeight: 300, marginTop: -30 }}>
            {item.description}
          </div>
        }
      </MenuItem>
    )
  });

  const getDataSource = () => {
    const sampleData = _.map(items.sampleData, (item) => renderDataItems(item, 'sample'));
    const userData = _.map(items.userData, (item) => renderDataItems(item, 'user'));
    let dataSource = [];

    if (_.isString(items[0])) {
      dataSource = [{
        text: items[0],
        value: <MenuItem primaryText={items[0]} />
      }];
    }

    dataSource = [
      !_.isEmpty(userData) && showDividers && userDataDividerItem,
      ...userData,
      !_.isEmpty(sampleData) && showDividers && sampleDataDividerItem,
      ...sampleData
    ];

    return dataSource;
  };

  const filterDataSource = (searchText, key, item) => {
    const dataSource = getDataSource();
    const searchTextSmallLetters = _.toLower(searchText);
    const matchingUserData = _.filter(dataSource, (dataItem) => (
      _.includes(_.toLower(dataItem.text), searchTextSmallLetters) && dataItem.type === 'user'
    ));
    const isSampleItem = item.type === 'sample';
    const isSampleDataDivider = item.type === 'sampleDataDivider';
    const isMatchingSearchText = _.includes(_.toLower(key), searchTextSmallLetters);
    const isUserDataDivider = item.type === 'userDataDivider';
    const isUserDataDividerVisible = isUserDataDivider && matchingUserData.length;

    return isSampleItem || isSampleDataDivider || isMatchingSearchText || isUserDataDividerVisible;
  };

  return (
    <AutoComplete
      {...other}
      name={name}
      floatingLabelText={title}
      filter={filterDataSource}
      dataSource={getDataSource()}
      fullWidth={true}
      openOnFocus={true}
      listStyle={{ maxHeight: '30vh' }}
    />
  );
};
