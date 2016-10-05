import React from 'react';
import _ from 'lodash';
import { FlatButton, RaisedButton } from 'material-ui';

const DialogStandardButtons = ({
  handleCancel,
  handleConfirm,
  submitLabel,
  cancelLabel,
  disabled,
  submitDisabled,
  cancelDisabled,
  ...other
}) => (
  <div>
    <FlatButton
      data-e2e={other['data-e2e-cancel']}
      style={{ marginRight: 10 }}
      key="cancel"
      label={cancelLabel}
      onTouchTap={_.debounce(handleCancel, 500, { leading: true })}
      disabled={disabled || cancelDisabled}
    />
    <RaisedButton
      data-e2e={other['data-e2e-submit']}
      key="confirm"
      label={submitLabel}
      primary={true}
      onTouchTap={_.debounce(handleConfirm, 500, { leading: true })}
      disabled={disabled || submitDisabled}
    />
  </div>
);

DialogStandardButtons.defaultProps = {
  submitLabel: 'Confirm',
  cancelLabel: 'Cancel',
  disabled: false,
  submitDisabled: false,
  cancelDisabled: false
};

export default DialogStandardButtons;
