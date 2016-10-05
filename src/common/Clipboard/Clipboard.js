import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IconButton, FlatButton, FontIcon } from 'material-ui';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

export default React.createClass({
  displayName: 'Clipboard',

  getStyles() {
    return {
      listItem: {
        display: 'flex',
        padding: '16px 16px 16px 72px'
      },
      tooltipInnerDiv: {
        display: 'flex'
      },
      fontIcon: {
        fontSize: '1.3em',
        paddingLeft: 10
      }
    };
  },

  renderIcon() {
    const { style, iconStyle, tooltip } = this.props;

    return (
      <IconButton
        iconClassName="synicon-link-variant"
        style={style}
        iconStyle={iconStyle}
        tooltip={tooltip}
      />
    );
  },

  renderButton() {
    const { label } = this.props;

    return (
      <FlatButton
        label={label}
        primary={true}
      />
    );
  },

  renderLink() {
    const { text, copyText, tooltip } = this.props;
    const style = this.getStyles();

    return (
      <div>
        <Tooltip label={tooltip}>
          <div style={style.tooltipInnerDiv}>
            <Truncate text={text || copyText} />
            <FontIcon
              color="#b8c0c9"
              style={style.fontIcon}
              className="synicon-link-variant"
            />
          </div>
        </Tooltip>
      </div>
    );
  },

  renderListItem() {
    const { text, copyText } = this.props;
    const style = this.getStyles();

    return (
      <div style={style.listItem}>
        <Truncate text={text || copyText} />
      </div>
    );
  },

  renderContent() {
    const { type, children } = this.props;
    const actions = {
      icon: this.renderIcon(),
      button: this.renderButton(),
      link: this.renderLink(),
      list: this.renderListItem()
    };

    return actions[type] || <div>{children}</div>;
  },

  render() {
    const { copyText, onCopy } = this.props;

    return (
      <CopyToClipboard
        text={copyText}
        onCopy={onCopy}
      >
        {this.renderContent()}
      </CopyToClipboard>
    );
  }
});
