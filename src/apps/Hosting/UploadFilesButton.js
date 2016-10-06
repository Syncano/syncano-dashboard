/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';

import { RaisedButton, FlatButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

class UploadFilesButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setInputAttributes();
  }

  componentDidUpdate() {
    this.setInputAttributes();
  }

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

  render = () => {
    const styles = {
      input: {
        display: 'none',
        position: 'absolute'
      },
      chooseFilesButton: {
        color: Colors.blue500
      }
    };
    const { hasFiles, handleSendFiles, handleUploadFiles, handleClearFiles } = this.props;

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
        style={styles.chooseFilesButton}
      >
        <input
          style={styles.input}
          type="file"
          ref="dirSelect"
          onChange={handleUploadFiles}
        />
      </FlatButton>
    );
  }
}

UploadFilesButton.defaultProps = {
  hasFiles: false
};

export default UploadFilesButton;
