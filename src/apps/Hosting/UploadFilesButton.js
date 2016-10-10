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
    }
  })

  handleClickButton = () => {
    this.refs.dirSelect.click();
  }

  setInputAttributes = () => {
    if (this.refs.dirSelect) {
      this.refs.dirSelect.setAttribute('webkitdirectory', true);
      this.refs.dirSelect.setAttribute('multiple', true);
      this.refs.dirSelect.setAttribute('directory', true);
      this.refs.dirSelect.setAttribute('odirectory', true);
      this.refs.dirSelect.setAttribute('msdirectory', true);
      this.refs.dirSelect.setAttribute('mozdirectory', true);
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
            onTouchTap={handleClearFiles}
          />
          <RaisedButton
            label="Send Files"
            primary={true}
            onTouchTap={handleSendFiles}
          />
        </div>
      );
    }

    return (
      <FlatButton
        label="Choose files from disk"
        primary={true}
        onTouchTap={this.handleClickButton}
      >
        <input
          style={styles.chooseFilesButton}
          type="file"
          ref="dirSelect"
          onChange={handleUploadFiles}
        />
      </FlatButton>
    );
  }
}

export default UploadFilesButton;
