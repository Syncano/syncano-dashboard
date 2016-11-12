import React from 'react';

import { Divider, FontIcon, MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

import DialogStandardButtons from '../Dialog/DialogStandardButtons';

export default ({ item, handleAccept, handleDecline }) => {
  const menuItemStyles = {
    whiteSpace: 'normal',
    lineHeight: '24px',
    color: '#777',
    minWidth: '400px',
    paddingTop: '12px',
    paddingBottom: '12px',
    position: 'relative'
  };

  return (
    <div>
      <MenuItem
        disabled={true}
        leftIcon={
          <FontIcon
            className="synicon-share-variant"
            color={Colors.lightGreen500}
          />
        }
        innerDivStyle={{ opacity: 1 }}
        style={menuItemStyles}
      >
        <div>
          <strong>{`${item.inviter} `}</strong>invited you<br />to their instance<strong>{` ${item.instance}`}</strong>
        </div>
        <div className="vp-2-t">
          <DialogStandardButtons
            cancelLabel="Decline"
            submitLabel="Accept"
            inverted={true}
            handleCancel={handleDecline}
            handleConfirm={handleAccept}
          />
        </div>
      </MenuItem>
      <Divider />
    </div>
  );
};
