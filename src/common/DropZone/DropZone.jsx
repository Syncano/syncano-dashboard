import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import { FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Loading } from '../';

export default class DropZone extends Component {
  static propTypes = {
    uploadButtonLabel: PropTypes.string,
    buttonLabelColor: PropTypes.string,
    buttonIconClassName: PropTypes.string,
    className: PropTypes.string,
    uploadButtonStyle: PropTypes.object,
    buttonIconStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    styles: PropTypes.object,
    disableClick: PropTypes.bool,
    isLoading: PropTypes.bool,
    withButton: PropTypes.bool,
    onDrop: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    certificateType: PropTypes.oneOf(['development', 'production'])
  }

  static get defaultProps() {
    return {
      withButton: false,
      disableClick: false,
      buttonLabelColor: Colors.grey500,
      buttonBackgroundColor: Colors.grey200,
      buttonIconClassName: 'synicon-cloud-upload'
    };
  }

  getStyles() {
    return {
      dropZone: {
        display: 'flex',
        justifyContent: 'center',
        height: 210,
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Colors.grey300,
        backgroundColor: Colors.grey100,
        color: Colors.grey400,
        ':hover': {
          borderColor: Colors.blue500,
          backgroundColor: Colors.blue200,
          color: Colors.blue500
        }
      },
      dropZoneDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '56px',
        fontSize: '20px'
      },
      uploadIcon: {
        color: Colors.grey300,
        fontSize: '70px'
      },
      uploadButton: {
        marginBottom: 20,
        fontWeight: 600,
        color: this.props.buttonLabelColor
      },
      uploadButtonIcon: {
        color: this.props.buttonLabelColor
      }
    };
  }

  renderUploadButton() {
    const { uploadButtonLabel, withButton, buttonIconStyle, buttonIconClassName, uploadButtonStyle } = this.props;
    const dropZoneStyles = this.getStyles();
    const icon = (
      <FontIcon
        style={{ ...dropZoneStyles.uploadButtonIcon, ...buttonIconStyle }}
        className={buttonIconClassName}
      />
    );

    if (withButton) {
      return (
        <RaisedButton
          style={{ ...dropZoneStyles.uploadButton, ...uploadButtonStyle }}
          backgroundColor={Colors.grey200}
          labelColor={Colors.grey500}
          onTouchTap={this.refs.dropzone ? () => this.refs.dropzone.open() : null}
          label={uploadButtonLabel}
          icon={icon}
        />
      );
    }

    return null;
  }

  renderDescription() {
    const { certificateType, children } = this.props;
    const dropZoneStyles = this.getStyles();


    if (children) {
      return children;
    }

    return (
      <div style={dropZoneStyles.dropZoneDescription}>
        <FontIcon
          style={dropZoneStyles.uploadIcon}
          className="synicon-cloud-upload"
        />
        <div data-e2e={`${certificateType}-dropzone-description`}>
            {`Drag & Drop to upload ${certificateType} certificate`}
        </div>
      </div>
    );
  }

  render() {
    const { className, isLoading, disableClick, onDrop, containerStyle, styles, certificateType } = this.props;
    const dropZoneStyles = this.getStyles();

    return (
      <div style={containerStyle}>
        <Loading show={isLoading}>
          {this.renderUploadButton()}
          <Dropzone
            inputProps={{ 'data-e2e': `${certificateType}-upload-cert-button` }}
            ref="dropzone"
            className={className}
            multiple={false}
            disableClick={disableClick}
            onDrop={onDrop}
            style={{ ...dropZoneStyles.dropZone, ...styles }}
          >
            {this.renderDescription()}
          </Dropzone>
        </Loading>
      </div>
    );
  }
}
