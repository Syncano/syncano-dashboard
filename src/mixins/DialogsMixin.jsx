import React from 'react';
import _ from 'lodash';

export default {
  getDialogs(dialogs = this.initDialogs()) {
    return dialogs.map((dialog) => React.createElement(dialog.dialog, dialog.params));
  },

  handleCancel(dialogRef) {
    console.debug('DialogsMixin::handleCancel');

    const ref = _.isString(dialogRef) ? this.refs[dialogRef] : this.refs.dialog;

    ref.dismiss();
  },

  showDialog(ref, ...args) {
    this.refs[ref].show(...args);
  },

  getDialogListLength(items) {
    return items.length;
  },

  getDialogList(items, paramName, associationFor) {
    const listItems = items.map((item) => {
      const isAssociated = (item.triggers && item.triggers.length) || (item.schedules && item.schedules.length);
      const triggersAssociation = item.triggers ? ` (${item.triggers.join(', ')})` : '';
      const schedulesAssociation = item.schedules ? ` (${item.schedules.join(', ')})` : '';
      let association = '';

      if (isAssociated && associationFor === 'triggers') {
        association = triggersAssociation;
      }

      if (isAssociated && associationFor === 'schedules') {
        association = schedulesAssociation;
      }

      return <li key={item[paramName || 'name']}>{item[paramName || 'name'] + association}</li>;
    });

    return <ul>{listItems}</ul>;
  },

  hideDialogs(hideDialogsFlag) {
    if (hideDialogsFlag) {
      return this.initDialogs().map((dialogConf) => {
        if (this.refs[dialogConf.params.ref]) {
          this.refs[dialogConf.params.ref].dismiss();
        }

        return null;
      });
    }

    return hideDialogsFlag;
  }
};
