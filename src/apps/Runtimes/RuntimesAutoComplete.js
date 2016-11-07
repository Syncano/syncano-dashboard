import React, { PropTypes } from 'react';
import _ from 'lodash';
import Store from './RuntimesStore';
import { AutoComplete, Divider, MenuItem, FontIcon } from 'material-ui';

const RuntimesAutoComplete = ({
  onNewRequest,
  errorText,
  runtimeName,
  handleUpdateAutoComplete,
  searchQuery
}, {
  disableBindShortcuts
}) => {
  const styles = {
    autoComplete: {
      maxHeight: '30vh'
    },
    runtimeContainer: {
      paddingBottom: 16
    },
    runtimeOption: {
      fontSize: 13,
      color: '#AAA',
      fontWeight: 300,
      position: 'absolute',
      top: 20
    },
    autoCompleteItem: {
      cursor: 'pointer'
    }
  };

  const currentRuntimeName = runtimeName && Store.getRuntimeByKey(runtimeName).name;
  const handleFilter = (searchText, key) => {
    if (searchText === '' || !searchQuery) {
      return true;
    }
    return _.toLower(key).includes(_.toLower(searchText)) || key === '';
  };

  const handleNewRequestAutoComplete = (value) => {
    onNewRequest(value);
    handleUpdateAutoComplete(value.text);
  };

  const renderRuntimeOption = (item, key) => {
    const deprecatedInfo = item.deprecated ? 'deprecated' : 'latest';
    const libraryVersion = item.library_version ? `${item.library_version} ${deprecatedInfo}` : 'unavailable';

    return ({
      text: item.name,
      payload: key,
      value:
        <MenuItem
          data-e2e={`${_.toLower(item.name)}-script-runtime-option`}
          key={`select-${key}`}
          value={key}
          style={styles.autoCompleteItem}
          leftIcon={(
            <FontIcon
              className={`synicon-${item.icon}`}
              color={item.color}
            />
          )}
        >
          <div style={styles.runtimeContainer}>
            {item.name}
            <div style={styles.runtimeOption}>
              {`Syncano Library: ${libraryVersion}`}
            </div>
          </div>
        </MenuItem>
    });
  };

  const renderRuntimesSelectOptions = () => {
    const { latest, deprecated } = Store.getDividedRuntimes();

    const currentOptions = _.map(latest, renderRuntimeOption);
    const deprecatedOptions = _.map(deprecated, renderRuntimeOption);

    return [...currentOptions, { text: '', value: <Divider /> }, ...deprecatedOptions];
  };

  return (
    <AutoComplete
      name="runtime_name"
      searchText={currentRuntimeName || searchQuery}
      floatingLabelText="Runtime environment"
      openOnFocus={true}
      fullWidth={true}
      filter={handleFilter}
      onNewRequest={handleNewRequestAutoComplete}
      onUpdateInput={handleUpdateAutoComplete}
      errorText={errorText}
      dataSource={renderRuntimesSelectOptions()}
      listStyle={styles.autoComplete}
      onFocus={disableBindShortcuts}
    />
  );
};

RuntimesAutoComplete.contextTypes = {
  disableBindShortcuts: PropTypes.func
};

export default RuntimesAutoComplete;
