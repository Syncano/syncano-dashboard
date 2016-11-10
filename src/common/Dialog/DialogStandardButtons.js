import React from 'react';
import _ from 'lodash';

import { FlatButton, RaisedButton } from 'material-ui';

const DialogStandardButtons = ({
  handleCancel,
  handleConfirm,
  submitLabel = 'Confirm',
  cancelLabel = 'Cancel',
  inverted,
  disabled,
  submitDisabled,
  cancelDisabled,
  ...other
}) => {
  const styles = {
    rootInverted: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      marginLeft: -10
    },
    button: {
      marginLeft: 10
    }
  };

  return (
    <div style={inverted && styles.rootInverted}>
      <FlatButton
        key="cancel"
        label={cancelLabel}
        style={styles.button}
        disabled={disabled || cancelDisabled}
        onTouchTap={_.debounce(handleCancel, 500, { leading: true })}
        data-e2e={other['data-e2e-cancel']}
      />
      <RaisedButton
        key="confirm"
        label={submitLabel}
        primary={true}
        style={styles.button}
        disabled={disabled || submitDisabled}
        onTouchTap={_.debounce(handleConfirm, 500, { leading: true })}
        data-e2e={other['data-e2e-submit']}
      />
    </div>
  );
};

export default DialogStandardButtons;
