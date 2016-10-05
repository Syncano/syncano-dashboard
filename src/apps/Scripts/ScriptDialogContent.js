import React, { PropTypes } from 'react';
import _ from 'lodash';
import { TextField } from 'material-ui';
import RuntimesAutoComplete from '../Runtimes';

const ScriptDialogContent = ({
  label,
  description,
  runtime_name,
  errors,
  handleChangeTextField,
  handleChangeAutoComplete,
  handleUpdateAutoComplete,
  searchQuery
}, {
  enableBindShortcuts
}) => {
  const handleOnNewRequest = (value) => {
    handleChangeAutoComplete(value.payload);
    enableBindShortcuts();
  };

  const handleOnChangeLabel = (event, value) => {
    handleChangeTextField('label', value);
  };

  const handleOnChangeDescription = (event, value) => {
    handleChangeTextField('description', value);
  };

  return (
    <div data-e2e="script-dialog-content">
      <TextField
        name="label"
        onFocus={enableBindShortcuts}
        autoFocus={true}
        value={label}
        onChange={handleOnChangeLabel}
        errorText={_.union(_.get(errors, 'label') || []).join(' ')}
        fullWidth={true}
        hintText="Script's label"
        floatingLabelText="Label"
      />
      <TextField
        name="description"
        onFocus={enableBindShortcuts}
        value={description}
        onChange={handleOnChangeDescription}
        errorText={_.union(_.get(errors, 'description') || []).join(' ')}
        fullWidth={true}
        multiLine={true}
        hintText="Script's description"
        floatingLabelText="Description (optional)"
        data-e2e="script-dialog-description"
      />
      <RuntimesAutoComplete
        onNewRequest={handleOnNewRequest}
        errorText={_.union(_.get(errors, 'runtime_name') || []).join(' ')}
        runtimeName={runtime_name}
        handleUpdateAutoComplete={handleUpdateAutoComplete}
        searchQuery={searchQuery}
      />
    </div>
  );
};

ScriptDialogContent.contextTypes = {
  enableBindShortcuts: PropTypes.func
};

export default ScriptDialogContent;
