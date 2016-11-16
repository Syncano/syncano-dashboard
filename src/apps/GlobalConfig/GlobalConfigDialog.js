import React, { PropTypes } from 'react';
import Reflux from 'reflux';

import { DialogMixin } from '../../mixins';

import Actions from './GlobalConfigDialogActions';
import Store from './GlobalConfigDialogStore';

import { RaisedButton } from 'material-ui';
import { Dialog, Editor, Loading } from '../../common';
import { DialogBindShortcutsHOC } from '../../common/Dialog';

const GlobalConfigDialog = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  render() {
    const { hasBindShortcutsEnabled } = this.context;
    const { open, isLoading, isConfigLoading, globalConfig } = this.state;

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Global Config"
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        bindShortcuts={hasBindShortcutsEnabled}
        actions={
          <RaisedButton
            label="Close"
            primary={true}
            onTouchTap={this.handleCancel}
            data-e2e="global-config-close"
          />
        }
        sidebar={
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Global Config allows you to store data. It could be tokens, api keys, passwords, etc. This data can be
              accessed in all of your Scripts.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Global Config">
              Global Config is a JSON object and will not overwrite your Script Config. It will be merged with it
              instead. If both Configs contain the same key, the Script Config value will be used.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-scripts#section-global-config-dictionary">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }
      >
        <div className="vm-2-t">
          <Loading show={isConfigLoading}>
            <Editor
              name="globalConfigEditor"
              ref="globalConfigEditor"
              mode="json"
              readOnly={true}
              height="400px"
              value={globalConfig}
              data-e2e="global-config-editor"
            />
          </Loading>
        </div>
      </Dialog.FullPage>
    );
  }
});

GlobalConfigDialog.contextTypes = {
  hasBindShortcutsEnabled: PropTypes.bool
};

export default DialogBindShortcutsHOC(GlobalConfigDialog);
