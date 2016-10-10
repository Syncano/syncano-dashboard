import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IconButton, FlatButton, FontIcon } from 'material-ui';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

const Clipboard = ({ style, iconStyle, tooltip, text, copyText, onCopy, type, children, ...other }) => {
  const styles = {
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
  const renderIcon = () => (
    <IconButton
      iconClassName="synicon-link-variant"
      style={style}
      iconStyle={iconStyle}
      tooltip={tooltip}
    />
  );
  const renderButton = () => (
    <FlatButton
      {...other}
      primary={true}
    />
  );
  const renderLink = () => (
    <div>
      <Tooltip label={tooltip}>
        <div style={styles.tooltipInnerDiv}>
          <Truncate text={text || copyText} />
          <FontIcon
            color="#b8c0c9"
            style={styles.fontIcon}
            className="synicon-link-variant"
          />
        </div>
      </Tooltip>
    </div>
  );
  const renderListItem = () => (
    <div style={styles.listItem}>
      <Truncate text={text || copyText} />
    </div>
  );
  const renderContent = () => {
    const actions = {
      icon: renderIcon(),
      button: renderButton(),
      link: renderLink(),
      list: renderListItem()
    };

    return actions[type] || <div>{children}</div>;
  };

  return (
    <CopyToClipboard
      text={copyText}
      onCopy={onCopy}
    >
      {renderContent()}
    </CopyToClipboard>
  );
};

export default Clipboard;
