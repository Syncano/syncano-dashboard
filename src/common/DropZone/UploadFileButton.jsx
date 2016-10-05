import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'UploadFileButton',

  getDefaultProps() {
    return {
      backgroundColor: Colors.grey200,
      labelColor: Colors.grey500,
      iconClassName: 'synicon-cloud-upload'
    };
  },

  getStyles() {
    const { labelColor } = this.props;

    return {
      uploadButton: {
        marginBottom: 20,
        fontWeight: 600,
        color: labelColor
      },
      uploadButtonIcon: {
        color: labelColor,
        fontSize: 18,
        paddingRight: 8,
        paddingTop: 2
      }
    };
  },

  handleClickIpnut() {
    this.refs.hiddenInput.click();
  },

  handleFile(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = () => {
      if (this.props.getFile) {
        if (!file.hasOwnProperty('preview')) {
          file.preview = URL.createObjectURL(file);
        }
        this.props.getFile(file);
      }
    };

    reader.readAsDataURL(file);
  },

  render() {
    const styles = this.getStyles();
    const { backgroundColor, labelColor, style, iconStyle, iconClassName, ...other } = this.props;

    return (
      <div>
        <input
          name="hiddenInput"
          ref="hiddenInput"
          style={{ display: 'none', visibility: 'hidden' }}
          type="file"
          onChange={this.handleFile}
        />
        <RaisedButton
          style={{ ...styles.uploadButton, ...style }}
          backgroundColor={backgroundColor}
          labelColor={labelColor}
          onTouchTap={this.handleClickIpnut}
          {...other}
        >
          <div className="row align-center align-middle hp-2-l hp-2-r">
            <FontIcon
              style={{ ...styles.uploadButtonIcon, ...iconStyle }}
              className={iconClassName}
            />
            <div>
              {this.props.uploadButtonLabel}
            </div>
          </div>
        </RaisedButton>
      </div>
    );
  }
});
