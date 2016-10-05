import React from 'react';
import Reflux from 'reflux';

import { DialogMixin, FormMixin } from '../../mixins';

import Actions from './RestoreFromFileDialogActions';
import Store from './RestoreFromFileDialogStore';

import { FontIcon, TextField } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import DropZone from 'react-dropzone';
import { Dialog, Loading, Show, Notification } from '../../common';

export default React.createClass({
  displayName: 'RestoreFromFileDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const { instanceName } = this.context.params;

    return {
      backupFile: {
        presence: {
          message: '^Please choose a backup file first'
        }
      },
      instanceNameValidation: {
        presence: {
          message: `^Type ${instanceName} to continue`
        },
        inclusion: {
          within: [instanceName],
          message: '^Incorrect Instance name'
        }
      }
    };
  },

  getStyles() {
    return {
      dropZone: {
        height: 140,
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#AAA',
        color: '#AAA',
        backgroundColor: '#EEE'
      },
      dropZoneError: {
        borderColor: '#F50057',
        color: '#F50057',
        backgroundColor: '#FCE4EC'
      },
      dropZoneContainer: {
        lineHeight: '1.4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      dropZoneDescription: {
        padding: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: '100%'
      },
      uploadIcon: {
        fontSize: 56,
        color: '#AAA'
      },
      uploadIconError: {
        color: '#F50057'
      }
    };
  },

  handleAddSubmit() {
    const { backupFile } = this.state;

    Actions.restoreFromFile(backupFile);
  },

  handleDropBackupFile(file) {
    this.setState({
      backupFile: file[0]
    });
    this.clearValidations();
  },

  renderLoading() {
    return (
      <div>
        <div
          className="vm-3-b"
          style={{ textAlign: 'center' }}
        >
          {'We\'re restoring your backup, please wait...'}
        </div>
        <Loading show={true} />
      </div>
    );
  },

  renderContent() {
    const styles = this.getStyles();
    const { backupFile, instanceNameValidation } = this.state;
    const instanceName = this.context.params.instanceName;
    const backupLabel = backupFile ? backupFile.name : null;
    const hasBackupFileError = this.getValidationMessages('backupFile').length;
    const dropZoneErrorStyle = hasBackupFileError ? styles.dropZoneError : null;
    const iconErrorStyle = hasBackupFileError ? styles.uploadIconError : null;

    return (
      <div style={styles.dropZoneContainer}>
        <div className="row align-top vm-4-b">
          <div className="hp-2-r vm-1-t col-sm-4">
            <FontIcon
              style={{ fontSize: 60, color: Colors.orange400 }}
              className="synicon-alert"
            />
          </div>
          <div className="col-sm-31">
            <div className="vm-1-b">
              <strong>This action cannot be undone or stopped.</strong>
            </div>
            <div className="vm-1-b">
              This will restore Instance
              <strong> {instanceName}</strong> to previous state.
            </div>
            <div>
              All current application data for <strong>{instanceName}</strong> will be lost.
            </div>
            <div className="vm-3-t">
              <DropZone
                onDrop={this.handleDropBackupFile}
                style={{ ...styles.dropZone, ...dropZoneErrorStyle }}
              >
                <div style={styles.dropZoneDescription}>
                  <FontIcon
                    style={{ ...styles.uploadIcon, ...iconErrorStyle }}
                    className={backupFile ? 'synicon-file' : 'synicon-cloud-upload'}
                  />
                  <div>
                    {backupLabel || 'Click or Drag & Drop to upload partial backup file'}
                  </div>
                </div>
              </DropZone>
            </div>
            <Show if={hasBackupFileError}>
              <div className="vm-2-t">
                <Notification type="error">{this.getValidationMessages('backupFile').join('. ')}</Notification>
              </div>
            </Show>
            <div>
              <div className="vm-4-t">
                To confirm restoring type your Instance name.
              </div>
              <TextField
                value={instanceNameValidation}
                onChange={(event, value) => this.setState({ instanceNameValidation: value })}
                errorText={this.getValidationMessages('instanceNameValidation').join('. ')}
                fullWidth={true}
                floatingLabelText="Instance name"
                hintText="Instance name"
              />
            </div>
          </div>
        </div>
        <div className="vm-2-t">
          {this.renderFormNotifications()}
        </div>
      </div>
    );
  },

  render() {
    const { isLoading, isRestoring, open } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="medium"
        title={!isRestoring && 'Restore Instance from file'}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        showCloseButton={!isRestoring}
        actions={!isRestoring &&
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}
          />
        }
      >
        {!isRestoring ? this.renderContent() : this.renderLoading()}
      </Dialog.FullPage>
    );
  }
});
