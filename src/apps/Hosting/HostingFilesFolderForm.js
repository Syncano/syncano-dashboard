import React from 'react';
import _ from 'lodash';

import { RaisedButton, TextField } from 'material-ui';
import { Show } from '../../common';

const HostingFilesFolderForm = ({
  errors,
  name,
  showNewFolderForm,
  handleNewFolderNameChange,
  handleCreateFolder,
  handleNewFolderButtonClick
}) => {
  const hasErrors = errors.name && errors.name.length;
  const styles = {
    newFolderForm: {
      marginRight: 10,
      display: 'flex',
      alignItems: 'center'
    },
    newFolderNameInput: {
      width: 180,
      marginBottom: hasErrors && 22,
      marginRight: 10
    }
  };

  const createFolderButtonLabel = showNewFolderForm ? 'Create' : 'New folder';
  const createFolderButtonAction = showNewFolderForm ? handleCreateFolder : handleNewFolderButtonClick;
  const disableNewFolderButton = showNewFolderForm && !name;

  return (
    <form onSubmit={handleCreateFolder} style={styles.newFolderForm}>
      <Show if={showNewFolderForm}>
        <TextField
          fullWidth={true}
          autoFocus={true}
          name="name"
          value={name}
          onChange={handleNewFolderNameChange}
          errorText={_.union(_.get(errors, 'name') || []).join(' ')}
          hintText="Type new folder name"
          hintStyle={{ color: '#ffffff' }}
          inputStyle={{ color: '#ffffff' }}
          style={styles.newFolderNameInput}
        />
      </Show>
      <RaisedButton
        label={createFolderButtonLabel}
        labelStyle={{ textTransform: 'none', color: '#436E1D' }}
        buttonStyle={{ borderRadius: '4px' }}
        backgroundColor="#B8E986"
        onTouchTap={createFolderButtonAction}
        disabled={disableNewFolderButton}
      />
    </form>
  );
};

export default HostingFilesFolderForm;
