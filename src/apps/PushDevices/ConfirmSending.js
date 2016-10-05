import React from 'react';
import pluralize from 'pluralize';

import { TextField, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

export default ({ content, errorText, devicesCount, handleChangeConfirmationText, confirmationText, deviceType }) => {
  const validationText = devicesCount.toString();
  const pluralizedDevices = pluralize('Device', devicesCount);

  return (
    <div style={{ lineHeight: '1.4', display: 'flex', justifyContent: 'center' }}>
      <div className="hm-2-r vm-1-t">
        <FontIcon
          className="synicon-alert"
          style={{ color: Colors.orange400, fontSize: 60 }}
        />
      </div>
      <div className="vm-1-t">
        <div className="vm-1-b">
          <strong>You are about to send a notification message:</strong>
        </div>
        <div>
          {`"${content}"`}
        </div>
        <div className="vm-1-t">
          <strong>To {validationText} {deviceType} {pluralizedDevices}</strong>
        </div>
        <div className="vm-5-t">
          Type <strong>{validationText}</strong> to send this notification message:
        </div>
        <TextField
          name="deviceNumber"
          value={confirmationText}
          onChange={handleChangeConfirmationText}
          errorText={errorText}
          fullWidth={true}
          floatingLabelText="Devices number"
          hintText={`Type ${validationText} to confirm`}
        />
      </div>
    </div>
  );
};
