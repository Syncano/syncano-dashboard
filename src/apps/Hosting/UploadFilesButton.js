import React, { Component } from 'react';
import { RaisedButton, FlatButton } from 'material-ui';

class UploadFilesButton extends Component {
  static defaultProps = {
    hasFiles: false
  };

  componentDidMount() {
    this.setInputAttributes();
  }

  componentDidUpdate() {
    this.setInputAttributes();
  }

  getStyles = () => ({
    chooseFilesButton: {
      display: 'none',
      position: 'absolute'
    },
    folderDescription: {
      color: '#777',
      padding: '14px 0'
    }
  })

  isSupportedBrowser = () => (
    !!window.chrome && !!window.chrome.webstore
  )

  handleClickFilesButton = () => {
    this.refs.fileSelect.click();
  }

  handleClickFoldersButton = () => {
    this.refs.dirSelect.click();
  }

  setInputAttributes = () => {
    const { fileSelect, dirSelect } = this.refs;

    if (fileSelect) {
      fileSelect.setAttribute('multiple', true);
    }

    if (dirSelect) {
      dirSelect.setAttribute('webkitdirectory', true);
      dirSelect.setAttribute('multiple', true);
      dirSelect.setAttribute('directory', true);
      dirSelect.setAttribute('odirectory', true);
      dirSelect.setAttribute('msdirectory', true);
      dirSelect.setAttribute('mozdirectory', true);
    }
  }

  render() {
    const { hasFiles, handleSendFiles, handleUploadFiles, handleClearFiles } = this.props;
    const styles = this.getStyles();

    if (hasFiles) {
      return (
        <div>
          <FlatButton
            style={{ marginRight: 10 }}
            label="Cancel"
            labelStyle={{ textTransform: 'none', color: '#436E1D' }}
            buttonStyle={{ borderRadius: '4px' }}
            onTouchTap={handleClearFiles}
          />
          <RaisedButton
            label="Send Files"
            labelStyle={{ textTransform: 'none', color: '#436E1D' }}
            buttonStyle={{ borderRadius: '4px' }}
            backgroundColor="#B8E986"
            onTouchTap={handleSendFiles}
            data-e2e="hosting-send-files"
          />
        </div>
      );
    }

    if (this.isSupportedBrowser()) {
      return (
        <div>
          <div>
            <RaisedButton
              label="Choose files"
              labelStyle={{ textTransform: 'none', color: '#436E1D' }}
              buttonStyle={{ borderRadius: '4px' }}
              backgroundColor="#B8E986"
              onTouchTap={this.handleClickFilesButton}
              style={{ marginRight: 10 }}
            >
              <input
                style={styles.chooseFilesButton}
                type="file"
                ref="fileSelect"
                onChange={handleUploadFiles}
                data-e2e="hosting-upload-files"
              />
            </RaisedButton>
            <RaisedButton
              label="Choose folder *"
              labelStyle={{ textTransform: 'none', color: '#436E1D' }}
              buttonStyle={{ borderRadius: '4px' }}
              backgroundColor="#B8E986"
              onTouchTap={this.handleClickFoldersButton}
            >
              <input
                style={styles.chooseFilesButton}
                type="file"
                ref="dirSelect"
                onChange={handleUploadFiles}
              />
            </RaisedButton>
          </div>
          <div style={styles.folderDescription}>
            * only content of the folder will be uploaded
          </div>
        </div>
      );
    }

    return (
      <div>
        <RaisedButton
          label="Choose files from disk"
          primary={true}
          onTouchTap={this.handleClickFilesButton}
        >
          <input
            style={styles.chooseFilesButton}
            type="file"
            ref="fileSelect"
            onChange={handleUploadFiles}
          />
        </RaisedButton>
      </div>
    );
  }
}

export default UploadFilesButton;
